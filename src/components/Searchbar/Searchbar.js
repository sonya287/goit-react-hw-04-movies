import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

const SearchBar = ({ onClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = evt => {
    setSearchQuery(evt.target.value);
  };

  const handleClick = evt => {
    evt.preventDefault();

    if (searchQuery === '') {
      toast.error('Ooops...No results:(');
      return;
    }
    onClick(searchQuery);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleClick} className={s.SearchForm}>
        <button type="submit" className={s.SearchForm__button}>
          <ImSearch />
        </button>
        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInput}
        ></input>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchBar;
