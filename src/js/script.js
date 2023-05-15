/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');
  const select = {
    templateOf: {
      booksProduct: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      images: '.book__image',
    },
  };

  const templates = {
    templateBooks: Handlebars.compile(document.querySelector(select.templateOf.booksProduct).innerHTML),
  };

  const booksData = dataSource.books;

  // console.log(booksData);

  const favouriteBooks = [];

  const books = document.querySelector(select.containerOf.books);

  function render() {
    for (let book of booksData) {
      const generateHTML = templates.templateBooks({
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
      });
      const e = utils.createDOMFromHTML(generateHTML);
      books.appendChild(e);
    }
  }

  render();
  function initActions() {
    const images = document.querySelector(select.containerOf.books);

    images.addEventListener('dblclick', function (event) {
      event.preventDefault();

      const image = event.target.offsetParent;
      const dataID = image.getAttribute('data-id');

      if (!image.classList.contains('favorite')) {
        // console.log('yaaas');
        image.classList.add('favorite');
        favouriteBooks.push(dataID);
        console.log(favouriteBooks);
      } else {
        image.classList.remove('favorite');
        const indexOfID = favouriteBooks.indexOf(dataID);
        console.log(indexOfID);
        favouriteBooks.splice(indexOfID, 1);
        console.log(favouriteBooks);
      }
    });
  }
  initActions();
}
