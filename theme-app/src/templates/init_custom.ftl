<#assign 
    has_dashboards = propsUtil.get("cobis.container.dashboards")=="true"
    portrait_url = user.getPortraitURL(themeDisplay)
    roles = user.getRoles()
    has_notifications = false
    site_url = (site_url)!"customers"
    background_color = propsUtil.get("cobis.theme.background.color")
    heading_color = propsUtil.get("cobis.theme.heading.color")
    link_color = propsUtil.get("cobis.theme.link.color")
    selection_color = propsUtil.get("cobis.theme.selection.color")
    logo_background_color = propsUtil.get("cobis.theme.logo.background.color")
    navigation_background_color = propsUtil.get("cobis.theme.navigation.background.color")
    navigation_heading_color = propsUtil.get("cobis.theme.navigation.heading.color")
/>
<#-- 
    has_dashboards = propsUtil.get("cobis.container.dashboards")=="true"
    portrait_url = user.getPortraitURL(themeDisplay)
    roles = user.getRoles()
    has_notifications = false
    site_url = (site_url)!"customers"
    background_color = themeDisplay.getThemeSetting('background-color')
    heading_color = themeDisplay.getThemeSetting('heading-color')
    link_color = themeDisplay.getThemeSetting('link-color')
    selection_color = themeDisplay.getThemeSetting('selection-color')
    logo_background_color = themeDisplay.getThemeSetting('logo-background-color')
    navigation_background_color = themeDisplay.getThemeSetting('navigation-background-color')
    navigation_heading_color = themeDisplay.getThemeSetting('navigation-heading-color')    
-->
<#assign is_admin = false />
<#list roles as role>
    <#if role.name == "Administrator">
        <#assign 
            is_admin = true
        />
    </#if>
    <#if role.name == "MainStreet Basic Officer">
        <#assign 
            homepage_url = "/group/tower/home"
        />
    </#if>
</#list>
<#if !is_admin>
    <#assign 
        css_class = css_class + " wf-not-admin"
    />
</#if>
<#if allowAddPortlets>
    <#assign 
        css_class = css_class + " wf-add-portlets"
    />
</#if>
<#if is_signed_in && is_setup_complete>
    <#assign 
        css_class = css_class + " wf-navigation-docked"
    />
</#if>
<#if is_signed_in && isCustomerUser>
    <#assign
        help_url = "/web/customer-help"
    />
<#else>
    <#assign
        help_url = "/web/bank-help"
    />
</#if>
<#if navItemsUserPersonaleSite??>
	<#assign nav_items_personal = navItemsUserPersonaleSite />
	<#assign has_personal_navigation = (nav_items_personal?size > 0) />
</#if>

<#if lastUserNotificationEvents??>
	<#assign notification_items = lastUserNotificationEvents />
	<#assign has_notifications = (notification_items?size > 0) />
    <#assign num_notifications = numNotifications />
</#if>