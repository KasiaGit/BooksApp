'use strict';

const select = {
    template: {
      book: '#template-book',
    },
    dom: {
      book_list: '.books-list',
    }
};
const templates = {
    book: Handlebars.compile(document.querySelector(select.template.book).innerHTML),
};

function render() {
  for(let book in dataSource.books) {
    const generatedHTML = templates.book(dataSource.books[book]),
      booksList = document.querySelector(select.dom.book_list),
      generatedDOM = utils.createDOMFromHTML(generatedHTML);

    booksList.appendChild(generatedDOM);
  }
}

const favoriteBooks = [];
const filters = [];

function initActions() {
    const booksList = document.querySelector(select.dom.book_list);
    booksList.addEventListener('click', (event) => {
        if(event.target.offsetParent.classList.contains('book__image')) {
            const clickLink = event.target.offsetParent;
            clickLink.classList.toggle('favorite');
            let dataId = clickLink.getAttribute('data-id'); 
            favoriteBooks.push(dataId);
       }
    });

    const form = {
        dom : {
            books_filter: '.filters',
        }
    };
    const books_filter = document.querySelector(form.dom.books_filter);
    books_filter.addEventListener('click', (event) => {
        if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
            console.log(event.target.value);
            if(event.target.checked) {
                filters.push(event.target.value);
            }
            else {
                filters.splice(filters.indexOf(event.target.value), 1);
            } 
            console.log(filters);
        }
        filterBooks();
    });
}

function filterBooks(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;
  
      for(const filter of filters){
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const booksHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
  
      if(shouldBeHidden){
            booksHidden.classList.add('hidden');
      } else {
            booksHidden.classList.remove('hidden');
      }
  }
}

initActions();
render();