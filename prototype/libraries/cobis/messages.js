define(['require'], function (require) {
    'use strict';

    var kendo = require('kendo');

    return {
        alert: function (message, title, buttonName) {
            var deferred = $.Deferred(),
                title = title || 'Mensaje';
            if (typeof Cordova !== "undefined") {
                navigator.notification.alert(message, function (r) {
                    deferred.resolve();
                }, title, buttonName);
            } else {
                // create modal window on the fly
                var dialog = $('<div class="cb-has-controlbar" style="padding-left: 60px;" />').kendoWindow({
                        actions: [],
                        modal: true,
                        title: title,
                        width: '300px',
                        resizable: false
                    }).getKendoWindow(),
                    buttonName = buttonName || 'Aceptar',
                    random = Math.floor(Math.random() * 1000) + 1;

                // set the content
                dialog.content('<span class="glyphicon glyphicon-info-sign text-info" style="font-size: 32px; position: absolute; margin-left: -40px; margin-top: 20px;"></span>' + message + '<div class="cb-form-controlbar"><button id="messages-alert-close-' + random + '" class="btn btn-primary">' + buttonName + '</button></div>');

                // center it and open it
                dialog.center().open();

                $('#messages-alert-close-' + random).on('click', function () {
                    deferred.resolve();
                    dialog.destroy();
                });
            }
            return deferred.promise();
        },
        prompt: function (message, title, defaultText, buttonLabels) {
            var deferred = $.Deferred(),
                defaultText = defaultText || '',
                buttonLabels = buttonLabels || ['Cancelar', 'Aceptar'],
                title = title || 'Mensaje';
            if (typeof Cordova !== "undefined") {
                navigator.notification.prompt(message, function (r) {
                    deferred.resolve({
                        input: r.input1,
                        buttonIndex: r.buttonIndex
                    });
                }, title, buttonLabels, defaultText);
            } else {
                // create modal window on the fly
                var dialog = $('<div class="cb-has-controlbar" />').kendoWindow({
                        actions: [],
                        modal: true,
                        title: title,
                        width: '300px',
                        resizable: false
                    }).getKendoWindow(),
                    random = Math.floor(Math.random() * 1000) + 1;

                //set buttons
                var buttons = [];
                $.each(buttonLabels, function (index) {
                    var buttonType = buttonLabels.length == index + 1 ? 'btn-primary' : 'btn-default';
                    buttons.push('<button class="messages-prompt-close-' + random + ' btn ' + buttonType + '">' + this + '</button>');
                })

                // set the content
                dialog.content('<div class="form-group" style="margin:0;"><div class="control-label">'+message+'</div><input id="messages-prompt-input-' + random + '" type="text" class="form-control" value="' + defaultText + '" /></div><div class="cb-form-controlbar btn-toolbar">' + buttons.join('') + '</div>');

                // center it and open it
                dialog.center().open();

                $('.messages-prompt-close-' + random).on('click', function () {
                    deferred.resolve({
                        input: $('#messages-prompt-input-' + random).val(),
                        buttonIndex: $(this).index()
                    });
                    dialog.destroy();
                });
            }
            return deferred.promise();
        },
        confirm: function (message, title, buttonLabels) {
            var deferred = $.Deferred(),
                buttonLabels = buttonLabels || ['Cancelar', 'Aceptar'],
                title = title || 'Mensaje';
            if (typeof Cordova !== "undefined") {
                navigator.notification.confirm(message, function (index) {
                    deferred.resolve(index);
                }, title, buttonLabels);
            } else {
                // create modal window on the fly
                var dialog = $('<div class="cb-has-controlbar" style="padding-left: 60px;" />').kendoWindow({
                        actions: [],
                        modal: true,
                        title: title,
                        width: '300px',
                        resizable: false
                    }).getKendoWindow(),
                    random = Math.floor(Math.random() * 1000) + 1;

                //set buttons
                var buttons = [];
                $.each(buttonLabels, function (index) {
                    var buttonType = buttonLabels.length == index + 1 ? 'btn-primary' : 'btn-default';
                    buttons.push('<button class="messages-prompt-close-' + random + ' btn ' + buttonType + '">' + this + '</button>');
                })

                // set the content
                dialog.content('<span class="glyphicon glyphicon-info-sign text-info" style="font-size: 32px; position: absolute; margin-left: -40px; margin-top: 20px;"></span>' + message + '<div class="cb-form-controlbar btn-toolbar">' + buttons.join('') + '</div>');

                // center it and open it
                dialog.center().open();

                $('.messages-prompt-close-' + random).on('click', function () {
                    deferred.resolve({
                        buttonIndex: $(this).index()
                    });
                    dialog.destroy();
                });
            }
            return deferred.promise();
        },
        loading: function(show, options){
            //TODO: options
            if (show) {
				$('body').append('<div class="cb-view-loading"><div class="cb-view-loading-icon"></div></div>');
			}else{
				$('body > .cb-view-loading').fadeOut(function(){
					$(this).remove();
				});
			}
        }/*,
        notifier: kiui.notifier()*/
    };
});