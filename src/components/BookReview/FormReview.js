import { Rating, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import { ref, child, push, set, get } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { selectedBookActions } from '../../store/slices/selected-book-slice';
import useGetReviews from '../../hooks/use-get-reviews';

const FormReview = ({ selectedBook, database }) => {
  const dispatch = useDispatch();
  const { loadReviews } = useGetReviews(database);
  const [bookRating, setBookRating] = useState(0);
  const reviewTextRef = useRef('');

  const getDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
  };

  const onCancelReviewHandler = () => {
    dispatch(selectedBookActions.updateSelectedBook({}));
  };

  const onSubmitBookReviewHandler = async (e) => {
    e.preventDefault();

    try {
      const bookToReview = await get(
        ref(database, 'reviews/books/' + selectedBook.isbn)
      );
      const dataFromFirebaseBook = bookToReview.val();

      const theBook = {
        ...selectedBook,
        rating:
          dataFromFirebaseBook && 'rating' in dataFromFirebaseBook
            ? Math.ceil((bookRating + dataFromFirebaseBook.rating) / 2)
            : bookRating,
      };

      const theReview = {
        bookId: selectedBook.isbn,
        rating: bookRating,
        review: reviewTextRef.current.value,
        date: getDate(),
        modified: -1 * new Date().getTime(),
      };

      // Get a key for a new rating.
      const newRatingKey = push(child(ref(database), 'posts')).key;

      set(ref(database, 'reviews/books/' + selectedBook.isbn), theBook)
        .then(() => {
          set(ref(database, 'reviews/bookReviews/' + newRatingKey), theReview);
        })
        .then(() => {
          dispatch(selectedBookActions.updateSelectedBook({}));
        })
        .then(() => {
          loadReviews();
        });
    } catch (e) {
      dispatch(selectedBookActions.updateSelectedBook({}));
    }
  };

  return (
    <form onSubmit={onSubmitBookReviewHandler}>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <textarea
              ref={reviewTextRef}
              className="form-control"
              id="bookReviewText"
              rows="4"
              placeholder="Write a review..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-8">
          <Typography component="legend">Give a rating!</Typography>
          <Rating
            name="simple-controlled"
            value={bookRating}
            onChange={(event, newValue) => {
              setBookRating(newValue);
            }}
          />
        </div>
        <div className="col-4">
          <div className="row justify-content-end">
            <div className="col">
              <button
                onClick={onCancelReviewHandler}
                type="button"
                className="btn btn-link"
              >
                Cancel
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormReview;
