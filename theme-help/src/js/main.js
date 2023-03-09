AUI().ready(

    /*
    This function gets loaded when all the HTML, not including the portlets, is
    loaded.
    */

    function () {
        if (!window.eventsMapped) {
            if (typeof window.ontouchstart != 'undefined') {
                $('body').addClass('wf-touch-enabled');
            }
            //Acciones generales del contenedor
            $(document).on('click', '[data-action]', function (e) {
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
                        if (window.confirm('Esta seguro que quiere eliminar el dashboard seleccionado?')) {
                            Liferay.Service(
                                '/adminprovisionmainstreet.adminmainstreet/delete-dashboard', {
                                    pageName: $self.data('pageName'),
                                    pageId: $self.data('pageId')
                                },
                                function (obj) {
                                    if (obj == 'success') {
                                        if ($link.attr('href') == location.href) {
                                            var firstDashboardUrl = $('#dashboards').find('a:first').attr('href'),
                                                secondDashboardUrl = $('#dashboards').find('a:nth-child(2)').attr('href');
                                            if (firstDashboardUrl && location.href != firstDashboardUrl) {
                                                Liferay.SPA.app.navigate(firstDashboardUrl);
                                            } else if (secondDashboardUrl && location.href != secondDashboardUrl) {
                                                Liferay.SPA.app.navigate(secondDashboardUrl);
                                            } else {
                                                Liferay.SPA.app.navigate(homepage);
                                            }
                                        } else {
                                            Liferay.SPA.app.navigate(location.href);
                                        }
                                    } else {
                                        alert(obj);
                                    }
                                }
                            );
                        }
                        break;
                }
            });
            //Boton de navegacion cuando sidebar esta colapsado
            $(document).on('click', '[id$="__null__null"][href="javascript://"]', function (e) {
                e.preventDefault();
                $('body').toggleClass('wf-navigation');
            });
            //Reposiciona dropdowns para que se muestren arriba o abajo del boton dependiendo de la posicion de la pantalla
            $(window).on('load resize scroll touchstart touchmove mousewheel', function () {
                $(".dropdown-toggle").each(function () {
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
            window.eventsMapped = true;
            //Reposiciona pantalla para que el campo con foco siempre este en el centro de la pantalla
            $(document).on('focus', ':input', function () {
                var center = $(window).height() / 2;
                var top = $(this).offset().top;
                if (top > center) {
                    $('html, body').animate({
                        scrollTop: top - center
                    }, 'fast');
                }
            });
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
