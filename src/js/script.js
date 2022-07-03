'use strict';

const opt = {
  select: {
    booksList: '.books-list',
    bookImage: 'book__image',
    filterForm: '.filters',
    dataID: 'data-id',
  },
  classNames: {
    favorite: 'favorite',
    hidden: 'hidden',
  },
  templates: {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  }
};
const arr = {
  favoriteBooks: [],
  filters: [],
};

class BooksList {
  constructor() {
    const thisBooksList = this;

    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
  }
  initData() {
    const thisBooksList = this;

    thisBooksList.data = dataSource.books;
  }
  getElements() {
    const thisBooksList = this;

    thisBooksList.dom = {};
    thisBooksList.dom.booksList = document.querySelector(opt.select.booksList);
    thisBooksList.dom.filterForm = document.querySelector(opt.select.filterForm);
  }
  render(){
    const thisBooksList = this;

    for(let book of thisBooksList.data){
      const generatedHTML = opt.templates.bookTemplate(book),
        generatedDOM = utils.createDOMFromHTML(generatedHTML);

      thisBooksList.dom.booksList.appendChild(generatedDOM);
    }
  }
  initActions(){
    const thisBooksList = this;

    thisBooksList.dom.booksList.addEventListener('dblclick', function(event){
      const bookImageID = event.target.offsetParent.getAttribute(opt.select.dataID);

      event.preventDefault();

      if(event.target.offsetParent.classList.contains(opt.select.bookImage)){
        if(!arr.favoriteBooks.includes(bookImageID)){
          event.target.offsetParent.classList.add(opt.classNames.favorite);
          arr.favoriteBooks.push(bookImageID);
        } else {
          arr.favoriteBooks.splice(arr.favoriteBooks.indexOf(bookImageID), 1);
          event.target.offsetParent.classList.remove(opt.classNames.favorite);
        }
      }
    });
    thisBooksList.dom.filterForm.addEventListener('click', function(event){
      if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
        if(event.target.checked){
          arr.filters.push(event.target.value);
        } else {
          arr.filters.splice(arr.filters.indexOf(event.target.value), 1);
        }
      }
      thisBooksList.filterBooks(); 
    });
  }
  filterBooks(){
    const thisBooksList = this;

    for(let book of thisBooksList.data){
      const bookDOM = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;

      for(const filter of arr.filters){
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      console.log(shouldBeHidden);
      if(shouldBeHidden){
        bookDOM.classList.add(opt.classNames.hidden);
      } else {
        bookDOM.classList.remove(opt.classNames.hidden);
      }
    }
  }
  // determineRatingBgc(rating){
 
  // }
}

const app = new BooksList(); //eslint-disable-line no-unused-vars