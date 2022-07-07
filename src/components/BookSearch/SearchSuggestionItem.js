const SearchSuggestionItem = (props) => {
  const { searchSuggestion } = props;
  return (
    <button
      onClick={props.onSearchSuggestionClick}
      className="list-group-item list-group-item-action"
    >
      <div className="d-flex flex-row">
        <img src={searchSuggestion.imgUrl} alt={searchSuggestion.title} />
        <div className="d-flex flex-column">
          <h6>{searchSuggestion.title}</h6>
          <p>
            {searchSuggestion.authors}, {searchSuggestion.year}
          </p>
          <p>{searchSuggestion.editorial}</p>
        </div>
      </div>
    </button>
  );
};

export default SearchSuggestionItem;
