import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  parentElement = document.querySelector('.results');
  errorMessage = 'No recipes found for your query. Please try again!';
  message = '';

  generateMarkup() {
    // console.log(this.data);
    return this.data
      .map(results => previewView.render(results, false))
      .join('');
  }
}

export default new ResultsView();
