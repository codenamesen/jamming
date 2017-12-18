const clientId = '28c85d9e5b07407288eed7fe96b40121';
const redirectUri = "http://localhost:3000/";

const Spotify = {};

const userAccessToken = '';


getAccessToken() {
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

  window.location.assign = 'https://accounts.spotify.com/authorize?client_id=' + ${clientId} + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + ${redirectUri};
}

export default Spotify;
