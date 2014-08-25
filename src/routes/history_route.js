App.HistoryRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		controller.set('content', this.controllerFor('app').get('office.projects_past'));
		this.controllerFor('app').set('paused', true);
	},
	actions: {
		willTransition: function() {
			this.controllerFor('app').set('paused', false);
		}
	}
});