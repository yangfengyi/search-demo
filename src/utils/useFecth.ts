import { useState, useEffect, useRef } from 'react'
import { SearchResultType } from '../types'
import { useDebounce } from './useDebounce';

export function useFecth(params: string) {
  const [ data, setData ] = useState<SearchResultType | null>();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errMsg, setErrMsg ] = useState('');
  const requestSingel = useRef<AbortController>();

  const getQqMsg = useDebounce(fetchResult, 300, [ params, requestSingel.current ]);

  function fetchResult(input: string) {
    const validInput = checkUserInput(input);
    
    // 取消之前没有完成的请求，减少无用请求，防止请求抖动造成的UI一致
    if (requestSingel.current) {
      requestSingel.current.abort();
    }
    const newController = new AbortController();
    const signal = newController.signal;
    requestSingel.current = newController;

    setIsLoading(true);
    setErrMsg('')

    if (validInput) {

      fetch('https://api.uomg.com/api/qq.info?qq=' + input, { signal })
        .then((res) => res.json())
        .then((data) => {
          const { code, msg } = data;
          if (code === 1) {
            setData(dataFormat(data));
          } else {
            setErrMsg(msg);
          }
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setErrMsg('QQ number must be 5 to 11 digits');
    }
  }

  function resetData() {
    // 取消之前没有完成的请求，防止异步数据在后面更新
    if (requestSingel.current) {
      requestSingel.current.abort();
    }
    setErrMsg('');
    setData(null);
  }

  useEffect(() => {
    if (params.length < 5) {
      resetData();
    } else {
      getQqMsg(params)
    }
  }, [params])

  return { data, isLoading, errMsg }
}

// 字段名称格式化，前端采用小驼峰
function dataFormat(data: any = {}): SearchResultType {
  return {
    qq: data.qq || '',
    qLogo: data.qlogo || '',
    name: data.name || '',
  };
}

// QQ号必须是 5-11 位数字
function checkUserInput(input: string): boolean {
  const reg = /^[0-9]{5,11}$/;
  const checkResult = reg.test(input);
  return checkResult;
}