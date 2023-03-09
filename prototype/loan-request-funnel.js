require.config(requireConfig);
define(function(require) {
  'use strict';
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  require('angular-animate');
  require('bootstrap');

  var app = angular.module('app', ['kendo.directives', 'ngAnimate'])
    .controller('controller', ['$scope', '$http', '$q', '$timeout', '$location', '$sce',
      function($scope, $http, $q, $timeout, $location, $sce) {
        $scope.activate = function() {
          $http.get('mocks/processes.json')
            .then(function(response) {
              $scope.processes = response.data;
            });
        };
        $scope.companies = [{
          "name": "Concesionaria Qauto",
          "amount": 234567,
          "count": 100
        }, {
          "name": "Autoasia",
          "amount": 123987,
          "count": 45
        }, {
          "name": "Metrocar",
          "amount": 89234,
          "count": 20
        }, {
          "name": "Ambacar, Great Wall Ecuador",
          "amount": 23987,
          "count": 1
        }];
        $scope.companies_amount = {
          dataSource: {
            data: $scope.companies
          },
          title: 'Por monto',
          legend: {
            position: 'bottom',
            labels: {
              template: "#= text # - #= kendo.format('{0:P}', percentage)#"
            }
          },
          tooltip: {
            visible: true,
            template: '#= category #'
          },
          seriesDefaults: {
            type: 'pie'
          },
          series: [{
            field: 'amount',
            categoryField: 'name',
            padding: 0
          }],
          theme: 'metro'
        };
        $scope.companies_quantity = {
          dataSource: {
            data: $scope.companies
          },
          title: 'Por cantidad',
          legend: {
            position: 'bottom',
            labels: {
              template: "#= text # - #= kendo.format('{0:P}', percentage)#"
            }
          },
          tooltip: {
            visible: true,
            template: '#= category #'
          },
          seriesDefaults: {
            type: 'pie'
          },
          series: [{
            field: 'count',
            categoryField: 'name',
            padding: 0
          }],
          theme: 'metro'
        };
        $scope.endAt = new Date();
        $scope.sellers = {
          dataSource: {
            data: [{
              "name": "Jorge Martinez",
              "amount": 123456,
              "count": 15
            }, {
              "name": "Marco Hidalgo",
              "amount": 89345,
              "count": 6
            }, {
              "name": "Sebastian Bustamante",
              "amount": 45678,
              "count": 6
            }, {
              "name": "Toyocosta S.A.",
              "amount": 41000,
              "count": 5
            }, {
              "name": "Viviana Cordero",
              "amount": 23456,
              "count": 2
            }, {
              "name": "Otros",
              "amount": 123432,
              "count": 32
            }]
          },
          legend: {
            position: 'right',
            labels: {
              template: "#= text # - #= kendo.format('{0:P}', percentage)#"
            }
          },
          seriesDefaults: {
            type: 'pie'
          },
          series: [{
            field: 'amount',
            categoryField: 'name',
            padding: 0
          }],
          theme: 'metro'
        };
        $scope.setDetail = function(step, status) {
          $scope.step = step;
          $scope.status = status;
        };
        $scope.setProcess = function(process) {
          $scope.process = process;
          $scope.step = null;
          $scope.status = null;
        };
        $scope.startAt = new Date((new Date()).setMonth(new Date().getMonth() - 1));
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
