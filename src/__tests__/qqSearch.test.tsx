import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QqSearch } from '../QqSearch';

// 测试input功能
test('input value', () => {
  const container = render(<QqSearch />);
  const input = container.getByLabelText('search-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: '1231312313' } });
  expect(input.value).toBe('1231312313');
});

test('input error QQ number', async () => {
  const container = render(<QqSearch />);
  const input = container.getByLabelText('search-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: '123vaefr' } });
  const errDom = await screen.findByText('QQ number must be 5 to 11 digits');
  expect(errDom).toBeInTheDocument();
});
