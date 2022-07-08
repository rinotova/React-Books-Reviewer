const BookTile = ({ selectedBook }) => {
  return (
    <div className="d-flex">
      <div className="d-flex flex-column">
        <img src={selectedBook.imgCoverUrl} alt={selectedBook.title} />
        <button>Buy</button>
      </div>
      <div className="d-flex flex-column">
        <h5>{selectedBook.title}</h5>
        <p>
          {selectedBook.authors}, {selectedBook.year}
        </p>
        <p>Sinopsis: {selectedBook.sinopsis}</p>
      </div>
    </div>
  );
};

export default BookTile;
