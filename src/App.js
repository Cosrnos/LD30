window.App = Ember.Application.create();

App.Router.map(function() {
	this.resource('app', {
		path: '/'
	});
});