import icons from 'url:../../img/icons.svg';
import icons2 from 'url:../../img/icons-2.svg';
import View from './View.js';

class SongView {
  _parentElement = document.querySelector('.song');
  _data;
  _errorMessage = '找不到該歌曲';
  _message = '';

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
       <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
       `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  _generateMarkup() {
    return `
    <h1 class="song__title">
    ${this._data.title}
  </h1>
  <div class="song__imgAndRating">

    <div class="song__img--artist">
      <img
        src="${this._data.artistImage}"
        alt="${this._data.artist}"
        crossorigin="anonymous"
        class="song__img"
      />
    </div>
    <div class="song__img--album">
    <img
      src="${this._data.albumImage}"
      alt="${this._data.album}"
      crossorigin="anonymous"
      class="song__img"
    />
  </div>
    <div class="song__rating">
      <svg class="song__rating-icon test-icon">
        <use href="${icons2}#icon-star-full"></use>
      </svg>

      <span class="song__rating-data">${
        this._data.comments ? this._calcRating(this._data) : '-'
      }/5</span>
    </div>
  </div>


  <div class="song__detail">
  <div class="song__detail-item">
    <svg class="song__detail-icon test-icon">
      <use href="${icons2}#icon-user"></use>
    </svg>
  
    <span class="song__detail-data">${this._data.artist}</span>
  </div>
  
  <div class="song__detail-item">
    <svg class="song__detail-icon test-icon">
      <use href="${icons2}#icon-cd"></use>
    </svg>
  
    <span class="song__detail-data">${this._data.album}</span>
  </div>
  
  <div class="song__detail-item">
    <svg class="song__detail-icon test-icon">
      <use href="${icons2}#icon-calendar-alt-stroke"></use>
    </svg>
  
    <span class="song__detail-data">${this._data.releaseDate}</span>
  </div>
  
  
  
  <div class="song__detail-item">
  <a
              class="btn--small"
              href="${this._data.sourceUrl}"
              target="_blank"
            >
              <span>馬上試聽</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
            </div>
          </div>

          <div class="song__reviews">
          <ul class="song__reviews-list">
           ${
             this._data.comments
               ? this._data.comments.map(this._generateMarkupComment).join('')
               : ''
           }                
          </ul>
          </div>

          <div class="song__form">
          <form class="song__form-body" action="">
            <div class="song__form-name">
              <label for="author">名字</label>
              <input
              type='text'
                name="review[author]"
                id="author"
              ></textarea>
            </div>
            <div class="song__form-rate">
              <label for="rating">評分</label>

              <fieldset class="starability-basic">
                <input type="radio" id="no-rate" class="input-no-rate" name="review[rating]" value="0" checked aria-label="No rating." />
                <input type="radio" id="first-rate1" name="review[rating]" value="1" />
                <label for="first-rate1" title="Terrible"></label>
                <input type="radio" id="first-rate2" name="review[rating]" value="2" />
                <label for="first-rate2" title="Not good"></label>
                <input type="radio" id="first-rate3" name="review[rating]" value="3" />
                <label for="first-rate3" title="Average"></label>
                <input type="radio" id="first-rate4" name="review[rating]" value="4" />
                <label for="first-rate4" title="Very good"></label>
                <input type="radio" id="first-rate5" name="review[rating]" value="5" />
                <label for="first-rate5" title="Amazing"></label>
              </fieldset>

              
            </div>
            <div class="song__form-textarea">
              <label for="content">留言</label>
              <textarea
                name="review[content]"
                id="content"
                cols="30"
                rows="3"
              ></textarea>
            </div>
            <div class="song__form-btn">
            <button >送出</button>
          </div>
          </form>
          </div>
          `;
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
     <div class="error">
     <div>
       <svg>
         <use href="${icons}#icon-alert-triangle"></use>
       </svg>
     </div>
     <p>${message}</p>
   </div>
     `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
     <div class="message">
     <div>
       <svg>
         <use href="${icons}#icon-smile"></use>
       </svg>
     </div>
     <p>${message}</p>
   </div>
     `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkupComment(com) {
    return `
  <li class="song__review-item">
  <div class="song__review-item--authorAndRating">
  ${com.author}
  <p class="starability-result song__review-item--stars" data-rating="${com.rating}"></p>
  </div>
  <div class="song__review-item--content">
  ${com.content}
  </div>
 </li>
  `;
  }

  _calcRating(obj) {
    let sum = 0;
    obj.comments.forEach(comment => {
      sum += comment.rating;
    });
    return (sum / obj.comments.length).toFixed(1); ///單一歌 分數平均
  }
}

export default new SongView();
