App.IndexRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this.controllerFor('app').set('paused', true);
    },
    actions: {
        willTransition: function() {
            this.controllerFor('app').set('paused', false);
        }
    }
});