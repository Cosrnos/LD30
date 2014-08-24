App.AppController = Ember.ObjectController.extend({
	paused: false,
	_year: 1,
	_month: 1,
	_week: 1,
	_day: 0,
	init: function() {

		this.tick();
		this._super();
	},

	date: function() {
		return "day " + this.get('_day') + " | week " + this.get('_week') + " | month " + this.get('_month') + " | year " + this.get('_year');
	}.property('_day'),

	tick: function() {
		if (!this.get('paused')) {
			var day = this.get('_day');
			var week = this.get('_week');
			var month = this.get('_month');
			var year = this.get('_year');

			day++;

			// Daily actions
			this.get_pageview_income();

			if (day === 8) {
				week += 1;
				day = 1;

				// Weekly actions
				this.payroll_and_rent();
			}

			if (week === 5) {
				month += 1;
				week = 1;

				// Monthly actions
				this.get_new_hiring_candidates();
			}

			if (month === 13) {
				year += 1;
				month = 1;

				// Yearly actions
			}

			this.set('_day', day);
			this.set('_week', week);
			this.set('_month', month);
			this.set('_year', year);
		}

		Ember.run.later(this, this.tick, App.Utils.get('config.DAY_LENGTH'));
	},

	// Social
	followers_facespace: 1693,
	followers_tweetbook: 1213,
	followers_wumbler: 8530,
	followers_total: function() {
		return this.get('followers_facespace') + this.get('followers_tweetbook') + this.get('followers_wumbler');
	}.property('followers_facespace', 'followers_tweetbook', 'followers_wumbler'),

	// Caching of hiring candidates
	get_new_hiring_candidates: function() {
		var employees = Em.A([]);

		// Generate a bunch of employees. A subset of these will be used.
		for (var i = 0; i < 100; i++) {
			employees.addObject(this.generate_employee());
		}

		App.set('employees_cache', employees);
	},

	// Returns an array of Employee objects
	generate_employee: function() {
		var gender = (Math.floor(Math.random() * 2) == 0) ? 'masculine' : 'feminine';
		var first_name = App.EmployeeNames.first_names[gender][Math.floor(Math.random() * App.EmployeeNames.first_names[gender].length)];
		var last_name = App.EmployeeNames.last_names[Math.floor(Math.random() * App.EmployeeNames.last_names.length)];

		return App.Employee.create({
			name: first_name + " " + last_name,
			gender: gender,
			base_creativity: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
			base_grammar: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
			base_charisma: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
			base_math: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
			base_digital_dexterity: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
			level_editor: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX')),
			level_techie: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX')),
			level_artist: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX')),
			level_writer: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX')),
			level_promoter: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX'))
		});
	},

	// Calculate income from pageviews
	get_pageview_income: function() {
		var income = 0;

		if (!this.get('office')) {
			return;
		}

		_.each(this.get('office.projects_past'), function(story) {
			income += (story.get('pageviews') * App.Utils.get('config.PAGEVIEW_CENTS'));
		});

		this.set('office.bank', this.get('office.bank') + income);
	},

	payroll_and_rent: function() {
		var expenses;

		if (!this.get('office')) {
			return;
		}

		expensese = this.get('office.money_outgoing') || 0;

		this.set('office.bank', this.get('office.bank') - expenses);
	}
});