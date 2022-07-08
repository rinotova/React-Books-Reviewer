import { useSelector } from 'react-redux';
import BookTile from '../BookTile/BookTile';
import Section from '../Layout/Section/Section';

const BookReview = () => {
  const selectedBook = useSelector((state) => state.selectedBook.selectedBook);

  if (!selectedBook.id) {
    return;
  }

  return (
    <Section>
      <div className="col">
        <BookTile selectedBook={selectedBook} />
      </div>
    </Section>
  );
};

export default BookReview;
