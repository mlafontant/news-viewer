import React from 'react';
import PropTypes from 'prop-types';

/*
  Presentational Component that allows users to filter the list of news sources.
*/

export default function SearchBox({ updateQuery }) {
  // TO DO: implement a debounce function
  // TO DO: prevent default form behavior
  return (
    <form className="search-area form-horizontal">
      <input type="text" className="form-control" id="search-input" placeholder="Search News..." onChange={updateQuery} />
    </form>
  );
}

SearchBox.propTypes = {
  updateQuery: PropTypes.func.isRequired,
};

