import { useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { searchSuggestionsActions } from '../../store/slices/search-suggestions-slice';
import { fromEvent, distinctUntilChanged, debounceTime, map, tap } from 'rxjs';
import useFetch from '../../hooks/use-fetch';
import { urls } from '../../utils/urls';
import Section from '../Layout/Section/Section';

const SearchForm = () => {
  const inputSearchRef = useRef('');
  const dispatch = useDispatch();
  const { sendRequest } = useFetch();

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

      let mappedSearchSuggestions = books
        .filter(
          (book) =>
            book.volumeInfo.title && 'industryIdentifiers' in book.volumeInfo
        )
        .map((book) => {
          let authors = book?.volumeInfo?.authors;
          let imgUrl = book.volumeInfo?.imageLinks?.smallThumbnail;
          let imgCoverUrl = book.volumeInfo?.imageLinks?.thumbnail;

          const bookObj = {
            id: book.id,
            title: book.volumeInfo.title,
            year: new Date(book.volumeInfo.publishedDate).getFullYear() + '.',
            editorial: book.volumeInfo.publisher,
            imgUrl: imgUrl ? imgUrl : '',
            authors: authors ? authors.join(',') : '',
            isbn: book.volumeInfo.industryIdentifiers[0].identifier,
            sinopsis: book.volumeInfo.description,
            imgCoverUrl: imgCoverUrl ? imgCoverUrl : '',
            previewLink: book.volumeInfo.previewLink,
          };

          return bookObj;
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

  const onChangeSearchTermHandler = () => {
    dispatch(
      searchSuggestionsActions.updateSearchTerm(inputSearchRef.current.value)
    );
  };

  const searchSuggestionsDispatchHandler = useCallback(
    (searchTerm) => {
      if (searchTerm.length < 3) {
        dispatch(searchSuggestionsActions.removeSuggestions());
      } else {
        sendRequest(
          urls.getSearchByTermUrl(searchTerm),
          null,
          processSuggestionsResults,
          null
        );
      }
    },
    [dispatch, sendRequest, processSuggestionsResults]
  );

  const submitHandler = (e) => e.preventDefault();

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

    return () => {
      inputSearch$.unsubscribe();
    };
  }, [searchSuggestionsDispatchHandler]);

  return (
    <Section>
      <div className="col">
        <form onSubmit={submitHandler}>
          <input
            type="search"
            ref={inputSearchRef}
            className="form-control form-control-lg"
            placeholder="Book title..."
            onClick={onClickSearchTermHandler}
            onChange={onChangeSearchTermHandler}
          />
        </form>
      </div>
    </Section>
  );
};

export default SearchForm;
