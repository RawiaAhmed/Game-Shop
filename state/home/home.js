angular.module('MondiaAssignment').controller('HomeCtrl', function ($scope, $timeout, $mdSidenav, $log, appService) {
    $scope.selectedItem = 'highlights';

    /**
    * Supplies a function that will continue to operate until the
    * time is up.
    */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                  $log.debug("toggle " + navID + " is done");
              });
        }, 200);
    }

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                  $log.debug("toggle " + navID + " is done");
              });
        };
    }

    $scope.toggleLeft = buildDelayedToggler('left');

    $scope.closeSideMenu = function () {
        $mdSidenav('left').close();
    };


    function init() {
        if (window.innerWidth <= 485) {
            $scope.slidePerView = 2.5;
        } else if (window.innerWidth < 700) {
            $scope.slidePerView = 3.5;
        } else {
            $scope.slidePerView = 5.5;
        }
        appService.getData().then(function (response) {
            $scope.games = response;
        });
    }

    init();
});
