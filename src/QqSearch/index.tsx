import React, { useState } from 'react';
import { SearchResult } from './SearchResult';
import './index.css';

export function QqSearch() {
  const [userInput, setUserInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className='wrapper'>
      <input
        className='search-input'
        value={userInput}
        type='text'
        maxLength={11}
        onChange={handleChange}
        placeholder='search qq number message...'
        aria-label='search-input'
      />
      <SearchResult userInput={userInput} />
    </div>
  );
}
