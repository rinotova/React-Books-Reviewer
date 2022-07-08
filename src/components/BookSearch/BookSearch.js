import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Section from '../Layout/Section/Section';
import SearchForm from './SearchForm';
import SearchSuggestions from './SearchSuggestions';

const BookSearch = () => {
  const searchSuggestions = useSelector(
    (state) => state.searchSuggestions.searchSuggestions
  );

  const hasSearchSuggestions = searchSuggestions.length > 0;

  return (
    <Fragment>
      <Section>
        <div className="col">
          <SearchForm />
        </div>
      </Section>
      {hasSearchSuggestions && <SearchSuggestions />}
    </Fragment>
  );
};

export default BookSearch;
