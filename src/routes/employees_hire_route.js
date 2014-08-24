App.HireRoute = Ember.Route.extend({
    model: function() {
        var employees;

        if (App.get('employees_cache')) {
            employees = App.get('employees_cache');
        } else {
            employees = Em.A([]);
        }

        return employees;
    },
    setupController: function(controller, model) {
        var app_controller = this.controllerFor('app');
        var office_level = app_controller.get('office.level');
        var number_of_options = (office_level + 1) * office_level;

        app_controller.set('paused', true);

        // Only a subset of the total options
        controller.set('content', model.slice(0, number_of_options));
    },
    actions: {
        willTransition: function() {
            this.controllerFor('app').set('paused', false);
        }
    }
});