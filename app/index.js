'use strict';

/* Dashboard Angular app
 * ---------------------
 *
 * ----------------------------------------------------------------------*/
var dashboard = angular.module('dashboard', ['ngRoute']);

dashboard.config(['$routeProvider', function($routeProvider) {

$routeProvider
  .when('/', {
    redirectTo: '/breakfast-cereals'
    //I couldnt see anything on index to load
  })
  .when('/breakfast-cereals', {
    controller: 'breakfastCerealsCtrl',
    templateUrl: '/views/breakfast.html'
  })
  .when('/on-the-go', {
    controller: 'onTheGoCtrl',
    templateUrl: '/views/on-the-go.html'
  })
  .when('/non-dairy-milk', {
    controller: 'nonDairyMilkCtrl',
    templateUrl: '/views/non-dairy-milk.html'
  })
  .otherwise({
    redirectTo: '/'
  });

}]);

// Bootstrap application
dashboard.run(['$rootScope', '$http', '$window', function($rootScope, $http, $window) {

  var initialize = function(data) {
    // The main data that gets used to populate the page
    $rootScope.siteData = data;
  };

  // The app needs to load site data before rendering
  $http.get('/data/site-data.json').success(function(data) {
    initialize(data);
  });

}]);

/* Services
 * ----------------------------------------------------------------------*/

dashboard.factory('BreakfastCereals', ['$http', '$log', '$q', function($http, $log, $q){
  return {
    getData: function () {
      return $http.get('/data/breakfast-cereals.json')
      .then(function(response) {
        console.log(response.data);
        return response.data;
      }, function(response) {
        console.log(response);
      });
    }

  }
}]);

dashboard.factory('OnTheGo', ['$http', function($http){
  return {
    getData: function () {
      return $http.get('/data/on-the-go.json');
    }
  }
}]);

dashboard.factory('NonDairyMilk', ['$http', function($http){
  return {
    getData: function () {
      return $http.get('/data/non-dairy-milk.json');
    }
  }
}]);

/* Controllers
 * ----------------------------------------------------------------------*/
dashboard.controller('siteCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

}]);

dashboard.controller('breakfastCerealsCtrl', ['$scope', '$http', '$rootScope', 'BreakfastCereals',
function($scope, $http, $rootScope, BreakfastCereals) {
      $scope.brandData = BreakfastCereals.getData();
}]);

dashboard.controller('onTheGoCtrl', ['$scope', '$http', '$rootScope', 'OnTheGo', function($scope, $http, $rootScope, OnTheGo) {
    OnTheGo.getData().success(function(data) {
      $scope.brandData = data;
    }).error(function(data) {
      console.log(data);
    });
}]);

dashboard.controller('nonDairyMilkCtrl', ['$scope', '$http', '$rootScope', 'NonDairyMilk', function($scope, $http, $rootScope, NonDairyMilk) {
    NonDairyMilk.getData().success(function(data) {
      $scope.brandData = data;
      console.log($scope.brandData);
    }).error(function(data) {
      console.log(data);
    });
}]);

/* Directives
 * ----------------------------------------------------------------------*/
dashboard.directive('sidebarMenu', function() {
  return {
    templateUrl: '/views/sidebar-menu.html',
    replace: true,
    link: function($scope, $element, $attrs) {

      // Content gets shown for one module at a time
      $scope.currentTab = 0;

      // Switch the current tab (when menu link is clicked)
      $scope.onClickTab = function(moduleIndex) {
          $scope.currentTab = moduleIndex;
        }
        // Check the active tab (used to highlight tab link)
      $scope.isActiveTab = function(moduleIndex) {
        return moduleIndex == $scope.currentTab;
      }

    }
  };
});

dashboard.directive('backToTop', function() {
  return {
    templateUrl: '/views/back-to-top.html',
    replace: true,
    link: function($scope, $element, $attrs) {
      // Use window object
      var win = $(window);

      // Scroll page to top method
      $scope.scrollToTop = function() {
        win.scrollTop(0);
      };

      // Scrolling listener
      win.scroll(function() {
        // back to top button
        if (win.scrollTop() >= (win.height() / 2)) {
          $('.back-to-top').removeClass('hidden');

        } else {
          $('.back-to-top').addClass('hidden');

        }
        // sticky toolbar
        var stickyToolbarOffsetTop = $('.infinity-topbar').outerHeight() + $('.page-header').outerHeight() + $('.section-header').outerHeight();
        if (win.scrollTop() >= stickyToolbarOffsetTop) {
          $('.sticky-toolbar').addClass('is-shown');

        } else {
          $('.sticky-toolbar').removeClass('is-shown');

        }
      });
    }
  };
});

dashboard.directive('stickyToolbar', function() {
  return {
    templateUrl: '/views/sticky-toolbar.html',
    replace: true,
    link: function($scope, $element, $attrs) {
      // Use window object
      var win = $(window);

      // Scrolling listener
      win.scroll(function() {
        var stickyToolbarOffsetTop = $('.infinity-topbar').outerHeight() + $('.page-header').outerHeight() + $('.section-header').outerHeight();
        if (win.scrollTop() >= stickyToolbarOffsetTop) {
          $('.sticky-toolbar').addClass('is-shown');

        } else {
          $('.sticky-toolbar').removeClass('is-shown');
        }
      });
    }
  };
});

dashboard.directive('chart', function() {

  return {
    restrict: 'E',
    template: '<div></div>',
    scope: {
      chartData: "=value",
      chartObj: "=?"
    },
    transclude: true,
    replace: true,
    link: function($scope, $element, $attrs, $log) {

      // Update when charts data changes
      $scope.$watch('chartData', function(value) {
        if (!value)
          return;

        // Use default values if nothing is specified in the given settings
        if ($attrs.type)
          $scope.chartData.chart.type = $scope.chartData.chart.type || $attrs.type;
        if ($attrs.height)
          $scope.chartData.chart.height = $scope.chartData.chart.height || $attrs.height;
        if ($attrs.width)
          $scope.chartData.chart.width = $scope.chartData.chart.type || $attrs.width;

        $element.highcharts($scope.chartData);

      });
    }
  };
});

dashboard.directive('siteHeader', function() {
  return {
    templateUrl: '/views/site-header.html',
    replcae: true
  };
});

/* Filters
 * ----------------------------------------------------------------------*/
dashboard.filter('camelize', function() {

  return function(text) {
    if (text) {
      return text.replace(' ', '');
    }
    return textCamelized;
  };


});
