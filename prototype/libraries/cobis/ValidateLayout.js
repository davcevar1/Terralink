var ValidateLayout = function (url) {
    var self = this;
    self.url = url;
    self.validate = function() {
        $.ajax(self.url).then(function (response) {
            var componentsSchema = response.components,
                $components = $('body').children().filter('[class]');
            self.findComponents($components, componentsSchema);
        }, function(h,s,e) {
            console.error(e.toString());
        });
    };
    self.findComponents = function($components, componentsSchema) {
        $.each($components, function () {
            var component = this;
            $.each(component.classList, function () {
                var componentClass = this;
                $.each(componentsSchema, function () {
                    //Valida si es un componente que existe en el schema
                    if ((typeof this.class=='string' && componentClass==this.class) || 
                        ($.inArray(componentClass, this.class)!=-1)) {
                        if (this.children) {
                            self.findComponents($(component).children(), this.children);
                        }
                        $(component).data('valid-component', true);
                    }
                });
            });
            //Imprime alerta si no encuentra el componente en el schema
            if (!$(component).data('valid-component')) {
                console.error('"'+component.className+'" componente no tiene un schema valido.');
            }
        });
    };
};