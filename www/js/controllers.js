angular.module('smni.controllers', [])

.controller('HomeCtrl', function ($scope, $ionicPlatform, $cordovaInAppBrowser, $ionicPopup, $timeout, ionicMaterialMotion, ionicMaterialInk, FacebookFactory, $cordovaSocialSharing) {

  $scope.smniLoading = true;
  $scope.streamDisabled = true;
  $scope.isExpanded = true;
  $scope.hasHeaderFabLeft = false;
  $scope.hasHeaderFabRight = false;

  // checkConnection();
  // $scope.init();

  var options = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no',
  };

  $scope.sourceRtmp = function () {
    $cordovaInAppBrowser.open('rtmp://smni.live-s.cdn.bitgravity.com/cdn-live/_definst_/smni/live/feed001', '_system', options);
  };

  // Set Motion
  $timeout(function () {
    ionicMaterialMotion.slideUp({
      selector: '.slide-up',
    });
  }, 300);

  $scope.smniRefresh = function () {
    $scope.feeds = [];
    $timeout(function () {
      $scope.facebookFeeds();
    }, 700);
  };

  $scope.facebookFeeds = function () {
    if (typeof analytics !== 'undefined') {
      analytics.trackView('SMNI Main');
    }

    $timeout(function () {
      FacebookFactory.get()
        .$promise.then(function (res) {
          $scope.feeds = res.data;
          $scope.smniError = false;
          $scope.streamDisabled = false;
          $scope.smniLoading = false;
          $timeout(function () {
            ionicMaterialMotion.fadeSlideInRight({
              starVelocity: 3000,
            });

            ionicMaterialInk.displayEffect();
          }, 700);

        }, function (err) {

          console.log(err);
          $scope.smniError = 'An error occured: ' + err + '. <br>Cannot connect to Facebook. <br>Please check your internet connection.';
          $scope.streamDisabled = true;
          $scope.smniLoading = false;
          $scope.feeds = [];
        })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
    }, 5000);

  };

  $scope.openLink = function (theId) {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'Open Real Link', 'Open Link');
    }

    $cordovaInAppBrowser.open('https://www.facebook.com/' + theId, '_blank', options);
  };

  $scope.share = function (message, image, url) {
    $cordovaSocialSharing
      .share(message, image, url)
      .then(function (res) {

        console.log(res);
      }, function (err) {

        console.log(err);
      });
  };

  $scope.shareViaTwitter = function (msg, img, url) {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'Twitter', 'shareViaTwitter');
    }

    $cordovaSocialSharing.shareViaTwitter(msg, null, url);
  };

  $scope.shareViaGooglePlus = function (msg, img, url) {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'GooglePlus', 'shareViaGooglePlus');
    }

    $cordovaSocialSharing.shareVia('com.google.android.apps.plus', msg, null, url);
  };

  $scope.shareViaWhatsApp = function (msg, img, url) {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'WhatsApp', 'shareViaWhatsApp');
    }

    $cordovaSocialSharing.shareViaWhatsApp(msg, null, url, function () {
      console.log('share ok');
    }, function (errormsg) {

      alert(errormsg);
    });
  };

  $scope.shareViaEmail = function (msg) {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'Email', 'shareViaEmail');
    }

    $cordovaSocialSharing.shareViaEmail(
      msg,
      '',
      null,
      null,
      null,
      function (msg) {
        // success
      },

      function (err) {
        // error
      }
    );
  };

  $scope.shareViaSMS = function (msg) {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'SMS', 'shareViaSMS');
    }

    $cordovaSocialSharing.shareViaSMS(msg, null, function (msg) {
      console.log('ok: ' + msg);
    }, function (msg) {

      alert('error: ' + msg);
    });
  };

  $ionicPlatform.ready($scope.facebookFeeds());

  // $ionicPlatform.ready( $scope.checkConnection() );

})

.controller('ProgramsCtrl', function ($scope, $stateParams, ProgramListFactory, $timeout, ionicMaterialMotion, ionicMaterialInk) {

  if (typeof analytics !== 'undefined') {
    analytics.trackView('Programs');
  }

  $scope.programs = ProgramListFactory.all();

  // Set Motion
  $timeout(function () {
    ionicMaterialMotion.fadeSlideInRight({
      startVelocity: 3000,
    });

    ionicMaterialInk.displayEffect();

  }, 300);

  $timeout(function () {
    ionicMaterialMotion.blinds({
      startVelocity: 3000,
    });
  }, 700);

})

.controller('ProgramDetailCtrl', function ($scope, $stateParams, ProgramsFactory, ProgramListFactory, $ionicPopup, $timeout, ionicMaterialMotion, ionicMaterialInk, $window) {

  $scope.init = function () {
    // Set Motion
    $timeout(function () {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up',
      });
    }, 300);

    $scope.programItem();

    $scope.program = ProgramListFactory.get($stateParams.programId);
    $scope.programTitle();
    if (typeof analytics !== 'undefined') {
      analytics.trackView('Progam ID: ' + $stateParams.programId);
    }
  };

  var playlistId = $stateParams.programId;

  $scope.programTitle = function () {
    $scope.program = ProgramListFactory.get($stateParams.programId);
  };

  var random = false;

  $scope.randomize = function () {
    // random = true;
    $scope.smniLoading = true;
    $scope.rankedList = [];
    $timeout(function () {
      if (typeof analytics !== undefined) {
        analytics.trackEvent('Button', 'Shuffle List', 'Shuffle');
      }

      $scope.programItem(true);
    }, 700);
  };

  $scope.reload = function () {
    $scope.smniLoading = true;
    $scope.rankedList = [];
    $timeout(function () {
      if (typeof analytics !== undefined) {
        analytics.trackEvent('Button', 'Un-shuffle List', 'Un-Shuffled');
      }

      $scope.programItem(false);
    }, 700);
  };

  $scope.smniRefresh = function () {
    $scope.rankedList = [];
    $timeout(function () {
      if (typeof analytics !== undefined) {
        analytics.trackEvent('Refesher', 'Refresh', 'Pull to refresh');
      }

      $scope.programItem(false);
    }, 700);
  };

  $scope.programItem = function (randomized) {
    var params = {
      type: 'playlistItems',
      maxResults: '50',
      playlistId: playlistId,
    };
    $scope.rankedList = [];

    // $ionicLoading.show();

    random = randomized;

    $timeout(function () {
      ProgramsFactory.get(params)
        .$promise.then(function (res) {
          $scope.programItems = res.items;

          // console.log($scope.programItems);
          $scope.smniLoading = false;
          $scope.smniError = false;

          var iRank = 1;

          if (random === true) {
            $scope.reloadDisabled = false;
            angular.forEach($scope.programItems, function (item) {
              $scope.rankedList.push({
                item: item,
                rank: 0.5 - $window.Math.random(),
              });
            });
          } else {
            $scope.reloadDisabled = true;
            angular.forEach($scope.programItems, function (item) {
              $scope.rankedList.push({
                item: item,
                rank: iRank++,
              });
            });
          }

          $timeout(function () {
            ionicMaterialMotion.fadeSlideInRight({
              startVelocity: 3000,
            });
          }, 300);

          $timeout(function () {
            ionicMaterialInk.displayEffect();
          }, 700);

        }, function (err) {

          console.log(err);
          $scope.smniError = 'An error occured: ' + err + '. <br>Cannot connect to Youtube. <br>Please check your internet connection.';
          $scope.smniLoading = false;
          $scope.rankedList = [];

          // alert( 'Error occured: ' + err );
          // ionicLoading.hide();
        })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
    }, 3000);

  };

  $scope.init();

})

.controller('playVideoCtrl', function ($scope, $stateParams, ProgramsFactory, $cordovaInAppBrowser, $cordovaSocialSharing, $timeout, ionicMaterialInk, ionicMaterialMotion) {

  var videoId = $stateParams.videoId;
  var player = '';
  $scope.isExpanded = true;
  $scope.hasHeaderFabLeft = false;
  $scope.hasHeaderFabRight = false;

  $scope.init = function () {
    $scope.smniLoading = true;
    $scope.theVideo();
    if (typeof analytics !== 'undefined') {
      analytics.trackView('Youtube Video');
    }
  };

  $scope.theVideo = function () {
    var params = {
      type: 'videos',
      id: videoId,
    };

    $timeout(function () {
      ProgramsFactory.get(params)
        .$promise.then(function (res) {
          $scope.playVideoId = videoId;
          $scope.videoInfo = res.items;
          $scope.smniLoading = false;

          // console.log(res);
          // console.log( $scope.videoInfo[0].id );
          $timeout(function () {
            ionicMaterialMotion.slideUp({
              selector: '.slide-up',
            });
          }, 700);

          ionicMaterialInk.displayEffect();

        }, function (err) {

          console.log(err);
          alert('Error: ' + err);

          // ionicLoading.hide();
        });
    }, 3000);

  }; //$scope.theVideo

  $scope.$on('youtube.player.ready', function ($event, player) {
    var myPlayer = true;
  });

  $scope.playerVars = {
    controls: 2,
    autoplay: 0,
    showinfo: 0,
  };

  var options = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no',
  };

  $scope.openLink = function () {
    // console.log( id );
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'Open Youtube', 'Open Link');
    }

    $cordovaInAppBrowser.open('https://www.youtube.com/watch?v=' + videoId, '_blank', options);
  };

  $scope.shareViaTwitter = function () {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'Twitter', 'YT shareViaTwitter');
    }

    $cordovaSocialSharing.shareViaTwitter('https://www.youtube.com/watch?v=' + videoId, null, 'https://www.youtube.com/watch?v=' + videoId);
  };

  $scope.shareViaGooglePlus = function () {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'GooglePlus', 'YT shareViaGooglePlus');
    }

    $cordovaSocialSharing.shareVia('com.google.android.apps.plus', 'https://www.youtube.com/watch?v=' + videoId, null, 'https://www.youtube.com/watch?v=' + videoId);
  };

  $scope.shareViaWhatsApp = function () {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'WhatsApp', 'YT shareViaWhatsApp');
    }

    $cordovaSocialSharing.shareViaWhatsApp('https://www.youtube.com/watch?v=' + videoId, null, 'https://www.youtube.com/watch?v=' + videoId, function () {
      console.log('share ok');
    }, function (errormsg) {

      alert(errormsg);
    });
  };

  $scope.shareViaEmail = function () {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'Email', 'YT shareViaEmail');
    }

    $cordovaSocialSharing.shareViaEmail(
      'Watch and be blessed! https://www.youtube.com/watch?v=' + videoId,
      '',
      null,
      null,
      null,
      function () {
        // success
      },

      function (err) {
        // error
      }
    );
  };

  $scope.shareViaSMS = function () {
    if (typeof analytics !== undefined) {
      analytics.trackEvent('Button', 'SMS', 'shareViaSMS');
    }

    $cordovaSocialSharing.shareViaSMS('https://www.youtube.com/watch?v=' + videoId, null, function () {
      console.log('ok: ' + videoId);
    }, function () {

      alert('error: ' + videoId);
    });
  };

  // $ionicLoading.show();

  $scope.init();

})

.controller('videoListCtrl', function ($scope, ProgramsFactory, $stateParams) {

  // var playlistId = $stateParams.playlistId;

  $scope.getVideosFrmPrograms = function () {
    var params = {
      type: 'playlistItems',
      maxResults: '20',
      playlistId: 'PLBvNelqMoACDq83y9R3IKvJlQLX3uoCJ7',
    };

    ProgramsFactory.get(params)
      .$promise.then(function (res) {
        $log.info(res);
      }, function (err) {

        console.log(err);
      });
  };

  $scope.getVideosFrmPrograms();

})

.controller('AboutCtrl', function ($scope, $stateParams, $timeout, $cordovaInAppBrowser, ionicMaterialInk, ionicMaterialMotion) {

  var options = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no',
  };

  if (typeof analytics !== 'undefined') {
    analytics.trackView('About');
  }

  $scope.like = function () {
    $cordovaInAppBrowser.open('https://www.facebook.com/SMNIApp/', '_blank', options);
  };

  $timeout(function () {

    ionicMaterialInk.displayEffect();
  }, 300);

});
