import loading from '../assets/infinity.gif';
import { useFecth } from '../utils/useFecth';

export function SearchResult(props: { userInput?: string }) {
  const { userInput } = props;
  const { data, isLoading, errMsg } = useFecth(userInput || '');

  if (errMsg) {
    return <p className='error-msg'>{errMsg}</p>;
  }

  if (isLoading) {
    return (
      <div className='loading-box'>
        <img src={loading} alt='loading...' />
      </div>
    );
  }

  if (data) {
    const { qLogo, name, qq } = data;

    return (
      <div className='search-result'>
        <img src={qLogo} alt='logo' />
        <div className='info-box'>
          <p className='name'>{name}</p>
          <p className='qq'>{qq}</p>
        </div>
      </div>
    );
  }

  return <></>;
}
