import { useSelector } from 'react-redux';

function bolderize(text, matchingText) {
  return text.replace(new RegExp('(' + matchingText + ')', 'gi'), '<b>$1</b>');
}

const SearchSuggestionItem = (props) => {
  const searchTerm = useSelector((state) => state.searchSuggestions.searchTerm);

  return (
    <button
      dangerouslySetInnerHTML={{
        __html: bolderize(props.searchSuggestion.title, searchTerm),
      }}
      onClick={props.onSearchSuggestionClick}
      className="list-group-item list-group-item-action"
    ></button>
  );
};

export default SearchSuggestionItem;
