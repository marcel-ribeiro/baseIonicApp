angular.module('login.controller', [])


  .controller('LoginController', function ($scope, $rootScope, $state, $ionicLoading, $filter, AuthenticationService, PopupService, APP_DEFAULT_ROUTE) {
    var $translate = $filter('translate');

    $scope.login = function (user) {
      if (!user || !user.email || !user.password) {
        var errorTitle = $translate('LOGIN.ERROR_TITLE');
        var errorMsg = $translate('LOGIN.FORM_INCOMPLETE');
        PopupService.displayAlertPopup(errorTitle, errorMsg);
        return;
      }

      console.log("Logging in with email: ", user.email);
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });

      AuthenticationService.loginWithEmail(user)
        .then(function (authData) {

          console.log("Logged in as: " + authData.uid);
          $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});

        }).catch(function (error) {

          console.log("Error logging in: ", error.message);
          var errorTitle = $translate('LOGIN.ERROR_TITLE');
          var errorMsg = $translate(error.code) != error.code ? $translate(error.code) : error.message;
          PopupService.displayAlertPopup(errorTitle, errorMsg);

        }).finally(function () {

          $ionicLoading.hide();

        });

    };


  });