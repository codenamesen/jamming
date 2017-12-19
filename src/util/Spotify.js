const clientId = '28c85d9e5b07407288eed7fe96b40121';

const redirectUri = "http://localhost:3000/";
const urlToFetch = 'https://api.spotify.com/v1/search?type=track&q=';
const urlToAuthorize = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

const Spotify = {};

let userAccessToken = undefined;


Spotify.getAccessToken = function() {
  if(userAccessToken) {
    return userAccessToken;
  }

  const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
  const urlExpirationTime = window.location.href.match(/expires_in=([^&]*)/);

  if(urlAccessToken && urlExpirationTime) {
    userAccessToken = urlAccessToken[1];
    const expirationTime = Number(urlExpirationTime[1]);
    window.setTimeout(() => userAccessToken = '', expirationTime * 1000);
    window.history.pushState('Access Token', null, '/');
  }

  window.location.assign = urlToAuthorize;
}

Spotify.search = function(searchTerm) {
  fetch(`urlToFetch${searchTerm}`,{
    headers: {Authorization: `Bearer${userAccessToken}`}
  }).then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Request Failed!');
  }, networkError => console.log(networkError.message)).then(jsonResponse => {
    if(jsonResponse) {
      console.log(jsonResponse);
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    }
    return [];
  });
};

export default Spotify;
