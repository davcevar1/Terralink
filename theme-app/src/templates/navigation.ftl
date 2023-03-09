<script>
    var options = [];
    <#list nav_items as nav_item>
        <#assign children = nav_item.getChildren() />
        <#if !nav_item.hasChildren()>
            options.push({label: '${nav_item.getName()}', url:'${nav_item.getURL()}'});
        <#else>
            <#list children as nav_child>
                options.push({label: '${nav_child.getName()}', url:'${nav_child.getURL()}'});
            </#list>
        </#if>
    </#list>
</script>
<nav id="navigation">
    <div class="wf-overlay" data-action="toggle-navigation"></div>
    <div class="wf-content">
        <div class="list-group wf-menu-0">
            <div class="wf-logo wf-flex wf-middle wf-center">
                <a class="${logo_css_class}" href="/group/${site_url}/home" title="<@liferay.language_format arguments="${site_name}" key="go-to-x" />">
                    <img src="${site_logo}" alt="${logo_description}" />
                </a>
            </div>
            <div class="wf-inbox wf-flex wf-center">
                <div class="btn-group dropup">
                    <button class="btn btn-link" data-toggle="dropdown">
                        <span class="fa fa-inbox"></span> <span class="wf-label" style="display:inline-block; margin-right:5px;"><@liferay.language key="notifications" /></span>
                        <#if has_notifications>
                            <span class="badge" style="color:#1c62b7; background:#FFF;">${num_notifications}</span>
                        </#if>
                    </button>
                    <#if has_notifications>
                        <ul id="notifications-bottom" class="dropdown-menu notification-menu" style="min-width:320px; margin-right: 2px; margin-top: 2px;">
                            <#list notification_items as notification_item>
                                <#assign
                                    notification_item_payload = notification_item.getPayload()
                                    notification_item_data = notification_item_payload?eval
                                    notification_item_timestamp = notification_item.getTimestamp()
                                />
                                <li>
                                    <a href="/group/${site_url}/inbox">
                                        <div title="${notification_item_data.status}">${notification_item_data.title}</div>
                                        <div class="small text-muted">${notification_item_timestamp?number_to_date?string(userFormatDate)}</div>
                                    </a>
                                </li>
                            </#list>
                            <li class="divider"></li>
                            <li class="text-center"><a href="/group/${site_url}/notifications"><span class="fa fa-inbox"></span> <@liferay.language key="view-all" /></a>
                            </li>
                        </ul>
                    </#if>    
                </div>
            </div>
            <div class="wf-navigation-wrapper">
                <div id="user-btn" class="collapse in">
                    <div class="wf-user-btn">
                        <div class="wf-avatar" style="background-image:url(${portrait_url});"></div>
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#user-menu">
                            <span class="wf-label">${user_name}</span> <span class="fa fa-angle-up"></span>
                        </button>
                    </div>
                </div>
                <div id="user-menu" class="wf-user-menu list-group collapse">
                    <a href="/group/${site_url}/user-settings" class="list-group-item">
                        <div class="wf-flex wf-middle wf-gutters">
                            <div class="fa fa-user"></div> 
                            <div class="wf-grow"><@liferay.language key="my-account" /></div>
                        </div>    
                    </a>
                    <a href="${sign_out_url}" class="list-group-item">
                        <div class="wf-flex wf-middle wf-gutters">
                            <div class="fa fa-sign-out"></div> 
                            <div class="wf-grow"><@liferay.language key="sign-out" /></div>
                        </div>  
                    </a>
                </div>
                <#if has_navigation >
                    <div id="shortcuts" class="collapse in">
                        <div class="wf-flex wf-center" style="margin-top: 10px; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid rgba(0, 0, 0, 0.2);">
                            <a class="btn btn-link" href="/group/${site_url}/home"> 
                                <div class="wf-flex wf-middle wf-gutters-tiny"> 
                                    <span class="fa fa-home"></span>
                                    <div class="wf-label"><@liferay.language key="home" /></div>  
                                </div> 
                            </a>
                            <button class="btn btn-link" data-target="#help" data-toggle="modal">
                                <div class="wf-flex wf-middle wf-gutters-tiny">
                                    <span class="fa fa-question-circle"></span>
                                    <span class="wf-label"><@liferay.language key="help" /></span>
                                </div>    
                            </button>
                        </div>
                    </div>
					<div aria-label="<@liferay.language key="site-pages" />" class="list-group" role="menubar">
						<#if !isProspect && has_dashboards >
							<a href="javascript://" class="list-group-heading" data-toggle="collapse" data-target="#dashboards">
								<div class="wf-flex wf-middle wf-gutters">
									<div class="fa fa-dashboard fa-fw"></div> 
									<div class="wf-grow">${res["dashboards"]}</div>
									<div>
										<button onclick="location.href='/group/${site_url}/managedashboard'; event.stopPropagation();" class="btn btn-link wf-add"><@liferay.language key="add" /></button>
									</div>
									<div><span class="fa fa-angle-down"></span></div>
								</div>    
							</a>
							<div id="dashboards" class="list-group collapse in" style="margin-top:0;">					
								<#list nav_items_personal as nav_item_personal>
									<#assign
										nav_item_attr_has_popup = ""
										nav_item_attr_selected = ""
										nav_item_css_class = ""
										nav_item_layout = nav_item_personal.getLayout()
										nav_item_css_class = "collapse collapsed"
										nav_panel_css_class = ""
									/>
									<#if nav_item_personal.isSelected()>
										<#assign
											nav_item_attr_has_popup = "aria-haspopup='true'"
											nav_item_attr_selected = "aria-selected='true'"
											nav_item_css_class = "collapse"
											nav_panel_css_class = "in"
										/>
									</#if>
									<#assign children = nav_item_personal.getChildren() />
									<#if !nav_item_personal.hasChildren()>
										<a id="layout_${nav_item_personal.getLayoutId()}" class="list-group-item ${nav_item_css_class}" aria-labelledby="layout_${nav_item_personal.getLayoutId()}" ${nav_item_attr_selected} ${nav_item_attr_has_popup} href="${nav_item_personal.getURL()}" ${nav_item_personal.getTarget()} role="menuitem">
											<div class="wf-flex wf-middle wf-gutters">
												<div style="min-width:18px;"><@liferay_theme["layout-icon"] layout=nav_item_layout /></div>
												<div class="wf-grow">${nav_item_personal.getName()}</div>
												<div>
													<button class="wf-close" data-action="delete-dashboard" data-action-message='${res["delete-dashboard"]}' data-page-id="${nav_item_personal.getLayoutId()}" data-page-name="${nav_item_personal.getName()}"><span class="fa fa-times-circle"></span></button>
												</div>
											</div>
										</a>
									<#else>
										<a id="layout_${nav_item_personal.getLayoutId()}" class="list-group-item ${nav_item_css_class}" aria-labelledby="layout_${nav_item_personal.getLayoutId()}" ${nav_item_attr_selected} ${nav_item_attr_has_popup} href="#panel_${nav_item_personal.getLayout().getGroup().getGroupId()}_${nav_item_personal.getLayoutId()}" data-toggle="collapse" ${nav_item_personal.getTarget()} role="menuitem">
											<div class="wf-flex wf-middle wf-gutters">
												<div style="min-width:18px;"><@liferay_theme["layout-icon"] layout=nav_item_layout /></div>
												<div class="wf-grow">${nav_item_personal.getName()}</div>
												<div><span class="wf-has-children fa fa-angle-up"></span></div>
											</div>
										</a>
										<div id="panel_${nav_item_personal.getLayout().getGroup().getGroupId()}_${nav_item_personal.getLayoutId()}" class="wf-submenus list-group collapse ${nav_panel_css_class}" role="menu">
											<#list children as nav_child>
												<#assign
													nav_child_attr_selected = ""
													nav_child_css_class = ""
												/>
												<#if nav_item_personal.isSelected()>
													<#assign
														nav_child_attr_selected = "aria-selected='true'"
														nav_child_css_class = "active"
													/>
												</#if>
												<a ${nav_child_attr_selected} class="list-group-item ${nav_child_css_class}" id="layout_${nav_child.getLayoutId()}" aria-labelledby="layout_${nav_child.getLayoutId()}" href="${nav_child.getURL()}" ${nav_child.getTarget()} role="menuitem">
													<div class="wf-flex wf-middle wf-gutters">
														<div style="min-width:18px;"><@liferay_theme["layout-icon"] layout=nav_item_layout /></div>
														<div class="wf-grow">${nav_child.getName()}</div>
													</div>    
												</a>
											</#list>
										</div>
									</#if>
								</#list>
							</div>
						</#if>
						
                        <#if has_dashboards >
                            <div id="options-header" class="collapse in">
                                <a href="javascript://" class="list-group-heading" data-toggle="collapse" data-target="#options">
                                    <div class="wf-flex wf-middle wf-gutters">
                                        <div class="fa fa-bars fa-fw"></div> 
                                        <div class="wf-grow"><@liferay.language key="options" /></div>
                                        <div>
                                            <button data-action="show-searchbox-options" data-toggle="collapse" data-target="#searchbox-options" class="btn btn-link wf-add collapsed"><@liferay.language key="search" /></button>
                                        </div>
                                        <div><span class="fa fa-angle-down"></span></div>
                                    </div>    
                                </a>
                            </div>    
                        </#if>
                        <div id="searchbox-options" class="collapse">
                            <div class="wf-flex wf-middle" style="margin-bottom:10px;">
                                <div class="fa fa-search fa-fw" style="position: absolute; left: 15px; color: #999999;"></div>
                                <input type="search" autocomplete="off" class="form-control" style="background-color: rgba(255,255,255,.2); border-color: rgba(255,255,255,.2); margin-left: 10px; margin-right: 10px; text-indent: 24px; color:#d2d8e2;" placeholder="Search an option" />
                                <button type="button" data-action="hide-searchbox-options" class="btn btn-link"><span class="fa fa-times fa-fw"></span></button>
                            </div>
                            <div class="wf-search-results list-group" style="display:none; margin-top:0;"></div>
                        </div>
						<div id="options" class="list-group collapse in" style="margin-top:0;">					
							<#list nav_items as nav_item>
								<#assign
									nav_item_attr_has_popup = ""
									nav_item_attr_selected = ""
									nav_item_css_class = ""
									nav_item_layout = nav_item.getLayout()
									nav_item_css_class = "collapse collapsed"
									nav_panel_css_class = ""
								/>
								<#if nav_item.isSelected()>
									<#assign
										nav_item_attr_has_popup = "aria-haspopup='true'"
										nav_item_attr_selected = "aria-selected='true'"
										nav_item_css_class = "collapse"
										nav_panel_css_class = "in"
									/>
								</#if>
								<#assign children = nav_item.getChildren() />
								<#if !nav_item.hasChildren()>
                                    <!--
                                    <a id="layout_${nav_item.getLayoutId()}" class="list-group-item ${nav_item_css_class}" aria-labelledby="layout_${nav_item.getLayoutId()}" ${nav_item_attr_selected} ${nav_item_attr_has_popup} href="${nav_item.getURL()}" ${nav_item.getTarget()} role="menuitem">
										<div class="wf-flex wf-middle wf-gutters">
											<div style="min-width:18px;"><@liferay_theme["layout-icon"] layout=nav_item_layout /></div>
											<div class="wf-grow">${nav_item.getName()}</div>
										</div>
									</a>
                                    -->
								<#else>
									<a id="layout_${nav_item.getLayoutId()}" class="list-group-item ${nav_item_css_class}" aria-labelledby="layout_${nav_item.getLayoutId()}" ${nav_item_attr_selected} ${nav_item_attr_has_popup} href="#panel_${nav_item.getLayout().getGroup().getGroupId()}_${nav_item.getLayoutId()}" data-toggle="collapse" ${nav_item.getTarget()} role="menuitem">
										<div class="wf-flex wf-middle wf-gutters">
											<div style="min-width:18px;"><@liferay_theme["layout-icon"] layout=nav_item_layout /></div>
											<div class="wf-grow">${nav_item.getName()}</div>
											<div><span class="wf-has-children fa fa-angle-up"></span></div>
										</div>
									</a>
									<div id="panel_${nav_item.getLayout().getGroup().getGroupId()}_${nav_item.getLayoutId()}" class="wf-submenus list-group collapse ${nav_panel_css_class}" role="menu">
										<#list children as nav_child>
											<#assign
												nav_child_attr_selected = ""
												nav_child_css_class = ""
											/>
											<#if nav_item.isSelected()>
												<#assign
													nav_child_attr_selected = "aria-selected='true'"
													nav_child_css_class = "active"
												/>
											</#if>
											<a ${nav_child_attr_selected} class="list-group-item ${nav_child_css_class}" id="layout_${nav_child.getLayoutId()}" aria-labelledby="layout_${nav_child.getLayoutId()}" href="${nav_child.getURL()}" ${nav_child.getTarget()} role="menuitem">
												<div class="wf-flex wf-middle wf-gutters">
													<div style="min-width:18px;"><@liferay_theme["layout-icon"] layout=nav_item_layout /></div>
													<div class="wf-grow">${nav_child.getName()}</div>
												</div>
											</a>
										</#list>
									</div>
								</#if>
							</#list>
						</div>	
					</div>
				</#if>	
            </div>
        </div>
    </div>    
</nav>