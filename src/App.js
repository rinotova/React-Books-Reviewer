import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header/Header';
import BookSearch from './components/BookSearch/BookSearch';
import { searchSuggestionsActions } from './store/slices/search-suggestions-slice';
import './App.css';
import BookReview from './components/BookReview/BookReview';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener('click', () => {
      dispatch(searchSuggestionsActions.hideSuggestions());
    });
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <main className="mainContainer">
        <div className="container-max">
          <BookSearch />
          <BookReview />
        </div>
      </main>
    </Fragment>
  );
}

export default App;
