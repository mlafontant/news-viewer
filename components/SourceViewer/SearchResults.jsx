import React from 'react';
import PropTypes from 'prop-types';
import SourceDisplay from './SourceDisplay';

/*
  Functional component that filters the list of sources based on the users input.

  If nothing is entered into the search bar, all sources are displayed.
*/


export default function SearchResults({ query, sources }) {
  // accept filter / query that limits the sources displayed
  const results = sources.reduce((acc, entry) => {
    const sourceName = entry.name.toLowerCase();
    if (query ? sourceName.includes(query) : true) {
      const source = <SourceDisplay key={entry.id} sourceName={entry.name} sourceID={entry.id} />;
      acc.push(source);
    }
    return acc;
  }, []);

  return (
    <div className="result-viewer">
      {results}
    </div>
  );
}

SearchResults.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
};
