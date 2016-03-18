
angular.module('smni', ['ionic', 'smni.controllers', 'smni.services', 'ngCordova', 'ionic-material', 'youtube-embed'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-19600826-19');
    } else {
      console.log('Google Analytics Unavailable');
    }
  });

})

.config( ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $ionicConfigProvider.backButton.previousTitleText(false).text('');

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl',
      },
    },
  })

  .state('tab.programs', {
      url: '/programs',
      views: {
        'tab-programs': {
          templateUrl: 'templates/tab-programs.html',
          controller: 'ProgramsCtrl',
        },
      },
    })
    .state('tab.program-detail', {
      url: '/programs/:programId',
      views: {
        'tab-programs': {
          templateUrl: 'templates/program-detail.html',
          controller: 'ProgramDetailCtrl',
        },
      },
    })
    .state('tab.video', {
      url: '/video/:videoId',
      views: {
        'tab-programs': {
          templateUrl: 'templates/video.html',
          controller: 'playVideoCtrl',
        },
      },
    })

    // .state('tab.program-detail', {
    //   url: '/programs/:chatId',
    //   views: {
    //     'tab-programs': {
    //       templateUrl: 'templates/program-detail.html',
    //       controller: 'ChatDetailCtrl'
    //     }
    //   }
    // })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl',
      },
    },
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

}]);
