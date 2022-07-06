import { Fragment } from 'react';
import Section from '../Layout/Section/Section';
import SearchForm from './SearchForm';
import SearchSuggestions from './SearchSuggestions';

const BookSearch = () => {
  return (
    <Fragment>
      <Section>
        <div className="col">
          <SearchForm />
        </div>
      </Section>
      <SearchSuggestions />
    </Fragment>
  );
};

export default BookSearch;
