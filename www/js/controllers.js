angular.module('smni.controllers', [])

.controller('HomeCtrl', ['$scope', '$cordovaInAppBrowser', '$cordovaNetwork', '$ionicPopup', function($scope, $cordovaInAppBrowser, $cordovaNetwork, $ionicPopup) {

    var options = {
      location: 'no',
      clearcache: 'no',
      toolbar: 'no'
    };

    $scope.init = function() {
      // $scope.connectionChecker();
    };

    $scope.sourceRtmp = function() {
      $cordovaInAppBrowser.open('rtmp://smni.live-s.cdn.bitgravity.com/cdn-live/_definst_/smni/live/feed001', '_system', options);
    };

    $scope.$on('$cordovaNetwork:online', function(event, networkState) {
      var onlineState = networkState;
      alert(onlineState);
      $scope.restartApp();
      // $scope.connectionChecker();
    });

    $scope.restartApp = function() {
      // navigator.app.exitApp();
      navigator.app.loadUrl("file:///android_asset/www/index.html", {wait:2000, loadingDialog:"Wait,Loading App", loadUrlTimeoutValue: 60000});
    };

    // $scope.connectionChecker = function() {

    //     var type = $cordovaNetwork.getNetwork(),
    //         isOnline = $cordovaNetwork.isOnline(),
    //         isOffline = $cordovaNetwork.isOffline();

    //     if( isOffline === true ) {
    //       // alert( 'You are online' );
    //       $scope.offline = true;

    //       $ionicPopup.alert({
    //         title: "No Internet Connection",
    //         content: "You need to have an internet connection to use the app.<br><br>Click OK to close the app"
    //       })
    //       .then( function() {
    //         // ionic.Platform.exitApp();
    //         console.log( 'No connection' );
    //         $scope.connectionStatus = "Offline";
    //       });

    //     } else {
    //       $scope.connectionStatus = "Online";
    //     }
    //   }
    // };
    
    document.addEventListener("deviceready", function () {

        var type = $cordovaNetwork.getNetwork()

        var isOnline = $cordovaNetwork.isOnline()

        var isOffline = $cordovaNetwork.isOffline()


        if( isOffline === true ) {
          // alert( 'You are online' );
          $scope.offline = true;

          $ionicPopup.alert({
            title: "No Internet Connection",
            content: "You need to have an internet connection to use the app.<br><br>Click OK to close the app"
          })
          .then( function() {
            // ionic.Platform.exitApp();
            console.log( 'No connection' );
            $scope.connectionStatus = "Offline";
          });

        } else {
          $scope.connectionStatus = "Online";
        }


      }, false);

  $scope.init();



}])

.controller( 'ProgramsCtrl', ['$scope', '$stateParams', 'ProgramListFactory', function( $scope, $stateParams, ProgramListFactory ) {
  
  $scope.programs = ProgramListFactory.all();
  console.log( $scope.programs );

  
}])

.controller( 'ProgramDetailCtrl', ['$scope', '$stateParams', 'ProgramsFactory', 'ProgramListFactory', '$ionicLoading', '$cordovaNetwork', '$ionicPopup', function( $scope, $stateParams, ProgramsFactory, ProgramListFactory, $ionicLoading, $cordovaNetwork, $ionicPopup ) {
  
  // $scope.program = ProgramListFactory.get( $stateParams.programId );


  $scope.init = function() {
    var isOnline = $cordovaNetwork.isOnline()
    if( isOnline === true ) {
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

    ProgramsFactory.get( params )
      .$promise.then( function(res) {
        $ionicLoading.hide();
        $scope.programItems = res.items;
        console.log( $scope.programItems );

      }, function(err) {
        console.log( err );
        // alert( 'Error occured: ' + err );
        // ionicLoading.hide();
      });       
  }

  $scope.isOffline = function() {
    $ionicPopup.alert({
      title: "No Internet Connection",
      content: "You are not connected to the internet."
    }).then( function() {
      $scope.offline = true;
    })
  }

  $scope.program = ProgramListFactory.get($stateParams.programId);

  $scope.init();

}])

.controller('playVideoCtrl', ['$scope', '$stateParams', 'ProgramsFactory', '$ionicLoading', function( $scope, $stateParams, ProgramsFactory, $ionicLoading ) {

  var videoId = $stateParams.videoId;

  $scope.theVideo = function() {

    var params = {
      type: 'videos',
      id: videoId
    };

    ProgramsFactory.get( params )
      .$promise.then( function(res) {
        $scope.playVideoId = videoId;
        $scope.videoInfo = res.items;
        console.log(res);
      }, function(err) {
        console.log( err );
        alert( 'Error: ' + err );

        ionicLoading.hide();
      });
    
  }

  $scope.$on('youtube.player.ready', function($event, player) {
    $ionicLoading.hide();
  });

  $scope.playerVars = {
      controls: 2,
      autoplay: 1,
      showinfo: 0
  };

  $ionicLoading.show();

  $scope.theVideo();

}])

.controller('videoListCtrl', ['$scope', 'ProgramsFactory', '$stateParams', '$log', function( $scope, ProgramsFactory, $stateParams, $log ) {

  // var playlistId = $stateParams.playlistId;


  $scope.getVideosFrmPrograms = function() {
    var params = {
      type: 'playlistItems',
      maxResults: '20',
      playlistId: 'PLBvNelqMoACDq83y9R3IKvJlQLX3uoCJ7'
    }

    ProgramsFactory.get( params )
      .$promise.then(function( res ) {
        $log.info(res);
      }, function( err ) {
        console.log( err );
      });
  }



  $scope.getVideosFrmPrograms();


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
