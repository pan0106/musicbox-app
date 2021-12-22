import icons from 'url:../../img/icons.svg';
import icons2 from 'url:../../img/icons-2.svg';

import View from './View.js';

class ChartsView extends View {
  _parentElement = document.querySelector('.charts');
  _errorMessage = '錯誤';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return `
        <div class="chart">
        <svg class="chart__icon chart__icon--top1">
            <use href="${icons2}#icon-award-stroke"></use>
          </svg>
        <a href="#${this._data[0].id}" class='chartLink'>
          <figure class="chart__fig">
            <img
              class="chart__img"
              src=${this._data[0].image}
              alt=${this._data[0].title}
            />
          </figure>
          <div class="chart__content">
            <div class="chart__header--container">
              <h4 class="chart__header chart__header--title">
              ${this._data[0].title}
              </h4>
            </div>
            <h4 class="chart__header chart__header--rating">
            <svg class="chart__star">
            <use href="${icons2}#icon-star-full"></use>
          </svg>
            ${this._calcRating(this._data[0])}/5
            </h4>
          </div>
        </a>
      </div>
      <div class="chart">
      <svg class="chart__icon chart__icon--top2">
      <use href="${icons2}#icon-award-stroke"></use>
    </svg>
        <a href="#${this._data[1].id}" class='chartLink'>
          <figure class="chart__fig">
            <img
              class="chart__img"
              src=${this._data[1].image}
              alt=${this._data[1].title}
            />
          </figure>
          <div class="chart__content">
            <div class="chart__header--container">
              <h4 class="chart__header chart__header--title">
              ${this._data[1].title}
              </h4>
            </div>
            <h4 class="chart__header chart__header--rating">
            <svg class="chart__star">
            <use href="${icons2}#icon-star-full"></use>
          </svg>
            ${this._calcRating(this._data[1])}/5</h4>
          </div>
        </a>
      </div>
      <div class="chart">
      <svg class="chart__icon chart__icon--top3">
      <use href="${icons2}#icon-award-stroke"></use>
    </svg>
        <a href="#${this._data[2].id}" class='chartLink'>
          <figure class="chart__fig">
            <img
              class="chart__img"
              src=${this._data[2].image}
              alt=${this._data[2].title}
            />
          </figure>
          <div class="chart__content">
            <div class="chart__header--container">
              <h4 class="chart__header chart__header--title">
              ${this._data[2].title}
              </h4>
            </div>      
            <h4 class="chart__header chart__header--rating">
            <svg class="chart__star">
            <use href="${icons2}#icon-star-full"></use>
          </svg>
            ${this._calcRating(this._data[2])}/5</h4>
          </div>
        </a>
      </div>
      <div class="chart">
      <a href="#${this._data[3].id}" class='chartLink'>
        <figure class="chart__fig">
          <img
            class="chart__img"
            src=${this._data[3].image}
            alt=${this._data[3].title}
          />
        </figure>
        <div class="chart__content">
          <div class="chart__header--container">
            <h4 class="chart__header chart__header--title">
            ${this._data[3].title}
            </h4>
          </div>
          <h4 class="chart__header chart__header--rating">
          <svg class="chart__star">
            <use href="${icons2}#icon-star-full"></use>
          </svg>
          ${this._calcRating(this._data[3])}/5</h4>
        </div>
      </a>
    </div>
    <div class="chart">
      <a href="#${this._data[4].id}" class='chartLink'>
        <figure class="chart__fig">
          <img
            class="chart__img"
            src=${this._data[4].image}
            alt=${this._data[4].title}
          />
        </figure>
        <div class="chart__content">
          <div class="chart__header--container">
            <h4 class="chart__header chart__header--title">
            ${this._data[4].title}
            </h4>
          </div>
          <h4 class="chart__header chart__header--rating">
          <svg class="chart__star">
            <use href="${icons2}#icon-star-full"></use>
          </svg>
          ${this._calcRating(this._data[4])}/5</h4>
        </div>
      </a>
    </div>
      
      `;
  }

  _calcRating(obj) {
    let sum = 0;
    obj.comments.forEach(comment => {
      sum += comment.rating;
    });
    return (sum / obj.comments.length).toFixed(1); ///單一歌 分數平均
  }

  addHandlerCharts(handler) {
    ['load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  addHandlerClickCharts() {
    this._parentElement.addEventListener('click', function (e) {
      const song = e.target.closest('.chartLink');
      if (!song) return;
      document.querySelector('#header').scrollIntoView({ behavior: 'smooth' });
    });
  }
}
export default new ChartsView();
