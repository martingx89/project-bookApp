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

  class BooksList {
    constructor() {
      const thisBooks = this;
      console.log(thisBooks);

      thisBooks.initData();
      thisBooks.getElement();
      thisBooks.render();
      thisBooks.initActions();
    }

    initData() {
      const thisBooks = this;

      thisBooks.booksData = dataSource.books;
      thisBooks.favouriteBooks = [];
    }

    getElement() {
      const thisBooks = this;
      thisBooks.bookContainer = document.querySelector(select.containerOf.books);
    }

    render() {
      const thisBooks = this;

      for (let book of thisBooks.booksData) {
        const generateHTML = templates.templateBooks({
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
        });
        const element = utils.createDOMFromHTML(generateHTML);
        thisBooks.bookContainer.appendChild(element);
      }
    }

    initActions() {
      const thisBooks = this;
      thisBooks.bookContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const image = event.target.offsetParent;

        const dataId = image.getAttribute('data-id');

        if (!thisBooks.favoriteBooks.includes(dataId)) {
          image.classList.add('favorite');
          thisBooks.favoriteBooks.push(dataId);
        } else {
          const indexOfBooks = thisBooks.favoriteBooks.indexOf(dataId);
          thisBooks.favoriteBooks.splice(indexOfBooks, 1);
          image.classList.remove('favorite');
        }
      });
    }
  }

  const app = new BooksList();
  console.log(app);
}
