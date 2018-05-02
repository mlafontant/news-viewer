import React from 'react';
import PropTypes from 'prop-types';

/*
  Presentation component that renders information about the relevant article.
*/

function Article(props) {
  return (
    <div className="article-box" >
      <a className="article-title" href={props.url}>{props.title}</a>
      <p className="article-description">{props.description}</p>
    </div>
  );
}

Article.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Article;
