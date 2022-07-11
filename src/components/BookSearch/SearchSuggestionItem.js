import { useDispatch } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { selectedBookActions } from '../../store/slices/selected-book-slice';
import { urls } from '../../utils/urls';
import classes from './SearchSuggestionItem.module.css';

const SearchSuggestionItem = (props) => {
  // const dispatch = useDispatch();
  const { searchSuggestion } = props;

  const processBookReview = (bookReview) => {
    console.log(bookReview);
    // dispatch(selectedBookActions.updateSelectedBook(searchSuggestion));
  };

  const searchSuggestionClickHandler = (e) => {
    var leadsRef = ref(props.database, 'reviews/');
    onValue(leadsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
    // sendRequest(urls.getReviewedBookUrl(props.isbn), null, processBookReview);
  };

  return (
    <button
      onClick={searchSuggestionClickHandler}
      className="list-group-item list-group-item-action"
    >
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
