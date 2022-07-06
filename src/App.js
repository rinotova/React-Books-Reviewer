import { Fragment } from 'react';
import Header from './components/Header/Header';
import BookSearch from './components/BookSearch/BookSearch';
import './App.css';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <div className="container">
          <BookSearch />
        </div>
      </main>
    </Fragment>
  );
}

export default App;
