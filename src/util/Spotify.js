const clientId = '28c85d9e5b07407288eed7fe96b40121';

const redirectUri = "http://jammmIt.surge.sh";
const urlToSearch = "https://api.spotify.com/v1/search?type=track&q=";
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
    return userAccessToken;
  }
  window.location = urlToAuthorize;
}

Spotify.search = function(searchTerm) {
  userAccessToken = Spotify.getAccessToken();

  return fetch(`${urlToSearch}${searchTerm}`, {
    headers: {Authorization: `Bearer ${userAccessToken}`}
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

Spotify.savePlaylist = function(playlistName, trackURIsArray) {
  if(!playlistName || !trackURIsArray){
    return;
  }
  const headers = {Authorization: `Bearer ${userAccessToken}`};
  let userId = undefined;
  let playlistId = undefined;


  const urlForUsername = 'https://api.spotify.com/v1/me';

  fetch(urlForUsername, {headers: headers}).then(response => {
    if(response.ok){
      return response.json();
    }
    throw new Error('Request failed');
  }, networkError => console.log(networkError.message)).then(jsonResponse => {
    userId = jsonResponse.id;
  }).then(() => {
    const urlForPlaylist = `https://api.spotify.com/v1/users/${userId}/playlists`;

    return fetch(urlForPlaylist, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    })
  }).then(response => {
    if(response.ok){
      return response.json();
    }
    throw new Error('Request failed');
  }, networkError => console.log(networkError.message)).then(jsonResponse => {
    playlistId = jsonResponse.id;
  }).then(() => {
    const urlToAddPlaylist = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;

    return fetch(urlToAddPlaylist, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({uris: trackURIsArray})
    })
  });

};

export default Spotify;
