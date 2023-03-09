require.config(requireConfig);
define(function(require) {
  'use strict';
  var angular = require('angular'),
    //kendo = require('kendo'),
    messages = require('cobis/messages'),
    zxcvbn = require('misc/zxcvbn');

  require('misc/rangeslider');
  require('bootstrap');
  require('cobis/validate.tooltip');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q', '$timeout', '$location',
      function($scope, $http, $q, $timeout, $location) {
        var emptyOwner = {
            percentage: '',
            firstName: '',
            middleName: '',
            lastName: '',
            bankAccounts: [{}]
          },
          initialized,
          fuse;
        $scope.activate = function() {
          $scope.currentStep = Number(location.pathname.replace(/\D/g, ''));
          $scope.lastStep = sessionStorage.lastStep = sessionStorage.lastStep ? Math.max(Number(sessionStorage.lastStep), $scope.currentStep) : $scope.currentStep;
          $http.get('mocks/countries.json')
            .then(function(response) {
              $scope.countries = response.data;
            });
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
          window.setAgreeDisclaimer = function() {
            $('[name="agree-disclaimer"]').prop('checked', true);
          };
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
                $('#step1').removeClass('has-error');
              } else {
                $('#step1').addClass('has-error');
                if ($('#step1').hasClass('has-error')) {
                  $('.has-error:not(form):visible')[0].scrollIntoView({
                    behavior: 'smooth'
                  });
                } else {
                  setTimeout(function() {
                    $('.has-error:not(form):visible')[0].scrollIntoView({
                      behavior: 'smooth'
                    });
                  }, 400);
                }
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
              $scope.bankAccounts.forEach(function(account) {
                if (!account.number || !account.bankName || account.number == '' || account.bankName == '') {
                  account.invalid = true;
                } else {
                  account.invalid = false;
                }
              });
              if ($scope.bankAccounts.length==0 && $('#step3').valid()) {
                location.href = 'loan-request-step4.html';
              } else if ($scope.bankAccounts.length>0) {
                localStorage.authorizationAccounts = $scope.bankAccounts.length;
                $scope.authorizeAccounts();
              }
            })
            .validate();
          $('#step4')
            .on('submit', function(e) {
              e.preventDefault();
              if ($('#step4').valid()) {
                $('#submit-message-kendo').kendoWindow({
                  width: "600px",
                  modal: true
                }).data("kendoWindow").center().open();
                $('#submit-message-kendo').closest('.k-window').addClass('cb-preprocess-message');
                /*
                $('#submit-message').modal({backdrop:'static'});
                setTimeout(function() {
                    location.href = 'loan-request-step5.html';
                }, 8000);
                */
              } else {
                $scope.showOwnershipError = true;
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

          setTimeout(function() {
            $('input[type="range"]').rangeslider({
              polyfill: false
            });
          }, 300);

          if ($scope.currentStep == 3) {
            $http.get('mocks/banks.json')
              .then(function(response) {
                var banks = response.data.SearchBanksByBankNameResponse.SearchBanksByBankNameResult.BanksSearchResult;
                var options = {
                  keys: ['ContentServiceDisplayName']
                }
                fuse = new Fuse(banks, options);
              });
          }
        };
        $scope.account = {};
        $scope.addAccount = function(account) {
          $scope.bankAccounts.push(account);
          $scope.account = {};
          $('body').click();
        };
        $scope.closeModal = function(id) {
          $('#'+id).data('kendoWindow').close();
        }
        $scope.removeAccount = function(account) {
          var idx = $scope.bankAccounts.indexOf(account);
          if (idx !== -1) {
            $scope.bankAccounts.splice(idx, 1);
          }
        };
        $scope.addOwner = function() {
          if ($('#step4').valid()) {
            $scope.owners.push(angular.extend({}, emptyOwner));
          }
        };
        $scope.addOwnerAccount = function(owner) {
          owner.bankAccounts.push({});
        }
        $scope.clearBank = function(account, event) {
          if (event) {
            event.stopPropagation();
          }
          account.bank = null;
          account.bankName = '';
        };
        $scope.getOwnersPercentage = function() {
          var percentage = 0;
          $scope.owners.forEach(function(owner) {
            percentage += owner.percentage;
          });
          return percentage;
        };
        $scope.gotoStep5 = function() {
          location.href = 'loan-request-step5.html';
        };
        $scope.loanAmountRequestedValue = 25000;
        $scope.yearsInBusinessIndex = 0;
        $scope.bankAccounts = [];
        $scope.business = {
          local: 'yes'
        };
        $scope.businessAnnualRevenueValue = 100000;
        $scope.businessAnnualExpensesValue = 100000;
        window.yearsInBusiness = [
          "Less than 2 Years",
          "2 - 5 Years",
          "6 - 10 Years",
          "11 - 15 Years",
          "16 - 20 Years",
          "21 or More"
        ];
        $scope.formatValue = function(value) {
          return kendo.toString(Number(value), 'c');
        };
        $scope.getValue = function(index, variable) {
          return window[variable][index || 0];
        };
        $scope.owners = [angular.extend({}, emptyOwner)];
        $scope.ownersCreditScore = function (item) {
            return item.percentage > 10;
        };
        $scope.state = {
          selectedBusinessOwner: ''
        };
        $scope.removeOwner = function(owner) {
          var idx = $scope.owners.indexOf(owner);
          if (idx !== -1) {
            $scope.owners.splice(idx, 1);
          }
          return $scope.owners;
        }
        $scope.acceptance = "1";
        $scope.setAcceptance = function(acceptance) {
          if (acceptance == 1) {
            location.href = 'loan-request-accept-1.html';
          } else {
            $('#comment').modal();
          }
        };
        $scope.setBank = function(account, bank) {
          account.bank = bank;
          account.bankName = bank.ContentServiceDisplayName;
        };
        var focusTimeout;
        $scope.setFocus = function(account, value, event) {
          if (event) {
            event.stopPropagation();
          }
          $timeout.cancel(focusTimeout);
          focusTimeout = $timeout(function() {
            if (account) {
              account.focus = value;
              if (!account.bank) {
                account.bankName = '';
              }
            }
          }, 200);
        };
        $scope.authorizeAccounts = function() {
          $('#authorizeAccounts').modal();
        }
        $scope.authorizeAccount = function(account) {
          account.authorized = true;
          if (!$scope.getNextAuthorize()) {
            $('#authorizeAccounts').modal('hide');
            //location.href = 'loan-request-step4.html';
          }
        }
        $scope.getToAuthorizeAccounts = function() {
          return $scope.bankAccounts.filter(function(account) {
            return !account.authorized;
          });
        }
        $scope.getNextAuthorize = function() {
          return $scope.bankAccounts.find(function(account) {
            return !account.authorized;
          });
        }
        $scope.steps = [
          {
            label: 'Get Started',
            icon: 'fa fa-home',
            url: 'loan-request-step1.html',
            active: false
          },
          {
            label: 'Application',
            icon: 'fa fa-building',
            url: 'loan-request-step2.html',
            active: false
          },
          {
            label: 'Business',
            icon: 'fa fa-industry',
            url: 'loan-request-step3.html',
            active: false
          },
          {
            label: 'Owner',
            icon: 'fa fa-user',
            url: 'loan-request-step4.html',
            active: false
          }
        ];
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
        $scope.$watch('account.bankName', function(value) {
          if (fuse) {
            $scope.banks = fuse.search(value).splice(0,5);
          }
        })
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
