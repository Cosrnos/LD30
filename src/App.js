window.App = Ember.Application.create();

App.Router.map(function() {
	this.resource('app', {
		path: '/'
	}, function() {
		this.resource('index', {
			path: '/'
		});
		this.resource('dashboard');

		this.resource('story', {
			path: '/story'
		}, function() {
			this.resource('history');
			this.resource('newStory', {
				path: '/new'
			}, function() {});
			this.resource('viewStory', {
				path: '/:id'
			}, function() {});
		});

		this.resource('employees', {
			path: '/employees'
		}, function() {
			this.resource('hire', {
				path: '/hire'
			});
		});
	});
});