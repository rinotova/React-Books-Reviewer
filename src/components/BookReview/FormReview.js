import { Rating, Typography } from '@mui/material';
import { useState, useRef } from 'react';

const FormReview = ({ selectedBook }) => {
  const [bookRating, setBookRating] = useState(0);
  const reviewTextRef = useRef('');

  const onSubmitBookReviewHandler = (e) => {
    e.preventDefault();
    const bookReview = {
      ...selectedBook,
      ratings: selectedBook.ratings.push({
        reviewText: reviewTextRef.current.value,
        rating: bookRating,
      }),
    };

    console.log(bookReview);
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
            precision={0.5}
          />
        </div>
        <div className="col-4">
          <div className="row justify-content-end">
            <div className="col">
              <button type="button" className="btn btn-link">
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
