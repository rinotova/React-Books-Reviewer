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
  let mappedSearchSuggestions;

  if (searchSuggestions.length > 0 && showSuggestions) {
    mappedSearchSuggestions = searchSuggestions.map((searchSuggestion) => {
      return (
        <SearchSuggestionItem
          key={searchSuggestion.id}
          searchSuggestion={searchSuggestion}
        />
      );
    });
  } else {
    return;
  }
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
