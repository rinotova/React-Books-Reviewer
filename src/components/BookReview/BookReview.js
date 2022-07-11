import { useSelector } from 'react-redux';
import BookTile from '../BookTile/BookTile';
import Section from '../Layout/Section/Section';
import FormReview from './FormReview';

const BookReview = () => {
  const selectedBook = useSelector((state) => state.selectedBook.selectedBook);

  if (!selectedBook || Object.keys(selectedBook).length === 0) {
    return;
  }

  return (
    <Section>
      <div className="col">
        <BookTile selectedBook={selectedBook} />
        <FormReview selectedBook={selectedBook} />
      </div>
    </Section>
  );
};

export default BookReview;
