import * as React from 'react';

const SearchUser = () => {
  const [search, setSearch] = React.useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Implement search users function with debounce
  };

  return (
    <div>
      <input type='text' onChange={handleChange} />
    </div>
  );
};

export default SearchUser;
