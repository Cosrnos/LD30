App.Office = Ember.Object.extend({
	// Weekly rent, expressed in cents
	rent: {
		1: 0,
		2: 20000,
		3: 40000,
		4: 70000,
		5: 100000,
		6: 150000,
		7: 240000,
		8: 330000,
		9: 420000
	},

	level: 1,
	capacity: function() {
		return this.get('level') + 1;
	}.property('level'),

	employees: Em.A([]),
	employees_busy: Ember.computed.filterBy('employees', 'busy', true),
	employees_available: Ember.computed.filterBy('employees', 'busy', false),


	currentProjects: [],
	//Techie is special in that s/he effects the office as a whole.
	techie: undefined,

	cost_of_rent: function() {
		return this.rent[this.get('level')];
	}.property('level'),
	money_incoming: function() {
		return 0;
	}.property(),
	money_outgoing: function() {
		var employees = this.get('employees');
		var rent = this.get('cost_of_rent');
		var salaries = 0;

		_.each(employees, function(employee) {
			if (!employee.get('you')) {
				salaries += employee.get('salary');
			}
		});

		return salaries + rent;
	}.property('employees.@each.salaries', 'cost_of_rent')
});

//App.Office.table = 'office';