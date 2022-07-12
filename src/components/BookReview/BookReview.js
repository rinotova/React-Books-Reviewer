import { useSelector } from 'react-redux';
import BookTile from '../BookTile/BookTile';
import Section from '../Layout/Section/Section';
import FormReview from './FormReview';

const BookReview = (props) => {
  const selectedBook = useSelector((state) => state.selectedBook.selectedBook);

  if (!selectedBook || Object.keys(selectedBook).length === 0) {
    return;
  }

  return (
    <Section>
      <div className="col">
        <BookTile selectedBook={selectedBook} />
        <FormReview selectedBook={selectedBook} database={props.database} />
      </div>
    </Section>
  );
};

export default BookReview;
