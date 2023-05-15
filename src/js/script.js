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
      filters: '.filters',
    },
  };
  // reference to template and list
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
      thisBooks.favoriteBooks = [];
      thisBooks.filters = [];
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

      const booksFilter = document.querySelector(select.containerOf.filters);

      booksFilter.addEventListener('click', function (event) {
        const clickedElement = event.target;

        if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {
          if (clickedElement.checked) {
            thisBooks.filters.push(clickedElement.value);
          } else {
            const indexOfValue = thisBooks.filters.indexOf(clickedElement.value);
            thisBooks.filters.splice(indexOfValue, 1);
          }
        }
        console.log(thisBooks.filters);
        thisBooks.filterBooks();
      });
    }

    filterBooks() {
      const thisBooks = this;

      console.log('filterBooksinit');

      for (let book of thisBooks.booksData) {
        let shouldBeHidden = false;
        const hiddenBooks = document.querySelector(select.containerOf.images + '[data-id = "' + book.id + '"]');

        for (let filter of thisBooks.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          hiddenBooks.classList.add('hidden');
        } else {
          hiddenBooks.classList.remove('hidden');
        }
      }
    }
  }

  const app = new BooksList();
  console.log(app);
}
