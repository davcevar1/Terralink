require.config(requireConfig);
define(function(require) {
  'use strict';
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  require('bootstrap');
  require('misc/json-formatter.min');

  var app = angular.module('app', ['kendo.directives', 'jsonFormatter'])
    .controller('controller', ['$scope', '$http', '$q', '$timeout', '$location', '$sce',
      function($scope, $http, $q, $timeout, $location, $sce) {
        $scope.activate = function() {
          $http.get('mocks/error-log-results.json')
            .then(function(response) {
              $scope.results = response.data.entries;
            });
        };
        $scope.dateRange = 'last-week';
        $scope.find = function() {
          $scope.showResults = true;
          $scope.isAdvanced = false;
        };
        $scope.showDetail = function(entry) {
          $scope.detail = entry;
          $('#detail').modal('show');
        }
        $scope.$watch('dateRange', function(value) {
          if (value=='custom') {
            $scope.isAdvanced = true;
          }
        });
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
