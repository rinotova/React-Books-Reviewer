import { useCallback, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reviewsListActions } from '../../store/slices/reviews-list-slice';
import ReviewListItem from './ReviewListItem';

const ReviewsList = (props) => {
  const dispatch = useDispatch();
  const reviewsList = useSelector((state) => state.reviewsList.reviewsList);

  const loadReviews = useCallback(
    (books) => {
      const reviewsObj = {};
      let theBook;

      const reviewsRef = ref(props.database, 'reviews/bookReviews/');
      onValue(
        reviewsRef,
        (snapshot) => {
          snapshot.forEach((child) => {
            const review = child.val();
            let reviewsArray = [];
            theBook = reviewsObj[review.bookId];

            if (theBook) {
              reviewsArray = theBook.reviews.concat([
                { ...review, reviewId: child.key },
              ]);
            } else {
              reviewsArray = new Array({ ...review, reviewId: child.key });
            }

            reviewsObj[review.bookId] = {
              ...books[review.bookId],
              reviews: reviewsArray,
            };
          });
          dispatch(reviewsListActions.updateReviewsList(reviewsObj));
        },
        {
          onlyOnce: true,
        }
      );
    },
    [props.database, dispatch]
  );

  useEffect(() => {
    console.log('running yes');
    const booksRef = ref(props.database, 'reviews/books/');
    const booksObj = {};

    onValue(
      booksRef,
      (snapshot) => {
        snapshot.forEach((child) => {
          booksObj[child.key] = child.val();
        });
        loadReviews(booksObj);
      },
      {
        onlyOnce: true,
      }
    );
  }, [props.database, loadReviews]);

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
