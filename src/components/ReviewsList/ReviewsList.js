import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReviewListItem from './ReviewListItem';
import useGetReviews from '../../hooks/use-get-reviews';

const ReviewsList = (props) => {
  const reviewsList = useSelector((state) => state.reviewsList.reviewsList);
  const { loadReviews } = useGetReviews(props.database);

  useEffect(() => {
    console.log('running reviews list');
    loadReviews();
  }, [loadReviews]);

  const reviews = [];

  if (Object.keys(reviewsList).length === 0) {
    return;
  }

  Object.keys(reviewsList).forEach((key) => {
    reviews.push(<ReviewListItem key={key} selectedBook={reviewsList[key]} />);
  });

  return reviews;
};

export default ReviewsList;
