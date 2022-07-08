import { useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { searchSuggestionsActions } from '../../store/slices/search-suggestions-slice';
import { fromEvent, distinctUntilChanged, debounceTime, map, tap } from 'rxjs';
import useFetch from '../../hooks/use-fetch';
import { urls } from '../../utils/urls';

const SearchForm = () => {
  const inputSearchRef = useRef('');
  const dispatch = useDispatch();
  const { isFetchError, sendRequest } = useFetch();

  if (isFetchError) {
    dispatch(searchSuggestionsActions.removeSuggestions());
  }

  const onInputSearchTermHandler = () => {
    dispatch(
      searchSuggestionsActions.updateSearchTerm(inputSearchRef.current.value)
    );
  };

  const onClickSearchTermHandler = (e) => {
    e.stopPropagation();
    dispatch(searchSuggestionsActions.showSuggestions());
  };

  const processSuggestionsResults = useCallback(
    ({ items: books }) => {
      if (!books || books.length === 0) {
        dispatch(searchSuggestionsActions.removeSuggestions());
        return;
      }

      const mappedSearchSuggestions = books
        .filter((book) => book.volumeInfo.title)
        .map((book) => {
          let authors = book?.volumeInfo?.authors;
          let imgUrl = book.volumeInfo?.imageLinks?.smallThumbnail;
          let imgCoverUrl = book.volumeInfo?.imageLinks?.thumbnail;
          return {
            id: book.id,
            title: book.volumeInfo.title,
            year: new Date(book.volumeInfo.publishedDate).getFullYear() + '.',
            editorial: book.volumeInfo.publisher,
            imgUrl: imgUrl ? imgUrl : '',
            authors: authors ? authors.join(',') : '',
            isbn: book.volumeInfo.industryIdentifiers[0].identifier,
            sinopsis: book.volumeInfo.description,
            imgCoverUrl: imgCoverUrl ? imgCoverUrl : '',
          };
        });

      if (mappedSearchSuggestions.length > 0) {
        dispatch(
          searchSuggestionsActions.addSuggestions(mappedSearchSuggestions)
        );
      } else {
        dispatch(searchSuggestionsActions.removeSuggestions());
      }
    },
    [dispatch]
  );

  const searchSuggestionsDispatchHandler = useCallback(
    (searchTerm) => {
      if (searchTerm.length < 3) {
        dispatch(searchSuggestionsActions.removeSuggestions());
      } else {
        sendRequest(
          urls.getSearchByTermUrl(searchTerm),
          null,
          processSuggestionsResults
        );
      }
    },
    [dispatch, sendRequest, processSuggestionsResults]
  );

  useEffect(() => {
    const inputSearch$ = fromEvent(inputSearchRef.current, 'input');
    inputSearch$
      .pipe(
        map((e) => e.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        tap((searchTerm) => searchSuggestionsDispatchHandler(searchTerm))
      )
      .subscribe();
  }, [searchSuggestionsDispatchHandler]);

  return (
    <form>
      <input
        type="search"
        ref={inputSearchRef}
        className="form-control form-control-lg"
        placeholder="Book title..."
        onInput={onInputSearchTermHandler}
        onClick={onClickSearchTermHandler}
      />
    </form>
  );
};

export default SearchForm;
