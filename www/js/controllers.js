angular.module('smni.controllers', [])

.controller('HomeCtrl', ['$scope', '$ionicPlatform', '$cordovaInAppBrowser', '$cordovaNetwork', '$ionicPopup', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', 'FacebookFactory', '$cordovaSocialSharing', function($scope, $ionicPlatform, $cordovaInAppBrowser, $cordovaNetwork, $ionicPopup, $timeout, ionicMaterialMotion, ionicMaterialInk, FacebookFactory, $cordovaSocialSharing) {

    // ionic.material.ink.displayEffect();

  // $scope.init = function () {
  //   checkConnection();
  // }

  // $scope.$on('$ionicView.enter', function(e) {
  //   $scope.checkConnection();
  //   // document.addEventListener("deviceready", $scope.checkConnection, false);
  // });

  // document.addEventListener("deviceready", $scope.checkConnection, false);

  // Check internet connection

    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

  $scope.checkConnection = function () {

    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()
    var isOffline = $cordovaNetwork.isOffline()
    var connected;

    // alert( 'You are connected via ' + type );

    if( isOffline === true ) {
      // alert('You are offline');
      $ionicPopup.alert({
        title: "No Internet Connection",
        content: "You are not connected to the internet."
      }).then( function () {
        connected = false;
        $scope.connectionStatus = "Offline";
      })
    } else {
      // alert('You are online');
      connected = true;
      $scope.connectionStatus = "Online";
    }

    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.$on('$cordovaNetwork:online', function(event, networkState) {
      var onlineState = networkState;
      // alert( networkState );
      $ionicPopup.alert({
        title: "Internet Connected",
        content: 'You are now connected to the internet!'
      })
  })

  $scope.$on('$cordovaNetwork:offline', function(event, networkState) {
    var onlineState = networkState;
    $ionicPopup.alert({
      title: "Internet disconnected",
      content: 'You are now offline.'
    })
  })

  // checkConnection();
  // $scope.init();

    var options = {
        location: 'no',
        clearcache: 'no',
        toolbar: 'no'
    };

    $scope.sourceRtmp = function() {
        $cordovaInAppBrowser.open('rtmp://smni.live-s.cdn.bitgravity.com/cdn-live/_definst_/smni/live/feed001', '_system', options);
    }
    $scope.sourceHTTP = function() {
        $cordovaInAppBrowser.open('http://smni.live-s.cdn.bitgravity.com:1935/content:cdn-live/smni/live/feed001', '_system', options);
    }
    $scope.sourceHTTP2 = function() {
        $cordovaInAppBrowser.open('http://smni.live-s.cdn.bitgravity.com/cdn-live/_definst_/smni/live/feed001/playlist.m3u8?width=490&height=350&streamType=live&AutoPlay=true&ScrubMode=simple&BufferTime=1.5&AutoBitrate=off&scaleMode=letterbox&DefaultRatio=1.777778&LogoPosition=topleft&ColorBase=0&ColorControl=14277081&ColorHighlight=16777215&ColorFeature=14277081&selectedIndex=0', '_system', options);
    }
    
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });

        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 300);

    $scope.facebookFeeds = function ( datePosted ) {
    var fbLinks = [];
        FacebookFactory.get()
        .$promise.then( function (res) {
            $scope.feeds = res.data;
            // $scope.fbLink = "https://www.facebook.com/" + res.data.id;
            // console.log( res.data.length );
            // $scope.fbLink = res.data[]
            
            for (var i = 0; i < res.data.length; i++) {
                // if (programs[i].playlistid === programId) {
                    var fbLink = "https://www.facebook.com/" + res.data[i].id;
                    fbLinks.push(fbLink);
                    // console.log( fbLink );
                    // return programs[i];
                // }
            }

            // $scope.fbLink = [fbLink];
            // $scope.fbLink.toString();

            console.log( fbLinks );

            $scope.fbLinked = fbLinks;

            // $scope.theLinks = fbLinks.toString();
            // console.log( $scope.theLinks );


        $timeout( function () {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });

            ionicMaterialInk.displayEffect();
        },300);

            
        }, function (err) {
            console.log( err );
        });


    };

    $scope.openLink = function ( theId ) {
        // console.log( id );
        $cordovaInAppBrowser.open( "https://www.facebook.com/" + theId, '_blank', options );
    }

    $scope.share = function( message, image, url ) {
        $cordovaSocialSharing
            .share( message, image, url)
            .then( function (res) {
                console.log( res );
            }, function (err) {
                console.log( err );
            });
    }

    $scope.shareViaTwitter = function (msg, img, url) {
        $cordovaSocialSharing.shareViaTwitter( msg, null, url );
    }
    $scope.shareViaGooglePlus = function (msg, img, url) {
        $cordovaSocialSharing.shareVia( 'com.google.android.apps.plus', msg, null, url );
    }

    $scope.shareViaWhatsApp = function (msg, img, url) {
        $cordovaSocialSharing.shareViaWhatsApp( msg, null, url, function() {console.log('share ok')}, function(errormsg){alert(errormsg)} );
    }

    $scope.shareViaEmail = function (msg) {
        $cordovaSocialSharing.shareViaEmail( 
            msg,
            '',
            null,
            null,
            null,
            function(msg) {
                // success
            },
            function(err) {
                // error
            }
            );
    }

    $scope.shareViaSMS = function (msg) {
        $cordovaSocialSharing.shareViaSMS( msg, null, function(msg) {console.log('ok: ' + msg)}, function(msg) {alert('error: ' + msg)} );
    }


    $ionicPlatform.ready( $scope.facebookFeeds() );

    // Set Ink
    // ionicMaterialInk.displayEffect();


}])

.controller('ProgramsCtrl', ['$scope', '$stateParams', 'ProgramListFactory', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', function($scope, $stateParams, ProgramListFactory, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    $scope.programs = ProgramListFactory.all();
    // console.log($scope.programs);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
        
        ionicMaterialInk.displayEffect();

    }, 300);

    $timeout(function() {
        ionicMaterialMotion.blinds({
            startVelocity: 3000
        });
    }, 700);

}])

.controller('ProgramDetailCtrl', ['$scope', '$stateParams', 'ProgramsFactory', 'ProgramListFactory', '$ionicLoading', '$cordovaNetwork', '$ionicPopup', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', function($scope, $stateParams, ProgramsFactory, ProgramListFactory, $ionicLoading, $cordovaNetwork, $ionicPopup, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    // console.log( '$stateParams.programId: ' + $stateParams.programId );

    $scope.init = function() {
        // var isOnline = $cordovaNetwork.isOnline()
        // if (isOnline === true) {
            $scope.programItem();
        // } else {
            // $scope.isOffline();
        // }

        $scope.program = ProgramListFactory.get( $stateParams.programId );
        $scope.programTitle();
    }

    var playlistId = $stateParams.programId;

    $scope.programTitle = function () {
        $scope.program = ProgramListFactory.get( $stateParams.programId );

        console.log( $scope.program );
    }

    $scope.programItem = function() {
        var params = {
            type: 'playlistItems',
            maxResults: '20',
            playlistId: playlistId
        }

        $ionicLoading.show();

        ProgramsFactory.get(params)
            .$promise.then(function(res) {
                $ionicLoading.hide();
                $scope.programItems = res.items;
                console.log($scope.programItems);

                // Set Motion
                $timeout(function() {
                    ionicMaterialMotion.slideUp({
                        selector: '.slide-up'
                    });
                }, 300);

                $timeout(function() {
                    ionicMaterialMotion.fadeSlideInRight({
                        startVelocity: 3000
                    });
                }, 300);

                $timeout( function() {
                    ionicMaterialInk.displayEffect();
                }, 700);

            }, function(err) {
                console.log(err);
                // alert( 'Error occured: ' + err );
                // ionicLoading.hide();
            });
    }

    $scope.isOffline = function() {
        $ionicPopup.alert({
            title: "No Internet Connection",
            content: "You are not connected to the internet."
        }).then(function() {
            $scope.offline = true;
            $ionicLoading.hide();
        })
    }
    
    // $scope.program = ProgramListFactory.get($stateParams.programId);

    $scope.init();


    // $scope.isExpanded = true;

}])

.controller('playVideoCtrl', ['$scope', '$stateParams', 'ProgramsFactory', '$ionicLoading', function($scope, $stateParams, ProgramsFactory, $ionicLoading) {

    var videoId = $stateParams.videoId;
    var player = "";

    $scope.theVideo = function() {

        var params = {
            type: 'videos',
            id: videoId
        };

        ProgramsFactory.get(params)
            .$promise.then(function(res) {
                $scope.playVideoId = videoId;
                $scope.videoInfo = res.items;
                console.log(res);
            }, function(err) {
                console.log(err);
                alert('Error: ' + err);

                // ionicLoading.hide();
            });

    }

    $scope.$on('youtube.player.ready', function($event, player) {
        $ionicLoading.hide();
        var myPlayer = true;
    });

    $scope.playerVars = {
        controls: 2,
        autoplay: 1,
        showinfo: 0
    };

    // $ionicLoading.show();

    $scope.theVideo();

}])

.controller('videoListCtrl', ['$scope', 'ProgramsFactory', '$stateParams', '$log', function($scope, ProgramsFactory, $stateParams, $log) {

    // var playlistId = $stateParams.playlistId;


    $scope.getVideosFrmPrograms = function() {
        var params = {
            type: 'playlistItems',
            maxResults: '20',
            playlistId: 'PLBvNelqMoACDq83y9R3IKvJlQLX3uoCJ7'
        }

        ProgramsFactory.get(params)
            .$promise.then(function(res) {
                $log.info(res);
            }, function(err) {
                console.log(err);
            });
    }

    $scope.getVideosFrmPrograms();


}])

.controller('AboutCtrl', ['$scope', '$stateParams', '$timeout', '$cordovaInAppBrowser', 'ionicMaterialInk', 'ionicMaterialMotion', function ($scope, $stateParams, $timeout, $cordovaInAppBrowser, ionicMaterialInk, ionicMaterialMotion ) {
    
    var options = {
        location: 'no',
        clearcache: 'no',
        toolbar: 'no'
    };

    var loaded = false;

    $scope.like = function () {
        $cordovaInAppBrowser.open('https://www.facebook.com/SMNIApp/', '_blank', options);
    };

    // $timeout(function() {
    //     ionicMaterialMotion.slideUp({
    //         selector: '.slide-up'
    //     });
    // }, 300);
    
    $timeout( function () {
        ionicMaterialInk.displayEffect();
    }, 300);

    $scope.$on('$ionicView.enter', function (e) {
    });


}])

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
