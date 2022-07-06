const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            The Books Reviewer
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-column align-items-end"
            id="navbarSupportedContent"
          >
            <button type="button" className="btn btn-light">
              Login
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
