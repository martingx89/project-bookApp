/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');
  const select = {
    templateOf: {
      booksProduct: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    imageWrapper: {
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
    const images = document.querySelectorAll(select.imageWrapper.images);

    console.log(images);

    for (const image of images) {
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        console.log(image);
        image.classList.toggle('favorite');

        const dataID = image.getAttribute('data-id');
        favouriteBooks.push(dataID);
        console.log(favouriteBooks);
      });
    }
  }
  initActions();
}
