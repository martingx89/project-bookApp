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

  const settings = {
    ratings: {
      rating1: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)', // Rating < 6
      rating2: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)', // Rating > 6 && <= 8
      rating3: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)', // Rating > 8 && <= 9
      rating4: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)', // Rating > 9
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
        const ratingBgc = thisBooks.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        const generateHTML = templates.templateBooks({
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
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

    determineRatingBgc(rating) {
      let bacgroundColor = '';

      if (rating < 6) {
        bacgroundColor = settings.ratings.rating1;
      } else if (rating > 6 && rating <= 8) {
        bacgroundColor = settings.ratings.rating2;
      } else if (rating > 8 && rating <= 9) {
        bacgroundColor = settings.ratings.rating3;
      } else if (rating > 9) {
        bacgroundColor = settings.ratings.rating4;
      }
      return bacgroundColor;
    }
  }

  const app = new BooksList();
  console.log(app);
}
