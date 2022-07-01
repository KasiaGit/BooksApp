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

render();

const favoriteBooks = [];
const filters = [];

function initActions() {
    const choice = {
        dom: {
          book_image: '.book__image',
        }
    };
    const bookImage = document.querySelectorAll(choice.dom.book_image);        
    bookImage.forEach((item) => {
        item.addEventListener('click', (event) => {
            
        });
    });
    const booksList = document.querySelector(select.dom.book_list);
    booksList.addEventListener('click', (event) => {
        if(event.target.offsetParent.classList.contains('book__image')) {
            const clickLink = event.target.offsetParent;
            clickLink.classList.toggle('favorite');
            // clickLink.preventDefault();
            let dataId = clickLink.getAttribute('data-id'); 
            favoriteBooks.push(dataId);
            console.log(favoriteBooks);
       }
    });

    const form = {
        dom : {
            books_filter: '.filters',
        }
    };
   form = document.querySelector('.filters');
    form.addEventListener('click', (event) => {
        if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter')
        console.log('value');
        
    });
}
initActions();


