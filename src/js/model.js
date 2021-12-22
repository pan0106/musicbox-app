import { API_URL, RES_PER_PAGE, FAKE_DATABASE } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  song: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  fakeDatabase: FAKE_DATABASE,
  charts: [],
};

export const loadSong = async function (id) {
  try {
    const data = await getJSON(`${API_URL}tracks/${id}?territory=TW`);
    state.song = {
      id: data.id,
      title: data.name,
      album: data.album.name,
      artist: data.album.artist.name,
      releaseDate: data.album.release_date,
      albumImage: data.album.images[1].url,
      albumImageSmall: data.album.images[0].url,
      artistImage: data.album.artist.images[1].url,
      sourceUrl: data.url,
    };

    if (state.fakeDatabase.some(dbSong => dbSong.id === state.song.id)) {
      state.fakeDatabase.forEach(dbSong => {
        if (dbSong.id === state.song.id) state.song.comments = dbSong.comments;
      });
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(
      `${API_URL}search?q=${query}&territory=TW&limit=50&type=artist,track`
    );
    state.search.results = data.tracks.data.map(song => {
      return {
        id: song.id,
        title: song.name,
        artist: song.album.artist.name,
        albumImage: song.album.images[0].url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err}!!!`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * 10;
  const end = page * 10;

  return state.search.results.slice(start, end);
};

///////////////rating

export function calcRating(obj) {
  let sum = 0;
  obj.comments.forEach(comment => {
    sum += comment.rating;
  });
  return sum / obj.comments.length; ///單曲平均分數
}

export const getCharts = function () {
  return state.fakeDatabase.sort(function (a, b) {
    return calcRating(b) - calcRating(a);
  });
};

//add comment
export const addComment = function (commentArr) {
  if (state.fakeDatabase.some(dbSong => dbSong.id === state.song.id)) {
    state.fakeDatabase
      .find(dbSong => dbSong.id === state.song.id)
      .comments.push({
        author: commentArr[0],
        rating: commentArr[2],
        content: commentArr[1],
      });
  } else {
    state.fakeDatabase.push({
      id: state.song.id,
      title: state.song.title,
      image: state.song.albumImageSmall,
      comments: [
        {
          author: commentArr[0],
          rating: commentArr[2],
          content: commentArr[1],
        },
      ],
    });
    state.song.comments = state.fakeDatabase.find(
      dbSong => dbSong.id === state.song.id
    ).comments;
  }
};
