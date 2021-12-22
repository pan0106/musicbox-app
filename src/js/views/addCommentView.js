class AddCommentView {
  _parentElement = document.querySelector('.song');

  addHandlerAddComment(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const form = e.target;
      const author = form.querySelectorAll('input')[0].value;
      const comment = form.querySelector('textarea').value;
      let rating = 0;
      form.querySelectorAll('input').forEach(star => {
        if (star.checked) {
          rating = +star.value;
        }
      });

      if (author === '' || comment === '' || rating === 0) {
        alert('有欄位漏填囉');
      } else {
        handler([author, comment, rating]);
      }
    });
  }
}

export default new AddCommentView();
