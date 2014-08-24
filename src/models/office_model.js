App.Office = Ember.Object.extend({
	// Weekly rent, expressed in cents
	rent: {
		1: 0,
		2: 20000,
		3: 40000,
		4: 70000,
		5: 120000,
		6: 200000,
		7: 340000
	},
	level: 1,

	employees: Em.A([]),
	employees_busy: Ember.computed.filter('employees', 'busy', true),
	employess_available: Ember.computed.filter('employees', 'busy', false),

	currentProjects: [],
	//Techie is special in that s/he effects the office as a whole.
	techie: undefined,


	money_incoming: function() {
		return 0;
	}.property(),
	money_outgoing: function() {
		var employees = this.get('employees');
		var rent = this.rent[this.get('level')];
		var salaries = 0;

		_.each(employees, function(employee) {
			salaries += employee.get('salary');
		});

		return salaries + rent;
	}.property('employees.@each.salaries', 'level')
});

//App.Office.table = 'office';