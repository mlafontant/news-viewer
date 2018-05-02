import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/*
  This is a presentational componet that displays minimal information about a source.

  Enables Users to view articles associated with a source by clicking and being navigated to the respective articles page.
*/

export default function SourceDisplay({ sourceName, sourceID }) {
  return (
    <div className="result-display">
      <Link to={`/articles?sources=${sourceID}`} href={`/articles/${sourceID}`}><span>{sourceName}</span></Link>
    </div>
  );
}

SourceDisplay.propTypes = {
  sourceName: PropTypes.string.isRequired,
  sourceID: PropTypes.string.isRequired,
};
