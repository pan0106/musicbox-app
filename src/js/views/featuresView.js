class FeaturesView {
  _parentElement = document.querySelector('.features');
  _tabs = document.querySelectorAll('.features__tab');
  _tabsContainer = document.querySelector('.features__tab-container');
  _tabsContent = document.querySelectorAll('.features__content');

  addHandlerTabs() {
    this._tabsContainer.addEventListener(
      'click',
      function (e) {
        const clicked = e.target.closest('.features__tab');
        if (!clicked) return;
        //remove active classes//
        this._tabs.forEach(t => t.classList.remove('features__tab--active'));
        this._tabsContent.forEach(c =>
          c.classList.remove('features__content--active')
        );
        //Active tab//
        clicked.classList.add('features__tab--active');
        //Activate content area//
        document
          .querySelector(`.features__content--${clicked.dataset.tab}`)
          .classList.add('features__content--active');
      }.bind(this)
    );
  }
}

export default new FeaturesView();
