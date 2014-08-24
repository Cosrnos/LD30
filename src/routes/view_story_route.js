App.ViewStoryRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this.controllerFor('app').set('paused', true);
        controller.set('content', model);
    },
    actions: {
        willTransition: function() {
            this.controllerFor('app').set('paused', false);
        }
    }

});