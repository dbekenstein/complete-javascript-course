import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  parentElement = document.querySelector('.bookmarks__list');
  errorMessage = 'No bookmarks yet.';
  message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  generateMarkup() {
    // console.log(this.data);
    return this.data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
