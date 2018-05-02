import React from 'react';
import fetch from 'isomorphic-fetch';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import api from './../utility/api';

/*
  Stateful component that fetches all news sources from the News API.

  TO OPTIMIZE: Since news sources are not likely to change often, we can presist the list of news sources to local storage to minimize the number of future API calls.
*/

let cachedSources = [];

class SourcePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sources: cachedSources,
      query: '',
    };
    this.updateQuery = this.updateQuery.bind(this);
  }

  componentDidMount() {
    this.fetchFromAPI('sources');
  }

  fetchFromAPI(endpoint) {
    const baseURL = 'https://newsapi.org/v2/';
    const requestURL = `${baseURL + endpoint}?apiKey=${api.key}`;
    fetch(requestURL).then(data => data.json()).then((response) => {
      this.setState((prevState) => {
        cachedSources = response[endpoint];
        prevState[endpoint] = response[endpoint];
        return prevState;
      });
    });
  }

  updateQuery(event) {
    let query = event.target.value;
    query = query.toLowerCase();
    this.setState({ query });
  }

  render() {
    return (
      <div>
        <h2>News Sources</h2>
        <SearchBox updateQuery={this.updateQuery} />
        <SearchResults query={this.state.query} sources={this.state.sources} />
      </div>
    );
  }
}

export default SourcePage;
