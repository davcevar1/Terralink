<!DOCTYPE html>
<#include init />
<html class="${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}">
<head>
	<title>${the_title} - ${company_name}</title>
	<meta content="initial-scale=1.0, width=device-width, user-scalable=no" name="viewport" />
    <@liferay_util["include"] page=top_head_include />
    <script>
        var homepage = '/group/${site_url}/home';
    </script>
</head>
<body class="${css_class}">
<link href="${css_folder}/theme.css" rel="stylesheet" type = "text/css" />
<style>
    body.wf-shell {
        background-color: ${background_color};
    }
    body a,
    body a:hover,
    body a:focus,
    body .btn.btn-link,
    body .wf-list-group > .ui-paginator a {
        color: ${link_color};
    }
    body .btn.btn-default,
	body .btn.btn-default:hover,
	body .btn.btn-default:focus,
	body .btn.btn-default:active {
        border-color: ${selection_color};
        color: ${selection_color};
    }
    body .btn.btn-primary,
	body .btn.btn-primary:hover,
	body .btn.btn-primary:focus,
	body .btn.btn-primary:active {
        background-color: ${selection_color};
        border-color: ${selection_color};
        color: #FFF;
    }
    body #navigation > .wf-content .wf-inbox,
    body #navigation > .wf-content .wf-navigation-wrapper {
        background-color: ${navigation_background_color};
    }
    body #navigation > .wf-content .list-group > .list-group-heading {
        color: ${navigation_heading_color};
    }
    body .wf-list-group .list-group-item.active,
    body .wf-list-group .list-group-item.active:hover,
    body .list-group .list-group-item.active,
    body .list-group .list-group-item.active:hover,
    body .dropdown-menu > li > a:hover,
    body .dropdown-menu > li > a:focus,
    body .dropdown-menu > li > a:active,
    body .list-group a.list-group-item:hover,
    body .list-group a.list-group-item:focus,
    body .list-group a.list-group-item.active,
    body #navigation > .wf-content > .list-group a:hover,
    body #navigation > .wf-content .btn-link:hover {
        border-color: ${selection_color};
        background-color: ${selection_color};
        color: #FFF;
    }
    body .wf-page-header,
    body #navigation > .wf-content .list-group > .wf-logo {
        background-color: ${logo_background_color};
    }
    body .wf-title, h1, h2, h3, h4, h5, h6, .wf-welcome .wf-icon {
        color: ${heading_color};
    }
    body .wf-page-header > .wf-logo {
        background-image: url(${site_logo});
    }
	body .wf-steps-2 > li {
        background: #f5f5f5;
        border: 1px solid #CCC;
        color: #CCC;
    }
    body .wf-steps-2 > li::before {
        background: #f5f5f5;
    }
    body .wf-steps-2 > li.active {
        background: #FFF;
        border-color: ${selection_color};
        color: ${selection_color};
    }
    body .wf-steps-2 > li.active::before {
        background: #FFF;
        border-color: ${selection_color};
    }
	body .wf-steps-2 > li.current {
		background: ${selection_color};
		border-color: ${selection_color};
	}
	body .wf-steps-2 > li.current::before {
		background: ${selection_color} !important;
		border-color: ${selection_color};
	}
	body .wf-steps-2 > li.current a {
		color: #FFF;
	}
    #home-banner-overlay-content {
        background: ${heading_color};
    }
</style>
<@liferay_ui["quick-access"] contentId="#main-content" />
<@liferay.control_menu />
<div id="shell" class="wf-view">
	<div class="wf-content <#if is_signed_in>wf-fixed-top</#if>">
        <@liferay_util["include"] page=body_top_include />
        <#if selectable>
			<@liferay_util["include"] page=content_include />
		<#else>
			${portletDisplay.recycle()}
			${portletDisplay.setTitle(the_title)}
			<@liferay_theme["wrap-portlet"] page="portlet.ftl">
				<@liferay_util["include"] page=content_include />
			</@>
		</#if>
	</div>
    <#if is_signed_in>
        <div class="wf-toolbar wf-toolbar-top">
            <#if has_navigation && is_setup_complete && is_signed_in>
                <div class="wf-actions wf-actions-navigation">
                    <button type="button" title="Menu" data-action="toggle-navigation"><span class="wf-icon-bars"><span class="wf-icon-middle"></span></span></button>
                </div>
            </#if>
            <div class="wf-title">
                ${the_title}
            </div>
            <#if organization_logo_id!=0 >
                <div class="small text-muted hidden-xs" style="margin-right:10px;">${res["customized-for"]}</div>
                <div><img src="/image/layout_set_logo?img_id=${organization_logo_id}" style="max-height:40px; margin-right:15px;" /></div>
            </#if>
            <#if help_tags?size != 0>
                <div class="wf-actions">
                    <div class="dropdown">
                        <button class="btn btn-default" data-toggle="dropdown"><span class="fa fa-question-circle"></span></button>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li class="dropdown-header">${res["related-help-topics"]}</li>
                            <#list help_tags as help_tag>
                                <li><a href="${help_tag.url}" target="_blank">${help_tag.tag}</a></li>
                            </#list>
                        </ul>
                    </div>
                </div>
            </#if>
        </div>
    </#if>
</div>
<#if is_setup_complete && is_signed_in>
    <#include "${full_templates_path}/navigation.ftl" />
</#if>
<@liferay_util["include"] page=body_bottom_include />

<#if is_signed_in>
    <div id="help" class="modal fade" style="display:none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" style="margin: 0; font-size: 22px;">${res["help-and-support"]}</h4>
                    <p class="text-center">${res["question-and-answers"]}</p>
                    <form class="text-center" action="${help_url}/user-guide/-/web_content_search/search" target="_blank">
                        <div class="input-group" style="max-width:400px; margin:auto;">
                            <input type="text" class="form-control" name="_com_liferay_journal_content_search_web_portlet_JournalContentSearchPortlet_keywords" placeholder="${res["type-keyword"]}" />
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-default" title="<@liferay.language key="search" />"><span class="fa fa-search"></span></button>
                            </span>
                        </div>
                    </form>
                </div>
                <div class="modal-body" style="padding:30px;">
                    <div class="wf-flex-sm-up wf-gutters">
                        <div class="wf-flex wf-gutters wf-grow" style="margin-bottom:15px;">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="wf-icon" style="width:32px; height:32px;">
                                    <use xlink:href="/documents/20160/58426/icons.svg#book" />
                                </svg>
                            </div>
                            <div>
                                <h3 style="margin:0; font-size:20px;">${res["user-guide"]}</h3>
                                <p>${res["user-guide-description"]}</p>
                                <a href="${help_url}/user-guide" target="_blank" style="font-weight:bold;">${res["learn-more"]}</a>
                            </div>
                        </div>
                        <div class="wf-flex wf-gutters wf-grow" style="margin-bottom:30px;">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="wf-icon" style="width:32px; height:32px;">
                                    <use xlink:href="/documents/20160/58426/icons.svg#questions" />
                                </svg>
                            </div>
                            <div>
                                <h3 style="margin:0; font-size:20px;">${res["frequently-asked-questions"]}</h3>
                                <p>${res["frequently-asked-questions-description"]}</p>
                                <a href="${help_url}/faqs" target="_blank" style="font-weight:bold;">${res["learn-more"]}</a>
                            </div>
                        </div>
                    </div>
                    <div class="wf-flex-sm-up wf-gutters">
                        <div class="wf-flex wf-gutters wf-grow" style="margin-bottom:30px;">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="wf-icon" style="width:32px; height:32px;">
                                    <use xlink:href="/documents/20160/58426/icons.svg#email" />
                                </svg>
                            </div>
                            <div>
                                <h3 style="margin:0; font-size:20px;">${res["email"]}</h3>
                                <p>${res["have-question"]}<br />${res["mail-to"]} <strong><a href="mailto:support@mainstreet.com">support@mainstreet.com</a></strong> ${res["we-contact-you"]}</p>
                            </div>
                        </div>
                        <#--
                        <div class="wf-flex wf-gutters wf-grow" style="margin-bottom:30px;">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="wf-icon" style="width:32px; height:32px;">
                                    <use xlink:href="/documents/20160/58426/icons.svg#phone-circle" />
                                </svg>
                            </div>
                            <div>
                                <h3 style="margin:0; font-size:20px;">Call Us</h3>
                                <p>If you are on US call us to<br /> <strong>(908) 236 5478</strong>.</p>
                            </div>
                        </div>
                        -->
                    </div>
										<hr />
										<div class="text-center">
											<div style="font-size:16px;"><strong>${product}</strong> version: ${version}</div>
											<div class="small text-muted">Commit: ${commit}</div>
										</div> 
								</div>
            </div>
        </div>
    </div>
</#if>

<@liferay_util["include"] page=bottom_include />
<!-- inject:js -->
<!-- endinject -->
</body>
</html>
