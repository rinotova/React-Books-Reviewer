import { useSelector } from 'react-redux';
import SearchSuggestionItem from './SearchSuggestionItem';

const SearchSuggestions = () => {
  const searchSuggestions = useSelector(
    (state) => state.searchSuggestions.searchSuggestions
  );
  let mappedSearchSuggestions;

  const searchSuggestionClickHandler = (id) => {
    console.log(id);
  };

  if (searchSuggestions.length > 0) {
    mappedSearchSuggestions = searchSuggestions.map((searchSuggestion) => {
      return (
        <SearchSuggestionItem
          key={searchSuggestion.id}
          searchSuggestion={searchSuggestion}
          onSearchSuggestionClick={searchSuggestionClickHandler.bind(
            null,
            searchSuggestion.id
          )}
        />
      );
    });
  } else {
    return;
  }

  return (
    <div className="row">
      <div className="col">
        <div className="d-flex flex-column">
          <div className="list-group">{mappedSearchSuggestions}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
