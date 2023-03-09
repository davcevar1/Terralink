AUI().ready(

    /*
    This function gets loaded when all the HTML, not including the portlets, is
    loaded.
    */

    function () {
        if (!window.eventsMapped) {
            var hideSearchboxOptions = function() {
                    $('#user-btn, #shortcuts, #dashboards-header, #options-header').collapse('show'); 
                    $('#options').collapse('show');
                    $('#searchbox-options').collapse('hide');
                    $('#searchbox-options input[type="search"]').val('');
                    $('#searchbox-options .wf-search-results').hide().empty();
                    $('body').removeClass('wf-navigation');
                },
                showSearchboxOptions = function() {
                    $('#user-btn, #user-menu, #shortcuts, #dashboards-header, #dashboards, #options-header').collapse('hide');
                    $('#searchbox-options').collapse('show');
                    $('#searchbox-options input').focus();
                    $('body').addClass('wf-navigation');
                    var osh = JSON.parse(localStorage.getItem('osh'))
                    if (osh.length>0) {
                        var history = osh.map(function(i) {
                            return $('<a href="'+i.url+'" class="list-group-item"><div class="wf-flex wf-middle wf-gutters"><div class="fa fa-clock-o fa-fw"></div><div class="wf-grow">'+i.label+'</div></div></a>').data('item', i);
                        });
                        $('#searchbox-options .wf-search-results').show().html(history);
                        $('#options').collapse('hide');
                    }
                };
            if (typeof window.ontouchstart!='undefined') {
                $('body').addClass('wf-touch-enabled');
            }
            //Acciones generales del contenedor
            $(document)
                .on('click', '[data-action]', function (e) {
                    var $self = $(this),
                        action = $self.data('action');
                    switch (action) {
                        case 'toggle-navigation':
                            e.preventDefault();
                            console.log('ACTION: toggle-navigation');
                            $('body').toggleClass('wf-navigation');
                            break;
                        case 'add-portlet':
                            e.preventDefault();
                            console.log('ACTION: add-portlet');
                            $('.control-menu-icon[data-qa-id="add"]').click();
                            break;
                        case 'delete-dashboard':
                            var $link = $self.closest('a');
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('ACTION: delete-dashboard');
                            if (window.confirm($self.data('action-message'))) {
                                Liferay.Service(
                                    '/adminprovisionmainstreet.adminmainstreet/delete-dashboard', {
                                        pageName: $self.data('pageName'),
                                        pageId: $self.data('pageId')
                                    },
                                    function (obj) {
                                        if (obj=='success') {
                                            if ($link.attr('href')==location.href) {
                                                var firstDashboardUrl = $('#dashboards').find('a:first').attr('href'),
                                                    secondDashboardUrl = $('#dashboards').find('a:nth-child(2)').attr('href');
                                                if (firstDashboardUrl && location.href!=firstDashboardUrl) {
                                                    Liferay.SPA.app.navigate(firstDashboardUrl);
                                                }else if (secondDashboardUrl && location.href!=secondDashboardUrl) {
                                                    Liferay.SPA.app.navigate(secondDashboardUrl);
                                                }else{
                                                    Liferay.SPA.app.navigate(homepage);
                                                }   
                                            }else{
                                                Liferay.SPA.app.navigate(location.href);
                                            }
                                        }else{
                                            alert(obj);
                                        }
                                    }
                                );
                            }
                            break;
                        case 'show-searchbox-options':
                            showSearchboxOptions();
                            e.stopPropagation();
                            break;
                        case 'hide-searchbox-options':
                            hideSearchboxOptions();
                            e.stopPropagation();
                            break;     
                    }
                })
                .on('keyup', function(e){
                    if (document.activeElement == document.body && e.which <= 90 && e.which >= 48 || e.which >= 96 && e.which <= 105) {
                        $('#searchbox-options input[type="search"]').val(e.key);
                        setTimeout(function(){$('#searchbox-options input[type="search"]').trigger('keyup')}, 300);
                        showSearchboxOptions();
                    }
                })
                //Boton de navegacion cuando sidebar esta colapsado
                .on('click', '[id$="__null__null"][href="javascript://"]', function (e) {
                    e.preventDefault();
                    $('body').toggleClass('wf-navigation');
                })
                //Reposiciona pantalla para que el campo con foco siempre este en el centro de la pantalla
                .on('focus', ':input:not(:button, :hidden)', function () {
                    var center = $(window).height() / 2;
                    var top = $(this).offset().top;
                    if (top > center) {
                        $('html, body').animate({
                            scrollTop: top - center
                        }, 'fast');
                    }
                });
            //Reposiciona dropdowns para que se muestren arriba o abajo del boton dependiendo de la posicion de la pantalla
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
            //Eventos para controlar el comportamiento de el buscador de opciones
            $('#searchbox-options .wf-search-results')
                .on('click', 'a', function(e){
                   var item = $(e.currentTarget).data('item');
                    if (localStorage.getItem('osh')) {
                        var osh = JSON.parse(localStorage.getItem('osh')),
                            exists = !osh? false : osh.find(function(i){
                                return i.label==item.label;
                            });
                        if (!exists) {
                            osh.unshift(item);
                        }else{
                            osh = osh.sort(function(a,b){return a.url!=item.url;});
                        }
                        osh = osh.slice(0,5);
                        localStorage.setItem('osh', JSON.stringify(osh));
                    }else{
                        localStorage.setItem('osh', JSON.stringify([item]));
                    }
                    hideSearchboxOptions();
                })
                .on('keydown', 'a', function(e){
                    switch (e.keyCode) {
                        case 38: 
                            if ($(this).prev().length>0) {
                                $(this).prev().focus();
                            }else{
                                $('#searchbox-options input[type="search"]').focus();
                                setTimeout(function(){
                                    $('#searchbox-options input[type="search"]').select();
                                }, 1);
                            }
                            break;
                        case 40:    
                            $(this).next().focus();
                            break;    
                    }
                });
            $('#searchbox-options input[type="search"]')
                .on('keyup', function(e) {
                    if (e.currentTarget.value.length>0) {
                        $('#searchbox-options wf-search-results').hide();
                        $('#options').collapse('hide');
                        var results = options.filter(function(i) {
                            return i.label.toLowerCase().indexOf(e.currentTarget.value)!=-1;
                        }).map(function(i) {
                            return $('<a href="'+i.url+'" class="list-group-item"><div class="wf-flex wf-middle wf-gutters"><div style="min-width:18px;"></div><div class="wf-grow">'+i.label+'</div></div></a>').data('item', i);
                        });
                        $('#searchbox-options .wf-search-results').show().html(results);
                    }else{
                        /*$('#searchbox-options .wf-search-results').hide().empty();*/
                        showSearchboxOptions();
                    }
                })
                .on('keydown', function(e){
                    var $searchResults = $('#searchbox-options .wf-search-results');
                    if (e.keyCode==40 && $searchResults.find('a').length>0) {
                        $searchResults.find('a').first().focus();
                    }else if (e.keyCode==27) {
                        hideSearchboxOptions();
                    }
                });
            window.eventsMapped = true;
        }
    }
);

Liferay.Portlet.ready(

    /*
    This function gets loaded after each and every portlet on the page.

    portletId: the current portlet's id
    node: the Alloy Node object of the current portlet
    */

    function (portletId, node) {}
);

Liferay.on(
    'allPortletsReady',

    /*
    This function gets loaded when everything, including the portlets, is on
    the page.
    */

    function () {}
);