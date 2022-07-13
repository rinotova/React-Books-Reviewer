import { useDispatch } from 'react-redux';
import { selectedBookActions } from '../../store/slices/selected-book-slice';
import classes from './SearchSuggestionItem.module.css';

const SearchSuggestionItem = (props) => {
  const dispatch = useDispatch();
  const { searchSuggestion } = props;

  const searchSuggestionClickHandler = () => {
    dispatch(selectedBookActions.updateSelectedBook(searchSuggestion));
  };

  const buttonClasses = `list-group-item list-group-item-action ${classes.suggestionButton}`;
  return (
    <button onClick={searchSuggestionClickHandler} className={buttonClasses}>
      <div className="d-flex flex-row p-2 mx-2">
        {searchSuggestion.imgUrl && (
          <img
            className={classes.bookCover}
            src={searchSuggestion.imgUrl}
            alt={searchSuggestion.title}
            loading="lazy"
          />
        )}
        {!searchSuggestion.imgUrl && (
          <div className={classes.imgPlaceholder}>
            <h6>No cover</h6>
          </div>
        )}
        <div className="d-flex flex-column p-2">
          <h5>{searchSuggestion.title}</h5>
          <p>
            {searchSuggestion.authors}, {searchSuggestion.year}
          </p>
          {searchSuggestion.editorial && (
            <p>Publisher: {searchSuggestion.editorial}</p>
          )}
        </div>
      </div>
    </button>
  );
};

export default SearchSuggestionItem;
