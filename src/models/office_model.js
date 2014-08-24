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
	employees_sorted: function() {
		return this.get('employees').sortBy('busy');
	}.property('employees', 'employees.[]'),

	projects_current: Em.A([]),
	projects_past: Em.A([]),

	//Techie is special in that s/he effects the office as a whole.
	employee_techies: Ember.computed.filterBy('employees', 'techie', true),
	techie: function() {
		return this.get('employee_techies').objectAt(0);
	}.property('employee_techies.[]'),
	website_uptime: function() {
		if (!this.get('techie')) {
			return 0.50;
		}

		var techie = this.get('techie');
		var skill = techie.get('math') + techie.get('digital_dexterity');
		var uptime;

		if (!skill || skill < 10) {
			uptime = 0.50;
		} else if (skill >= 10 && skill < 20) {
			uptime = 0.65;
		} else if (skill >= 20 && skill < 25) {
			uptime = 0.75;
		} else if (skill >= 25 && skill < 30) {
			uptime = 0.83;
		} else if (skill >= 30 && skill < 40) {
			uptime = 0.90;
		} else if (skill >= 40 && skill < 50) {
			uptime = 0.95
		} else if (skill >= 50 && skill < 60) {
			uptime = 0.98;
		} else if (skill >= 60) {
			uptime = 0.9999;
		}

		return uptime;
	}.property('techie'),

	// Finances
	bank: 50000,
	cost_of_rent: function() {
		return this.rent[this.get('level')];
	}.property('level'),
	money_incoming: function() {
		var income = 0;
		_.each(this.get('projects_past'), function(story) {
			income += (story.get('pageviews') * App.Utils.get('config.PAGEVIEW_CENTS'));
		});
		return income;
	}.property('projects_past.@each.pageviews'),
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