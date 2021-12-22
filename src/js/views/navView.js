class NavView {
  _parentElement = document.querySelector('.nav__links');

  addHandlerClickNav() {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      //matching strategy
      if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

export default new NavView();
