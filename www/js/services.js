angular.module('smni.services', ['ngResource'])

.factory('ProgramsFactory', ['$resource', function( $resource ) {
  return $resource('https://www.googleapis.com/youtube/v3/:type', {
    type: 'playlists',
    part: 'snippet',
    maxResults: '50',
    channelId: 'UCgFwzkl-EM3p1W3oDQe5Wow',
    key: 'AIzaSyBSPBlypyNRw50RH-w2qEvkIBATE-5oufY'
    // key: 'AIzaSyDhSrCUMdAjHYuHiJzaptIRifF_mIE2N0s'
  });
}])

.factory( 'ProgramListFactory', function() {

  var programs = [{
    id: 0,
    playlistid: 'PLBvNelqMoACDhLuh6Ohb9S7dPg70U5tCT',
    name: 'Give Us This Day',
    img: 'img/give-us-this-day.jpg'
  }, {
    id: 1,
    playlistid: 'PLBvNelqMoACAFHwRk8URhyiyDnHkBR6k9',
    name: 'Gospel of The Kingdom',
    img: 'img/the-gospel-of-the-kingdom.jpg'
  }, {
    id: 2,
    playlistid: 'PLBvNelqMoACDq83y9R3IKvJlQLX3uoCJ7',
    name: 'Powerline',
    img: 'img/powerline.jpg'
  }, {
    id: 3,
    playlistid: 'PLBvNelqMoACDSkyJmLsOSVvmJjPbGwcA_',
    name: 'Sounds of Worship',
    img: 'img/sounds-of-worship.jpg'
  }, {
    id: 4,
    playlistid: 'PLBvNelqMoACCKcUBQE3s9Q4vnwMELszDu',
    name: 'iTestify',
    img: 'img/itestify.jpg'
  }, {
    id: 5,
    playlistid: 'PLBvNelqMoACB6YIMy7tZRrI4pysW3e-sU',
    name: 'Kingdom Music',
    img: 'img/kingdom-music.jpg'
  }];

  return {
    all: function() {
      return programs;
    },
    get: function( programId ) {
      for ( var i = 0; i < programs.length; i++ ) {
        if( programs[i].playlistid === programId ) {
          return programs[i];
        }
      }
      return null;
    }
  };

})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
