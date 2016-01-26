angular.module('smni.controllers', [])

.controller('HomeCtrl', ['$scope', '$cordovaInAppBrowser', '$cordovaNetwork', '$ionicPopup', '$timeout', function($scope, $cordovaInAppBrowser, $cordovaNetwork, $ionicPopup, $timeout) {

  // $scope.init = function () {
  //   checkConnection();
  // }

  // $scope.$on('$ionicView.enter', function(e) {
  //   $scope.checkConnection();
  //   // document.addEventListener("deviceready", $scope.checkConnection, false);
  // });

  // document.addEventListener("deviceready", $scope.checkConnection, false);

  // Check internet connection
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



}])

.controller('ProgramsCtrl', ['$scope', '$stateParams', 'ProgramListFactory', function($scope, $stateParams, ProgramListFactory) {

    $scope.programs = ProgramListFactory.all();
    console.log($scope.programs);


}])

.controller('ProgramDetailCtrl', ['$scope', '$stateParams', 'ProgramsFactory', 'ProgramListFactory', '$ionicLoading', '$cordovaNetwork', '$ionicPopup', function($scope, $stateParams, ProgramsFactory, ProgramListFactory, $ionicLoading, $cordovaNetwork, $ionicPopup) {

    // $scope.program = ProgramListFactory.get( $stateParams.programId );


    $scope.init = function() {
        var isOnline = $cordovaNetwork.isOnline()
        if (isOnline === true) {
            $scope.programItem();
        } else {
            $scope.isOffline();
        }
    }

    var playlistId = $stateParams.programId;

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

    $scope.program = ProgramListFactory.get($stateParams.programId);

    $scope.init();

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

.controller('AboutCtrl', ['$scope', '$cordovaInAppBrowser', function ($scope, $cordovaInAppBrowser) {
    
    var options = {
        location: 'no',
        clearcache: 'no',
        toolbar: 'no'
    };

    $scope.like = function () {
        $cordovaInAppBrowser.open('https://www.facebook.com/SMNIApp/', '_blank', options);
    };
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
