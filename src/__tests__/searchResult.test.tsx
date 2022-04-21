import { render, screen, waitFor } from '@testing-library/react';
import { SearchResult } from '../QqSearch/SearchResult';
import { useFecth } from '../utils/useFecth';
import '@testing-library/jest-dom';

const mockSearchResult = useFecth as jest.Mock<any>;

jest.mock('../utils/useFecth');

describe('<SearchResult />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('is loading rendered!', async () => {
    mockSearchResult.mockImplementation(() => ({ isLoading: true }));
    const { findByAltText } = render(<SearchResult />);

    const loading = await findByAltText('loading...');

    expect(loading).toBeInTheDocument();
  });

  it('is error message rendered!', async () => {
    mockSearchResult.mockImplementation(() => ({
      isLoading: false,
      errMsg: 'error message',
    }));
    const { findByText } = render(<SearchResult />);

    const errMsg = await findByText(/error message/i);

    expect(errMsg).toBeInTheDocument();
  });

  it('is render right data!', async () => {
    const searchResult = {
      qq: '346540974',
      name: 'funni',
      qLogo: 'https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=346540974',
    };
    mockSearchResult.mockImplementation(() => ({
      isLoading: false,
      errMsg: '',
      data: searchResult,
    }));

    const { findByText, findByAltText } = render(<SearchResult />);

    const qqDom = await findByText(searchResult.qq);
    const avatar = await findByAltText('logo');

    expect(qqDom).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', searchResult.qLogo);
  });
});
