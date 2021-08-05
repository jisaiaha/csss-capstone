console.log("spotify tests running");
let clientId = `cb34d256a96e498eb84c7e2c675823ad`;
let redirectUri = window.location.href; //url for music page

// DOM elements
let spotifyEmbed = document.getElementById("spotify-embed");
let tempoBar = document.getElementById("tempo-UI");
let tempoVal = document.getElementById("tempo-val");

const getOAuth = () => {
  let myPost = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&state=123&show_dialog=true`;
  window.open(myPost, "_self"); //redirect to authorization page
};

const getToken = () => {
  let authStrUrl = window.location.href.split("#");
  let authStr = authStrUrl[1].split("&");
  let tokenArr = authStr[0].split("=");
  return tokenArr[1];
};

//index 0: access token 1: token type 2: expires in 3:state
const token = getToken().toString("base64");

const searchAPI = (query, type) => {
  let myQuery = `https://api.spotify.com/v1/search?q=${query}&type=${type}&market=US&limit=10`;
  fetch(myQuery, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(myjson => {
      //THIS IS WHERE YOU HANDLE THE RESPONSE JSON
      if (type === "playlist") {
        let arrPlaylist = myjson.playlists.items;
        spotifyEmbed.src = generatePlaylist(arrPlaylist);
      }
      if (type === "track") {
        let arrTracks = myjson.tracks.items;
        spotifyEmbed.src = generateTrack(arrTracks);
      }
    });
};
const generatePlaylist = arrResponse => {
  let randNum = Math.floor(Math.random() * 10);
  let playlistId = arrResponse[randNum].id;
  let url = `https://open.spotify.com/embed/playlist/${playlistId}`;
  return url;
};
const generateTrack = arrResponse => {
  let randNum = Math.floor(Math.random() * 10);
  let trackId = arrResponse[randNum].id;
  tempoAnalysis(trackId);
  let url = `https://open.spotify.com/embed/track/${trackId}`;
  return url;
};
const tempoAnalysis = id => {
  let myQuery = `https://api.spotify.com/v1/audio-features/${id}`;
  fetch(myQuery, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(myjson => {
      //THIS IS WHERE YOU HANDLE THE RESPONSE JSON
      const songTempo = myjson.tempo;
      tempoBar.value = songTempo;
    tempoVal.innerHTML = (songTempo + " BPM")
    });
};
