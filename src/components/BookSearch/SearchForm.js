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
          return {
            id: book.id,
            title: book.volumeInfo.title,
            year: book.volumeInfo.publishedDate,
            editorial: book.volumeInfo.publisher,
            imgUrl: imgUrl ? imgUrl : '',
            authors: authors ? authors.join(',') : '',
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
      />
    </form>
  );
};

export default SearchForm;
