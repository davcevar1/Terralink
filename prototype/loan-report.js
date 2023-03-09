require.config(requireConfig);
define(function (require) {
    'use strict';
    var angular = require('angular'),
        kendo = require('kendo'),
        messages = require('cobis/messages');
    
    require('bootstrap');

    var app = angular.module('app', ['kendo.directives'])
		.controller('controller', ['$scope', '$http', '$q', '$timeout', '$location',
            function ($scope, $http, $q, $timeout, $location) {
                $scope.activate = function () {
					
                };
                
                $scope.loans = {
                    dataSource: {
                        transport: {
                            read: "mocks/loans.json"
                        }
                    },
                    selectable: true,
                    scrollable: false,
                    change: function(e) {
                        location.href = 'loan-request-check.html?step=10';
                    },
                    columns: [
                        {
                            field: "AIN",
                            title: "Application ID"
                        },
                        {
                            field: "CIN",
                            title: "Core ID #"
                        },
                        {
                            field: "TIN",
                            title: "Tax ID"
                        },
                        {
                            field: "SSN",
                            title: "Social security #"
                        },
                        {
                            field: "BusinessName",
                            title: "Business Name"
                        },
                        {
                            field: "StartDate",
                            title: "Start date",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }
                    ]
                };
                
				$scope.activate();
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});