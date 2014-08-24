App.DashboardController = Ember.ObjectController.extend({
	needs: ['app'],

	actions: {
		fire: function(employee) {
			employee.set('hired', false);
			if (confirm("Do you really want to fire " + employee.name + "? This can't be undone!")) {
				this.get('controllers.app.office.employees').removeObject(employee);
			}
		}
	}
});