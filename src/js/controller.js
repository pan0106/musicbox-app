import * as model from './model.js';
import songView from './views/songView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import chartsView from './views/chartsView.js';
import addCommentView from './views/addCommentView.js';
import featuresView from './views/featuresView.js';
import navView from './views/navView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlSongs = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    songView.renderSpinner();

    //1)loading song
    await model.loadSong(id);

    //2)render song
    songView.render(model.state.song);
  } catch (err) {
    songView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) load search results
    await model.loadSearchResults(query);

    //3) render results
    resultsView.render(model.getSearchResultsPage());

    //4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) render NEW pagination button
  paginationView.render(model.state.search);
};

//charts
const controlCharts = function () {
  //1) get charts data
  const charts = model.getCharts();
  //2) render charts
  chartsView.render(charts);
};

//add comment
const controlComment = function (commentArr) {
  // 1) update database
  model.addComment(commentArr);
  // 2) rerender
  songView.render(model.state.song);
  //3) rerender chart
  controlCharts();
};

const init = function () {
  songView.addHandlerRender(controlSongs);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  chartsView.addHandlerCharts(controlCharts);
  addCommentView.addHandlerAddComment(controlComment);
  chartsView.addHandlerClickCharts();
  featuresView.addHandlerTabs();
  navView.addHandlerClickNav();
};
init();
