require.config(requireConfig);
define(function(require) {
  'use strict';
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  // Importaci&oacute;n no son m&oacute;dulos
  require('bootstrap');
  require('cobis/ValidateLayout');
  require('misc/json-formatter.min');
  require('misc/dropzone');
  window.format = {
    date: function(date) {
      if (date) {
        return (date.Year ? date.Year + '-' : '') + (date.Month ? date.Month + '-' : '') + (date.Day ? date.Day : '');
      } else {
        return '';
      }
    },
    name: function(name) {
      if (name) {
        if (name.CompanyName) {
          return name.CompanyName;
        }
        return (name.Prefix || '') + ' ' + name.First + ' ' + name.Middle + ' ' + name.Last + ' ' + (name.Suffix || '');
      } else {
        return '';
      }
    },
    address: function(address) {
      var formatted = [];
      if (address) {
        if (address.StreetAddress1) formatted.push(address.StreetAddress1);
        if (address.StreetAddress2) formatted.push(address.StreetAddress2);
        if (address.City) formatted.push(address.City);
        if (address.State) formatted.push(address.State + ' ' + (address.Zip5 || ''));
        return formatted.join(', ');
      } else {
        return "";
      }
    },
    phone: function(phone) {
      if (phone) {
        return (phone.Phone10 ? phone.Phone10 + ' (Phone)' : '') + ' - ' + (phone.Fax ? phone.Fax + ' (Fax)' : '') + ' ' + (phone.TimeZone ? phone.TimeZone + ' (Timezone)' : '');
      } else {
        return '';
      }
    },
    field: function(value, label) {
      var response = '';
      if (value && value.length > 0) {
        var labelPlaceholder = label && label.length > 0 ? '<span style="font-weight:bold;">' + label + ':</span>' : '';
        response = '<div>' + labelPlaceholder + ' ' + value + '</div>';
      }
      return response;
    },
    boolean: function(value) {
      var formatted = '';
      if (value === true) {
        formatted = 'Yes';
      } else if (value === false) {
        formatted = 'No'
      }
      return formatted;
    },
    getArray: function(value, child) {
      return value[child].length > 0 && typeof value[child] != 'string' ? value[child] : [value[child]];
    }
  }
  var app = angular.module('app', ['kendo.directives', 'jsonFormatter'])
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
    .controller('controller', ['$scope', '$http', '$q', '$timeout', '$location', '$sce', '$interval',
      function($scope, $http, $q, $timeout, $location, $sce, $interval) {
        var PMT = function(ir, np, pv, fv, type) {
          /*
           * ir   - interest rate per month
           * np   - number of periods (months)
           * pv   - present value
           * fv   - future value
           * type - when the payments are due:
           *        0: end of the period, e.g. end of month (default)
           *        1: beginning of period
           */
          var pmt, pvif;

          fv || (fv = 0);
          type || (type = 0);

          if (ir === 0)
            return -(pv + fv) / np;

          pvif = Math.pow(1 + ir, np);
          pmt = -ir * pv * (pvif + fv) / (pvif - 1);

          if (type === 1)
            pmt /= (1 + ir);

          return pmt;
        }

        $scope.activate = function() {
          if (location.search) {
            $scope.step = location.search.split('=')[1];
          }
          if ($scope.step >= 11) {
            $scope.document = {
              status: 'A'
            };
          }
          if ([1, 3, 5, 7, 9].indexOf(Number($scope.step)) > -1) {
            $scope.title = 'Validate Manually';
          } else if (Number($scope.step) == 2) {
            $scope.title = 'Retry OFAC Manually';
          } else if (Number($scope.step) == 4) {
            $scope.title = 'Retry Credit Score Manually';
          } else if (Number($scope.step) == 6) {
            $scope.title = 'Retry Paydex Score Manually';
          } else if (Number($scope.step) == 8) {
            $scope.title = 'Retry Lexis Nexis Manually';
          } else if (Number($scope.step) == 9.5) {
            $scope.title = 'Global Validation';
          } else if (Number($scope.step) == 10) {
            $scope.title = 'Check Information';
          } else if (Number($scope.step) == 11) {
            $scope.title = 'Review & Approve Loan';
          } else if (Number($scope.step) == 12) {
            $scope.title = 'User Acceptance';
          } else if (Number($scope.step) == 13) {
            $scope.title = 'Generate Loan Documents';
          } else if (Number($scope.step) == 14) {
            $scope.title = 'Schedule Closing';
          } else if (Number($scope.step) == 15) {
            $scope.title = 'Close Loan';
          } else if (Number($scope.step) == 16) {
            $scope.title = 'Loan Booking';
          }
          $scope.format = format;
          $http.get('mocks/ofac.json')
            .then(function(response) {
              $scope.ofac = response.data["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["OSIOFAC.SEARCHRESULTSResponse"]["Searchresultsrs"]["Results"]["Results_Type.ResultsItem"];
            });
          $http.get('mocks/paydex-3.json')
            .then(function(response) {
              $scope.paydex = response.data;
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
          $http.get('mocks/ReportDetails_4Y9RMX.json')
            .then(function(response) {
              var data = response.data.ArrayOfReportDetail4.ReportDetail4.map((account) => {
                if (account.AccountExpenses) {
                  account.AccountExpenses.others = {
                    Amount: 0,
                    Percent: 0
                  };
                  account.AccountExpenses.AccountExpense4.sort(function(a, b) {
                    return parseFloat(b.Amount) - parseFloat(a.Amount);
                  });
                  account.AccountExpenses.AccountExpense4 = account.AccountExpenses.AccountExpense4.map((record, i) => {
                    record.Amount = Number(record.Amount);
                    record.Percent = Number(record.Percent);
                    if (i > 6) {
                      account.AccountExpenses.others.Amount += record.Amount;
                      account.AccountExpenses.others.Percent += record.Percent;
                    }
                    return record;
                  });
                }
                return account;
              });
              $scope.decisionLogic = data;
            });
          Dropzone.autoDiscover = false;
          $(".dropzone").dropzone({
            url: "http://localhost",
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
        };
        $scope.decisionLogic = {};
        $scope.decisionLogicSummary = {
          debits: 8808.68,
          credits: 8343.18
        };
        $scope.decisionLogicBalance = $scope.decisionLogicSummary.credits - $scope.decisionLogicSummary.debits;
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
        $scope.getADSA = function(amount, term, rate) {
          var paymentsPerYear = 12;
          $scope.adsa = PMT((rate / 100) / paymentsPerYear, term, -amount) * paymentsPerYear;
          return $scope.adsa;
        }
        $scope.getSSN = function(value) {
          if (!$scope.clearSSN) {
            return 'XXX-XX-X' + value.substr(value.length - 3);
          } else {
            return value;
          }
        }
        $scope.getNOI = function(revenues, expenses) {
          $scope.noi = revenues - expenses;
          return $scope.noi;
        };
        $scope.getDSCR = function(noi, adsa) {
          return noi / adsa;
        }
        $scope.request = {
          amount: 50000,
          term: (5 * 12),
          rate: 6.75,
          expenses: 100000,
          revenues: 500000
        };
        $scope.openDocument = function() {
          $('#docs-confirm').modal();
        };
        $scope.openViewer = function() {
          $('#docs-confirm').modal('hide');
          $('#viewer').modal();
        }
        $scope.owners = {
          dataSource: {
            transport: {
              read: {
                url: "mocks/owners.json",
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
              title: "Last Name"
            },
            {
              field: "firstName",
              title: "First Name"
            },
            {
              field: "middleName",
              title: "Middle Name"
            },
            {
              field: "scn",
              title: "Social Security Number"
            },
            {
              field: "ownership",
              title: "Ownership %"
            }
          ]
        };
        $scope.humanFileSize = function(size) {
            var i = Math.floor( Math.log(size) / Math.log(1000) );
            return ( size / Math.pow(1000, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        };
        $scope.showUpload = function(e) {
          e.stopPropagation();
          $('#uploading').modal();
        };
        $scope.filesUpload = {
          step: 1,
          error: false,
          count: 0,
          processed: 0,
          success: 0,
          files: []
        };
        $scope.uploadFiles = function() {
          var dropzones = $('.dropzone').map(function() {
            return Dropzone.forElement(this);
          }).toArray();
          $scope.filesUpload.files = [];
          dropzones.forEach(function(dropzone, dropzoneIndex) {
            $scope.filesUpload.count += dropzone.files.length;
            $scope.filesUpload.files = $scope.filesUpload.files.concat(dropzone.files);
          });
          $scope.simulateUpload();
        }
        $scope.simulateUpload = function() {
          $scope.filesUpload.step = 2;
          var interval = $interval(function() {
            $scope.filesUpload.files.forEach(function(file) {
                var status = Math.floor(Math.random() * 6) + 1,
                    progress = file.progress? (Math.floor(Math.random() * 6) + 1)+Number(file.progress) : 1;
                if (progress<100) {
                  file.progress = progress;
                }else if (!file.processed) {
                  $scope.filesUpload.processed++;
                  file.progress = 100;
                  file.processed = true;
                  if (status>5) {
                    file.error = true;
                  }else{
                    file.error = false;
                    $scope.filesUpload.success++;
                  }
                }
            });
            if ($scope.filesUpload.processed>=$scope.filesUpload.count) {
              $interval.cancel(interval);
              $scope.filesUpload.step = 1;
              $scope.docModal.upload = null;
              if ($scope.filesUpload.processed==$scope.filesUpload.success) {
                $scope.filesUpload.error = false;
              }else{
                $scope.filesUpload.error = true;
              }
            }
          }, 200);
        }
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
