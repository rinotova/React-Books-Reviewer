import classes from './BookTile.module.css';

const BookTile = ({ selectedBook }) => {
  const buyButtonClasses = `btn btn-primary m-2 ${classes.buyButton}`;
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2">
          {selectedBook.imgCoverUrl && (
            <img
              src={selectedBook.imgCoverUrl}
              alt={selectedBook.title}
              className="d-block img-fluid rounded-start m-2"
            />
          )}
          {!selectedBook.imgCoverUrl && (
            <div className={classes.imgPlaceholder}>
              <h6>No cover</h6>
            </div>
          )}
          <a
            href={selectedBook.previewLink}
            className={buyButtonClasses}
            target="_blank"
            rel="noreferrer"
          >
            Preview
          </a>
        </div>
        <div className="col-md-10">
          <div className="card-body m-2">
            <h3 className="card-title fw-bold">{selectedBook.title}</h3>
            <p className="card-text">
              {selectedBook.authors}, {selectedBook.year}
            </p>
            {selectedBook.sinopsis && (
              <p className="card-text lh-lg fst-italic">
                <u>Sinopsis:</u>&nbsp;
                {selectedBook.sinopsis}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTile;
