require.config(requireConfig);
define(function(require) {
  'use strict';
  var angular = require('angular'),
    messages = require('cobis/messages'),
    zxcvbn = require('misc/zxcvbn');

  //require('kendo-angular');
  require('bootstrap');
  require('cobis/validate.tooltip');
  require('misc/dropzone');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q', '$timeout', '$location', '$filter',
      function($scope, $http, $q, $timeout, $location, $filter) {
        var initialized,
          emptyOwner = {
            businessNames: [{
              id: (new Date()).getTime(),
              value: ''
            }]
          };
        $scope.activate = function() {
          $scope.currentStep = 0;
          $scope.lastStep = sessionStorage.lastStep = sessionStorage.lastStep ? Math.max(Number(sessionStorage.lastStep), $scope.currentStep) : $scope.currentStep;
          $(window).on('load resize scroll touchstart touchmove mousewheel', function() {
            $(".dropdown-toggle").each(function() {
              par = $(this).parents('.btn-group');
              dropl = par.find('ul');
              otop = $(this).offset().top + $(this).height() - $(window).scrollTop();
              ulh = dropl.height();
              obot = $(window).height() - $(this).height() - $(this).offset().top + $(window).scrollTop();
              if ((obot < ulh) && (otop > ulh)) {
                par.addClass('dropup');
              } else {
                par.removeClass('dropup');
              }
            });
          });
          $.validator.addMethod('url', function(value) {
            return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value);
          }, 'Please enter a valid URL.');
          $.validator.addMethod('lower', function(value) {
            return /^(?=.*[a-z]).+$/.test(value);
          }, 'At least one lower case letter [a-z].');
          $.validator.addMethod('upper', function(value) {
            return /^(?=.*[A-Z]).+$/.test(value);
          }, 'At least one upper case letter [A-Z].');
          $.validator.addMethod('numbers', function(value) {
            return /^(?=.*[0-9]).+$/.test(value);
          }, 'At least one numeral [0-9].');
          $.validator.addMethod('symbols', function(value) {
            return /^(?=.*[!@#^&*()+_.{}?-]).+$/.test(value);
          }, 'At least one symbol [!@#^*()+_.{}?-].');
          $.validator.addMethod('no-spaces', function(value) {
            return /^\S+$/.test(value);
          }, 'No spaces.');
          $('#step1')
            .on('submit', function(e) {
              e.preventDefault();
              if ($('#step1').valid()) {
                location.href = 'loan-request-step2.html';
              }
            })
            .validate();
          $('#step2')
            .on('submit', function(e) {
              e.preventDefault();
              if ($('#step2').valid()) {
                location.href = 'loan-request-step3.html';
              }
            })
            .validate();
          $('#step3')
            .on('submit', function(e) {
              e.preventDefault();
              if ($('#step3').valid()) {
                location.href = 'loan-request-step4.html';
              }
            })
            .validate();
          $('[name="password"]')
            .on('keyup', function(e) {
              var value = $(this).val().trim(),
                score,
                scoreClass;
              if (value != '' && $(this).valid()) {
                $(this).parent().addClass('input-group');
                $(this).next().removeClass('hidden');
                switch (zxcvbn(value).score) {
                  case 0:
                  case 1:
                    score = 'Poor';
                    scoreClass = 'input-group-addon cb-indicator-bad';
                    break;
                  case 2:
                    score = 'Good';
                    scoreClass = 'input-group-addon cb-indicator-warning';
                    break;
                  case 3:
                  case 4:
                    score = 'Strong';
                    scoreClass = 'input-group-addon cb-indicator-good';
                    break;
                }
                $(this).next().removeClass().addClass(scoreClass).text(score);
              } else {
                $(this).parent().removeClass('input-group');
                $(this).next().addClass('hidden');
              }
            });
          $('#password-tooltip')
            .popover({
              content: $('#password-requirement').html(),
              html: true,
              trigger: 'focus'
            });
          $('#revenue-tooltip')
            .popover({
              content: $('#revenue-tooltip-content').html(),
              html: true,
              trigger: 'focus'
            });
          $('#expenses-tooltip')
            .popover({
              content: $('#expenses-tooltip-content').html(),
              html: true,
              trigger: 'focus'
            });
          $scope.signers = sessionStorage.signers ? JSON.parse(sessionStorage.signers) : [];
          $scope.shareholders = sessionStorage.shareholders ? JSON.parse(sessionStorage.shareholders) : $scope.shareholders;
          $scope.business = sessionStorage.business ? JSON.parse(sessionStorage.business) : null;
          Dropzone.autoDiscover = false;
          setTimeout(function(){
            $(".dropzone").dropzone({
              url: "/file/post",
              uploadMultiple: true,
              addRemoveLinks: true,
              autoProcessQueue: false,
              acceptedFiles: 'application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              init: function() {
                this.on("error", function(file) {
                  if (!file.accepted) {
                    this.removeFile(file);
                    alert('Selected file has not a valid format.');
                  }
                });
              }
            });
          }, 300);
          $('.datepicker').kendoDatePicker({
              // defines the start view
              start: "year",

              // defines when the calendar should return date
              depth: "year",

              // display month and year in the input
              format: "MMMM yyyy",

              // specifies that DateInput is used for masking the input element
              dateInput: true
          });
        };
        $scope.addBeneficiary = function() {
          $scope.beneficiaries.push(angular.copy(emptyOwner));
        };
        $scope.addBusinessName = function(person) {
          person.businessNames = person.businessNames || [];
          person.businessNames.push({
            id: (new Date()).getTime(),
            value: ''
          });
        };
        $scope.addOwner = function() {
          $scope.owners.push(angular.copy(emptyOwner));
        };
        $scope.addSigner = function() {
          $scope.signers.push({
            ownershipPercentage: 11,
            businessNames: [{
              id: (new Date()).getTime(),
              value: ''
            }]
          });
        };
        $scope.datepickerOptions = {
          dateInput: true
        };
        $scope.removeItem = function(array, item) {
          array.splice(array.indexOf(item), 1);
        };
        $scope.setAgree = function() {
          $scope.agreement = true;
          $('#terms').modal('hide');
        }
        $scope.formatYears = function(value, min, max) {
          if (value >= min && value <= max) {
            return value + ' years';
          } else if (value < min) {
            return 'Less than ' + min + ' years';
          } else if (value > max) {
            return value + ' years or more';
          }
        }
        $scope.formatCurrency = function(value, min, max) {
          if (value >= min && value <= max) {
            return $filter('currency')(value);
          } else if (value < min) {
            return 'Less than ' + $filter('currency')(value);
          } else if (value > max) {
            return $filter('currency')(value) + ' or more';
          }
        }
        $scope.getOwnersPercentage = function() {
          var percentage = 0;
          $scope.owners.forEach(function(owner) {
            percentage += Number(owner.ownershipPercentage);
          });
          return percentage;
        };
        $scope.goto = function(url) {
          location.href = url;
        };
        $scope.initRequest = function() {
          $scope.addSigner();
        }
        $scope.initFromLoan = function() {
          $scope.shareholders = [{
              firstName: "Frank",
              lastName: 'Johnson',
              ownership: 45
            },
            {
              firstName: "Jennifer",
              lastName: 'Thompson',
              ownership: 55
            }
          ];
        }
        $scope.setType = function(e, type) {
          e.target.type = type;
        }
        $scope.showAgreement = function(e) {
          if (e.target.checked) {
            e.preventDefault();
            e.target.checked = false;
            $('#terms').modal('show');
          }
        }
        $scope.signers = [];
        $scope.submitFromLoan = function() {
          if ($scope.request.hasAccount == 'yes') {
            $scope.goto('terralink-documents-confirm.html');
          } else {
            sessionStorage.shareholders = angular.toJson($scope.shareholders);
            sessionStorage.signers = angular.toJson($scope.signers);
            sessionStorage.business = angular.toJson({
              name: "Frank's Auto Repair"
            });
            $scope.goto('terralink-processing.html');
          }
        };
        $scope.owners = [angular.copy(emptyOwner)];
        $scope.beneficiaries = [angular.copy(emptyOwner)];
        $scope.request = {};
        $scope.personalSteps = [{
            label: 'Account',
            active: false
          },
          {
            label: 'Signers',
            active: false
          },
          {
            label: 'Additional Information',
            active: false
          },
          {
            label: 'Additional Products',
            active: false
          }
        ];
        $scope.businessSteps = [{
            label: 'Account',
            active: false
          },
          {
            label: 'Business',
            active: false
          },
          {
            label: 'Shareholders',
            active: false
          },
          {
            label: 'Signers',
            active: false
          },
          {
            label: 'Products',
            active: false
          }
        ];
        //Aqui podemos encontrar como funciona el USD
        
        //La siguiente funcino nos describe que si hay la palabra Yes se enviadirectamente a terralink confirm 
        $scope.steps = $scope.personalSteps;
        $scope.setStep = function(step) {
          if ($scope.request.hasAccount == 'yess') {
            $scope.goto('terralink-documents-confirm.html');
          } else if (($scope.request.relationship == 'personal' && step > 3) || ($scope.request.relationship == 'business' && step > 4)) {
            sessionStorage.shareholders = angular.toJson($scope.owners);
            sessionStorage.signers = angular.toJson($scope.signers);
            if ($scope.request.relationship == 'business') {
              sessionStorage.business = angular.toJson($scope.business);
            }
            location.href = 'terralink-processing.html';
          } else {
            $scope.currentStep = step;
          }
        };
        $scope.$watch('request.relationship', function(value) {
          switch (value) {
            case 'personal':
              $scope.steps = $scope.personalSteps;
              break;
            case 'business':
              $scope.steps = $scope.businessSteps;
              break;
          }
        });
        $scope.$watchCollection('owners', function(value) {
          if (initialized) {
            $timeout(function() {
              $('.owner-form:not(:last-child) .panel-collapse').collapse('hide');
              if (!$('.owner-form:last-child .panel-collapse').hasClass('in')) {
                $('.owner-form:last-child .panel-collapse').collapse('show');
              }
              $("html, body").animate({
                scrollTop: (44 * (value.length - 1)) + 40
              }, 'slower');
            });
          } else {
            initialized = true;
          }
        });
        $scope.$watchCollection('signers', function(value) {
          if (initialized) {
            $timeout(function() {
              $('.signer-form:not(:last-child) .panel-collapse').collapse('hide');
              if (!$('.signer-form:last-child .panel-collapse').hasClass('in')) {
                $('.signer-form:last-child .panel-collapse').collapse('show');
              }
              $("html, body").animate({
                scrollTop: (44 * (value.length - 1)) + 40
              }, 'slower');
            });
          } else {
            initialized = true;
          }
        });
        $scope.$watchCollection('beneficiaries', function(value) {
          if (initialized) {
            $timeout(function() {
              $('.beneficiary-form:not(:last-child) .panel-collapse').collapse('hide');
              if (!$('.beneficiary-form:last-child .panel-collapse').hasClass('in')) {
                $('.beneficiary-form:last-child .panel-collapse').collapse('show');
              }
              $("html, body").animate({
                scrollTop: (44 * (value.length - 1)) + 40
              }, 'slower');
            });
          } else {
            initialized = true;
          }
        });

        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
