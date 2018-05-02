import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SourcePage from './SourceViewer/SourcePage';
import ArticlePage from './ArticleViewer/ArticlePage';
import HeaderBar from './HeaderComponent/Header';

function App() {
  return (
    <Router>
      <div>
        <HeaderBar />
        <Route name="sources" exact path="/" component={SourcePage} />
        <Route name="articles" path="/articles/" component={ArticlePage} />
      </div>
    </Router>
  );
}

export default App;
