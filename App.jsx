import { h } from 'preact';
import { Router, Route } from 'preact-router';
import Header from './components/Header';
import Home from './routes/Home';
import SearchResults from './routes/SearchResults';
import ComicDetail from './routes/ComicDetail';
import ChapterReader from './routes/ChapterReader';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Router>
          <Route path="/" component={Home} />
          <Route path="/search" component={SearchResults} />
          <Route path="/comic/:slug" component={ComicDetail} />
          <Route path="/read/:slug" component={ChapterReader} />
        </Router>
      </main>
      <footer className="py-4 text-center text-gray-500 text-sm border-t border-gray-800 mt-12">
        © {new Date().getFullYear()} FmcComic. All rights reserved.
      </footer>
    </div>
  );
}
