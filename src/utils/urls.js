export const urls = {
  getSearchByTermUrl: (searchTerm) =>
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&maxResults=10&langRestrict=en`,
  searchByIdUrl: '',
};
