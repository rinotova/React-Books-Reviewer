import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import BookTile from '../BookTile/BookTile';
import Section from '../Layout/Section/Section';
import { useState } from 'react';
import ReviewItem from './ReviewItem';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const ReviewListItem = (props) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const reviews = props.selectedBook.reviews.map((review) => (
    <ReviewItem key={review.reviewId} review={review} />
  ));

  const reviewsHeadline = `Reviews (${props.selectedBook.reviews.length})`;

  return (
    <Section>
      <div className="col">
        <BookTile selectedBook={props.selectedBook} />
      </div>
      <div className="row">
        <div className="col">
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText primary={reviewsHeadline} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {reviews}
            </Collapse>
          </List>
        </div>
      </div>
    </Section>
  );
};

export default ReviewListItem;
