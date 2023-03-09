var requireConfig = {
  waitSeconds: 60,
  paths: {
    'angular': 'angular/angular.min',
    'angular-mocks': 'angular/angular-mocks',
    'angular-resource': 'angular/angular-resource.min',
    'angular-route': 'angular/angular-route.min',
    'angular-animate': 'angular/angular-animate.min',
    'bootstrap': 'bootstrap/dist/js/bootstrap.min',
    'cobis': 'cobis',
    'jquery': 'jquery/dist/jquery.min',
    //'jquery': 'https://code.jquery.com/jquery-1.9.1.min',
    'jquery.validate': 'jquery.validate/jquery.validate.min',
    //'kendo': 'http://kendo.cdn.telerik.com/2015.3.1111/js/kendo.all.min',
    //'kendo-angular': 'kendoui.2018.2.620.core/js/kendo.angular.min',
    'kendo': 'kendo-2015.1.429/js/kendo.all.min',
    //'kendo': 'http://kendo.cdn.telerik.com/2015.3.1111/js/kendo.all.min',
    //'kendo': 'https://kendo.cdn.telerik.com/2018.2.620/js/kendo.all.min',
    //'kendo': 'http://kendo.cdn.telerik.com/2016.1.406/js/kendo.all.min',
    //'kendo.cultures': 'https://kendo.cdn.telerik.com/2018.2.620/js/cultures',
    'kendo.cultures': 'kendo-2015.1.429/js/cultures',
    //'kendo.cultures': 'kendoui.2018.2.620.core/js/cultures',
    'kendo.lang': 'kendo/js/lang',
    'kiui': 'kiui/kiui-0.0.5',
    'misc': 'misc',
    'text': 'require/text',
    'urijs': 'urijs'
  },
  shim: {
    'angular': {
      'exports': 'angular',
      deps: ['jquery']
    },
    'angular-resource': ['angular'],
    'angular-route': ['angular'],
    'angular-mocks': ['angular'],
    'angular-animate': ['angular'],
    'bootstrap': ['jquery'],
    'kendo': {
      'exports': 'kendo',
      deps: ['angular', 'jquery']
    },
    /*
    'kendo-angular': {
      deps: ["kendo", "angular"]
    },
    */
    'kiui': ['kendo'],
    'cobis/messages': ['kendo'],
    'jquery.validate': ['jquery'],
    'misc/json-formatter.min': ['angular'],
    'misc/dropzone': ['jquery']
  }
};
if (librariesUrl) {
  for (var key in requireConfig.paths) {
    if (requireConfig.paths[key].indexOf('http://') == -1 && requireConfig.paths[key].indexOf('https://') == -1) {
      requireConfig.paths[key] = librariesUrl + requireConfig.paths[key];
    }
  }
}
