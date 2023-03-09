<nav id="navigation" class="${nav_css_class}">
    <div class="wf-overlay" data-action="toggle-navigation"></div>
    <div class="wf-content">
        <div class="list-group wf-menu-0">
            <div class="wf-logo wf-flex wf-middle wf-center">
                <a class="${logo_css_class}" href="/group/${site_url}/home" title="<@liferay.language_format arguments="${site_name}" key="go-to-x" />">
                    <img src="${site_logo}" alt="${logo_description}" />
                </a>
            </div>
            <div class="wf-navigation-wrapper">
                <#assign VOID = freeMarkerPortletPreferences.setValue("portletSetupPortletDecoratorId", "barebone")>
                <#assign VOID = freeMarkerPortletPreferences.setValue("displayStyle", "ddmTemplate_LIST-MENU-FTL")>
                <@liferay.navigation_menu default_preferences="${freeMarkerPortletPreferences}" />
                ${freeMarkerPortletPreferences.reset()}
            </div>
        </div>
    </div>    
</nav>