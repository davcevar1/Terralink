require.config(requireConfig);
define(function(require) {
  'use strict';
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  // Importación no son módulos
  require('bootstrap');
  var app = angular.module('app', ['kendo.directives'])
    .filter('nl2br', function($sce) {
      return function(msg, is_xhtml) {
        var is_xhtml = is_xhtml || true;
        var breakTag = (is_xhtml) ? '<br />' : '<br>';
        var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
        return $sce.trustAsHtml(msg);
      }
    })
    .filter('abbrNumber', function() {
      return function(num, fixed) {
        if (num === null || num === undefined) {
          return null;
        } // terminate early
        if (num === 0) {
          return '0';
        } // terminate early
        fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
        var b = (num).toPrecision(2).split("e"), // get power
          k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
          c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
          d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
          e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
        return e;
      }
    })
    .controller('controller', ['$scope', '$http', '$q', '$timeout', '$location', '$sce', '$filter',
      function($scope, $http, $q, $timeout, $location, $sce, $filter) {
        $scope.activate = function() {
          $http.get('mocks/countries.json')
            .then(function(response) {
              $scope.countries = response.data;
            });
          $http.get('mocks/ofac.json')
            .then(function(response) {
              $scope.ofac = response.data["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["OSIOFAC.SEARCHRESULTSResponse"]["Searchresultsrs"]["Results"]["Results_Type.ResultsItem"];
            });
          $http.get('mocks/bankruptcy.json')
            .then(function(response) {
              $scope.backruptcy = response.data.BankruptcySearch2ResponseEx.response.Records.Record;
            });
          $http.get('mocks/liens.json')
            .then(function(response) {
              $scope.lien = response.data.LienJudgmentSearchResponseEx.response.Records.Record;
            });
          $http.get('mocks/criminal.json')
            .then(function(response) {
              $scope.criminal = response.data.CrimSearchResponseEx.response.Records.Record;
            });
          $http.get('mocks/foreclosure.json')
            .then(function(response) {
              $scope.foreclosure = response.data.ForeclosureSearchResponseEx.response.Records.Record;
            });
          $http.get('mocks/uccBusinessMatch.json')
            .then(function(response) {
              $scope.ucc = response.data.UCCSearch2ResponseEx.response.Records.Record;
            });
          $scope.decisionLogic = {
            debits: 8808.68,
            credits: 8343.18
          };
          $scope.decisionLogicBalance = $scope.decisionLogic.credits - $scope.decisionLogic.debits;
          if (location.search) {
            $scope.owner.relationship = location.search.split('=')[1];
          }
        };
        $scope.addBusinessName = function(person) {
          person.businessNames = person.businessNames || [];
          person.businessNames.push({id:(new Date()).getTime(), value:''});
        };
        $scope.addPhone = function(phones){
          phones.push({type:'', number:''});
        }
        $scope.removeItem = function(array, item) {
          array.splice(array.indexOf(item), 1);
        };
        $scope.toggleDetail = function(type, item) {
          if (item.open) {
            item.open = false;
          } else {
            switch (type) {
              case 'bankruptcy':
                $http.get('mocks/bankruptcyReport.json')
                  .then(function(response) {
                    var data = response.data.BankruptcyReport2ResponseEx.response.BankruptcyReportRecords.BankruptcyReportRecord,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.CaseNumber == item.Bankruptcy.CaseNumber;
                    });
                    if (detail) {
                      var template = kendo.template($("#bankruptcy-detail-template").html());
                      var content = template({
                        Bankruptcy: detail
                      });
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
              case 'lien':
                $http.get('mocks/lienReport.json')
                  .then(function(response) {
                    var data = response.data.LienJudgmentReportResponseEx.response.LienJudgments.LienJudgment,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.CaseNumber == item.CaseNumber;
                    });
                    if (detail) {
                      var template = kendo.template($("#lien-detail-template").html());
                      var content = template(detail);
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
              case 'criminal':
                $http.get('mocks/criminalReport.json')
                  .then(function(response) {
                    var data = response.data.CrimReportResponseEx.response.CriminalRecords.CriminalRecord,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.CaseNumber == item.CaseNumber;
                    });
                    if (detail) {
                      var template = kendo.template($("#criminal-detail-template").html());
                      var content = template(detail);
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
              case 'foreclosure':
                $http.get('mocks/foreclosureReport.json')
                  .then(function(response) {
                    var data = response.data.ForeclosureReportResponseEx.response.Foreclosures.Foreclosure,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.CaseNumber == item.CaseNumber;
                    });
                    if (detail) {
                      var template = kendo.template($("#foreclosure-detail-template").html());
                      var content = template(detail);
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
              case 'ucc':
                $http.get('mocks/uccBusinessReport.json')
                  .then(function(response) {
                    var data = response.data.UCCReport2ResponseEx.response.UCCFilings.UCCFiling,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.TMSId == item.TMSId;
                    });
                    if (detail) {
                      var template = kendo.template($("#ucc-detail-template").html());
                      var content = template(detail);
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
            }
          }
        };
        $scope.getSSN = function(value) {
          if (!$scope.clearSSN) {
            return 'XXX-XX-X' + value.substr(value.length - 3);
          } else {
            return value;
          }
        }
        $scope.inOutActivities = [
          {type:"Cash"},
          {type:"ACH"},
          {type:"Checks"},
          {type:"Wires"},
          {type:"Protransfers"},
          {type:"Internal transfers"},
          {type:"Others"}
        ];
        $scope.inOutNumOptions = {
          min: 0,
          spinners: false,
          decimals: 0,
          format: "n0"
        }
        $scope.inOutValueOptions = {
          min: 0,
          spinners: false,
          decimals: 0,
          format: "c0"
        }
        $scope.getTotal = function(type) {
          var value = 0;
          $scope.inOutActivities.forEach(function(inOutActivity){
            if (inOutActivity[type]) {
              value += Number(inOutActivity[type]);
            }
          });
          return value;
        }
        $scope.getValue = function(value, min, max) {
          if (value<=min) {
            return 'Less than '+value+' year';
          }else if (value>=max) {
            return value+' or more years';
          }else {
            return value+' years';
          }
        };
        $scope.owner = {
          firstName: 'Jennifer',
          middleName: 'C',
          lastName: 'Thompson',
          referrer: 'Jennifer Adams',
          citizenshipCountry: 'US',
          email: 'jennifer.thompson@hotmail.com',
          ssn: '123-45-6789',
          dayOfBirth: new Date('1960-01-01'),
          phones: [
            {type:'Home', number:'908 456 7890'}
          ],
          phone: '908 456 7890',
          street: '123 N Washington St.',
          city: 'Miami',
          state: 'FL',
          zip: '33101',
          country: 'US',
          income: '80K',
          ownershipPercentage: 15,
          employmentType: [
            'Employed'
          ],
          estimatedIncome: '4',
          employer: [
            'ABC Company'
          ],
          beneficiaries: [
            {
                "lastName": "Thompson",
                "firstName": "Jeniffer",
                "middleName": "C",
                "ssn": "123-45-6231",
                "phone": "(908) 207 8822",
            		"address": "234 Main St., NJ 20435, United States",
                "dayOfBirth": "01/01/1970"
              }
          ],
          relationship: 'Personal',
          notShowMailAddress: true,
        }
        $scope.owners = {
          dataSource: {
            transport: {
              read: {
                url: "mocks/account-owners.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            $('#owner').modal();
          },
          columns: [{
              field: "lastName",
              title: "Name",
              template: "#: firstName # #: middleName #, #: lastName #"
            },
            {
              field: "ssn",
              title: "SSN"
            },
            {
              field: "phone",
              title: "Phone"
            },
            {
              field: "address",
              title: "Address"
            }
          ]
        };
        $scope.beneficiaries = {
          dataSource: {
            transport: {
              read: {
                url: "mocks/account-beneficiaries.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            $('#beneficiary').modal();
          },
          columns: [{
              field: "lastName",
              title: "Name",
              template: "#: firstName # #: middleName #, #: lastName #"
            },
            {
              field: "ssn",
              title: "SSN"
            },
            {
              field: "phone",
              title: "Phone"
            },
            {
              field: "address",
              title: "Address"
            }
          ]
        };
        $scope.business = {
          businessName: "Frank's Auto Repair Inc.",
          dba: "Frank's Auto Repair",
          taxId: "12-123-3456",
          website: "http://www.franksrepair.com",
          businessIndustry: 2,
          yearsInBusiness: 5,
          annualRevenue: 120000,
          annualExpenses: 100000,
          street: '123 N Washington St.',
          city: 'Miami',
          state: 'FL',
          zip: '33101',
          country: 'US',
          phones: [{
            type: "work",
            number: "(908) 345 4567"
          }]
        };
        $scope.formatCurrency = function(value, min, max) {
          if (value>=min && value<=max) {
            return $filter('currency')(value);
          }else if (value<min) {
            return 'Less than '+$filter('currency')(value);
          }else if (value>max) {
            return $filter('currency')(value)+' or more';
          }
        }
        $scope.signers = {
          dataSource: {
            transport: {
              read: {
                url: "mocks/account-signers.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            $('#beneficiary').modal();
          },
          columns: [{
              field: "lastName",
              title: "Name",
              template: "#: firstName # #: middleName #, #: lastName #"
            },
            {
              field: "ssn",
              title: "SSN"
            },
            {
              field: "phone",
              title: "Phone"
            },
            {
              field: "address",
              title: "Address"
            }
          ]
        };
        $scope.request = {
          relationship: 'Personal',
          notShowMailAddress: true
        };
        $scope.shareholders = {
          dataSource: {
            transport: {
              read: {
                url: "mocks/account-owners.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            $('#owner').modal();
          },
          columns: [{
              field: "lastName",
              title: "Name",
              template: "#: firstName # #: middleName #, #: lastName #"
            },
            {
              field: "ssn",
              title: "SSN"
            },
            {
              field: "phone",
              title: "Phone"
            },
            {
              field: "address",
              title: "Address"
            },
            {
              field: "ownership",
              title: "Ownership"
            }
          ]
        };
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
