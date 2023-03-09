<!DOCTYPE html>
<#include init />
<html class="${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}">
<head>
    <!-- v-1.0 build 2 -->
	<title>${the_title} - ${company_name}</title>
	<meta content="initial-scale=1.0, width=device-width" name="viewport" />
    <@liferay_util["include"] page=top_head_include />
    <script>
        var homepage = '/group/${site_url}/home';
    </script>
</head>
<body class="${css_class}">
<link href="${css_folder}/theme.css" rel="stylesheet" type = "text/css" />
<link href="${css_folder}/help.css" rel="stylesheet" type = "text/css" />
<style>
    body {
        background-color: ${background_color};
    }
    a {
        color: ${link_color};
    }
    a:hover, a:focus {
        color: ${link_color};
    }
    .btn.btn-default {
        border-color: ${selection_color};
        color: ${selection_color};
    }
    .btn.btn-primary {
        background-color: ${selection_color};
        border-color: ${selection_color};
        color: #FFF;
    }
	#navigation > .wf-content .list-group > .wf-navigation-wrapper,
    #navigation > .wf-content .wf-inbox, 
    #navigation > .wf-content .wf-navigation-wrapper {
        background-color: ${navigation_background_color};
    }
    #navigation > .wf-content .list-group > .list-group-heading {
        color: ${navigation_heading_color};
    }
    #navigation > .wf-content > .list-group a:hover,
    #navigation > .wf-content .btn-link:hover {
        background-color: ${selection_color};
    }
	.wf-view .wf-toolbar.wf-toolbar-top,
    #navigation > .wf-content .list-group > .wf-logo {
        background-color: ${logo_background_color};
    }
    .wf-title, h1, h2, h3, h4, h5, h6 {
        color: ${heading_color};
    }
</style>
<@liferay_ui["quick-access"] contentId="#main-content" />
<@liferay.control_menu />
<div id="shell" class="wf-view">
	<div class="wf-content wf-fixed-top">
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
    <div class="wf-toolbar wf-toolbar-top">
        <div class="wf-actions wf-actions-navigation">
            <button type="button" title="Menu" data-action="toggle-navigation"><span class="wf-icon-bars"><span class="wf-icon-middle"></span></span>
            </button>
        </div>
        <div class="wf-grow hidden-xs">&nbsp;</div>
        <div class="wf-actions wf-search-box wf-grow-sm-down">
            <#assign VOID = freeMarkerPortletPreferences.setValue("portletSetupPortletDecoratorId", "barebone")>
            <@liferay_portlet["runtime"] portletName="com_liferay_journal_content_search_web_portlet_JournalContentSearchPortlet"  defaultPreferences="${freeMarkerPortletPreferences}" />
            ${freeMarkerPortletPreferences.reset()}
        </div>
    </div>
    <div class="wf-breadcrumb wf-flex wf-middle">
        <@liferay.breadcrumbs />
    </div>
</div>
<#include "${full_templates_path}/navigation.ftl" />
<@liferay_util["include"] page=body_bottom_include />
<@liferay_util["include"] page=bottom_include />
<!-- inject:js -->
<!-- endinject -->
</body>
</html>