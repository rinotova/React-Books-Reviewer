import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { reviewsListActions } from '../store/slices/reviews-list-slice';
import { onValue, orderByChild, query, ref } from 'firebase/database';

const useGetReviews = (db) => {
  const dispatch = useDispatch();
  const loadReviews = useCallback(() => {
    const booksRef = ref(db, 'reviews/books/');
    const booksObj = {};

    // GET BOOKS
    onValue(
      booksRef,
      (snapshot) => {
        snapshot.forEach((child) => {
          booksObj[child.key] = child.val();
        });
        const reviewsObj = {};
        let theBook;
        const reviewsRef = query(
          ref(db, 'reviews/bookReviews/'),
          orderByChild('modified')
        );

        // GET REVIEWS
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
                ...booksObj[review.bookId],
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
      {
        onlyOnce: true,
      }
    );
  }, [db, dispatch]);
  return { loadReviews };
};

export default useGetReviews;
