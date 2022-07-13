import { Rating } from '@mui/material';

const ReviewItem = (props) => {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col">
          <p>Anonymous</p>
        </div>
        <div className="col">
          <p>{props.review.date}</p>
        </div>
        <div className="col">
          <Rating name="read-only" value={props.review.rating} readOnly />
        </div>
      </div>
      <div className="row">
        <p>{props.review.review}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
