angular.module('smni.services', ['ngResource'])

.factory('FacebookFactory', function ($resource) {
  return $resource('https://graph.facebook.com/v2.5/105414913766/:type', {
    type: 'feed',
    limit: '10',
    access_token: '1054156781281122|WK64HjQfUfCnxjgPCZZ2Zw8prWM',
  });
})

.factory('ProgramsFactory', function ($resource) {
  return $resource('https://www.googleapis.com/youtube/v3/:type', {
    type: 'playlists',
    part: 'snippet',
    maxResults: '50',
    channelId: 'UCgFwzkl-EM3p1W3oDQe5Wow',
    key: 'AIzaSyBSPBlypyNRw50RH-w2qEvkIBATE-5oufY',

    // key: 'AIzaSyDhSrCUMdAjHYuHiJzaptIRifF_mIE2N0s'
  });
})

.factory('ProgramListFactory', function () {

  var programs = [
    {
      id: 0,
      playlistid: 'PLBvNelqMoACDhLuh6Ohb9S7dPg70U5tCT',
      name: 'Give Us This Day',
      img: 'img/give-us-this-day.jpg',
    }, {
      id: 1,
      playlistid: 'PLBvNelqMoACAFHwRk8URhyiyDnHkBR6k9',
      name: 'Gospel of The Kingdom',
      img: 'img/the-gospel-of-the-kingdom.jpg',
    }, {
      id: 2,
      playlistid: 'PLBvNelqMoACDq83y9R3IKvJlQLX3uoCJ7',
      name: 'Powerline',
      img: 'img/powerline.jpg',
    }, {
      id: 3,
      playlistid: 'PLBvNelqMoACDSkyJmLsOSVvmJjPbGwcA_',
      name: 'Sounds of Worship',
      img: 'img/sounds-of-worship.jpg',
    }, {
      id: 4,
      playlistid: 'PLBvNelqMoACCKcUBQE3s9Q4vnwMELszDu',
      name: 'iTestify',
      img: 'img/itestify.jpg',
    }, {
      id: 5,
      playlistid: 'PLBvNelqMoACB6YIMy7tZRrI4pysW3e-sU',
      name: 'Kingdom Music',
      img: 'img/kingdom-music.jpg',
    },
  ];

  return {
    all: function () {
      return programs;
    },

    get: function (programId) {
      for (var i = 0; i < programs.length; i++) {
        if (programs[i].playlistid === programId) {
          return programs[i];
        }
      }

      return null;
    },
  };

});
