import React from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import api from './../utility/api';
import Article from './Article';

/* Cache to store headline articles from current session
 Extension would be to store data in the local storage to avoid multiple API calls but, since news update frequently, we would need to account for cache invalidation
 */

const cache = {};

/*
  This component parses the query string in the window's address bar to determien the relevant news source. 

  If the news source was previously viewed in this session, news headlines from the cache are rendered.

  Otherwise, articles for the source are fetched, written through to the cache then rendered.
*/

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    const query = window.location.search;
    const sourceID = query.substring(8);
    const sourceName = cache[sourceID] ? cache[sourceID][0].source.name : null;
    this.state = {
      query,
      sourceID,
      articles: cache[sourceID],
      sourceName,
    };
    this.toggleSort = this.toggleSort.bind(this);
  }

  componentDidMount() {
    const { sourceID, query, articles } = this.state;
    if (!articles) {
      this.fetchFromAPI('top-headlines', query, sourceID);
    }
  }

  fetchFromAPI(endpoint, query, param) {
    const baseURL = 'https://newsapi.org/v2/';
    const requestURL = `${baseURL + endpoint}${query}&apiKey=${api.key}`;
    fetch(requestURL).then(data => data.json()).then((response) => {
      cache[param] = response.articles;
      const sourceName = cache[param][0].source.name;
      this.setState({ articles: cache[param], sourceName });
    });
  }

  toggleSort(type) {
    let articles = [...this.state.articles];
    switch (type) {
      case 'oldest':
        articles = articles.sort((a, b) => {
          return a.publishedAt > b.publishedAt;
        });
        break;
      case 'newest':
        articles = articles.sort((a, b) => a.publishedAt < b.publishedAt);
        break;
      default:
        articles = cache[this.state.sourceID];
        break;
    }
    this.setState({ articles });
  }

  render() {
    const { articles, sourceName } = this.state;
    // entry.publishedAt
    const listOfArticles = articles ? articles.map((entry, i) => (
      <Article key={i} title={entry.title} url={entry.url} description={entry.description} />
    )) : (
      <div>Not Found</div>
    );
    const displayName = sourceName ? `${sourceName}: ` : '';

    return (
      <div className="articles-page">
        <h2>{displayName}Articles</h2>
        <div className="page-control">
          <Link to="" href="/">Back</Link>
          <div className="button-inline">
            <span className="subtitle">Sort by:</span>
            <button className="btn btn-default" onClick={() => { this.toggleSort('newest'); }}>Newest</button>
            <button className="btn btn-default" onClick={() => { this.toggleSort('oldest'); }}>Oldest</button>
            <button className="btn btn-danger" onClick={this.toggleSort}>Reset</button>
          </div>
        </div>
        {listOfArticles}
      </div>
    );
  }
}


export default ArticlePage;
