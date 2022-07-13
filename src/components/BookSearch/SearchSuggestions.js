import { useSelector } from 'react-redux';
import SearchSuggestionItem from './SearchSuggestionItem';
import classes from './SearchSuggestions.module.css';

const SearchSuggestions = (props) => {
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
          database={props.database}
        />
      );
    }
  });

  const listGroupClasses = `d-flex flex-column border-bottom ${classes['suggestions-list']}`;

  return (
    <div className="row">
      <div className="col">
        <div className={listGroupClasses}>
          <div className="list-group">{mappedSearchSuggestions}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
