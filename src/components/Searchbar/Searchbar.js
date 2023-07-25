import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { Notify } from 'notiflix';
import './Searchbar.css';

function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = e => setSearch(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    if (search.trim() === '') {
      Notify.failure('Search query cannot be an empty string');
      return;
    }

    onSubmit(search);
    setSearch('');
  };

  return (
    <div className="nav">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <FaSearch />
        </button>

        <input
          className="form__input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={search}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;