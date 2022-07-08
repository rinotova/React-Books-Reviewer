import { useSelector } from 'react-redux';
import SearchSuggestionItem from './SearchSuggestionItem';
import classes from './SearchSuggestions.module.css';

const SearchSuggestions = () => {
  const searchSuggestions = useSelector(
    (state) => state.searchSuggestions.searchSuggestions
  );

  const showSuggestions = useSelector(
    (state) => state.searchSuggestions.showSuggestions
  );

  if (searchSuggestions.length === 0 || !showSuggestions) {
    return;
  }

  let mappedSearchSuggestions = [];
  let bookIds = [];
  searchSuggestions.forEach((searchSuggestion) => {
    if (bookIds.indexOf(searchSuggestion.id !== -1)) {
      bookIds.push(searchSuggestion.id);

      mappedSearchSuggestions.push(
        <SearchSuggestionItem
          key={searchSuggestion.id}
          searchSuggestion={searchSuggestion}
        />
      );
    }
  });

  const listGroupClasses = `list-group ${classes['suggestions-list']}`;

  return (
    <div className="row">
      <div className="col">
        <div className="d-flex flex-column border-bottom">
          <div className={listGroupClasses}>{mappedSearchSuggestions}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
