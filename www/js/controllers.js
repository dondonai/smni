angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaInAppBrowser) {

    var options = {
      location: 'no',
      clearcache: 'no',
      toolbar: 'no'
    };

    $scope.sourceRtmp = function() {
      $cordovaInAppBrowser.open('rtmp://smni.live-s.cdn.bitgravity.com/cdn-live/_definst_/smni/live/feed001', '_system', options)
    }

})

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
