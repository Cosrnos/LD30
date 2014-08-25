App.AppController = Ember.ObjectController.extend({
	paused: false,
	_year: 1,
	_month: 1,
	_week: 1,
	_day: 0,

	_canvas: null,

	_events: Em.A([]),

	_views: 0,

	watch_views: function() {
		this.set('office.views_today', this.get('_views'));
	}.observes('_views'),

	init: function() {

		this.tick();
		this._super();
	},

	date: function() {
		return "day " + this.get('_day') + " | week " + this.get('_week') + " | month " + this.get('_month') + " | year " + this.get('_year');
	}.property('_day'),

	scheduleEvent: function(context, callback, days) {
		var eventObj = {
			schedule: days,
			callback: callback,
			context: context
		};

		this.get('_events').addObject(eventObj);
	},

	_checkEvents: function() {
		var toRemove = [];

		this.get('_events').forEach(function(item, index) {
			item.days = item.days - 1;
			if (item.days === 0) {
				item.callback.bind(item.context)();
				toRemove.push(index);
			}
		});

		_.each(toRemove, function(index) {
			this.get('_events').removeAt(index);
		});
	},

	_updateStories: function() {
		var current_stories = this.get('office.projects_current');
		var past_stories = this.get('office.projects_past')
		if (current_stories) {
			current_stories.forEach(function(item) {
				var amt = item.progress + item.progressInterval;
				if (item.progress < 100) {
					if (amt > 100) {
						amt = 100;
					}

					item.set('progress', amt);
				}
			});
		}

		if (past_stories) {
			past_stories.forEach(function(item) {
				item.incrementProperty('age');
			});
		}
	},

	_drawPageViews: function() {
		var canv = this.get('_canvas');
		var views = 0;
		if (!canv) {
			canv = document.createElement('canvas');
			canv.setAttribute('width', 500);
			canv.setAttribute('height', 250);
		}
		var stories = this.get('office.projects_past');
		if (stories) {
			stories.forEach(function(story) {
				views += story.get('viewsThisDay');
			});
		}
		//Add a degree of randomness
		views += Math.floor(Math.random() * (this.get('office.followers') / (Math.random() * 20) + (Math.random() * 5 + 5)) + (this.get('office.followers') * .02));
		views += Math.floor(Math.random() * App.Utils.config.get('RANDOM_VIEW_THRESHOLD'));

		this.set('_views', views);

		if (canv) {
			var ctx = canv.getContext('2d');
			var data = ctx.getImageData(0, 0, 500, 250);
			ctx.clearRect(0, 0, 500, 250);
			ctx.putImageData(data, -5, 0);
			var off = 250 - Math.floor(views / 10);
			ctx.fillRect(99 * 5, off, 5, Math.floor(views / 10));
		}

		if (document.getElementById('dashboard-canv')) {
			var dbctx = document.getElementById('dashboard-canv').getContext('2d');
			dbctx.clearRect(0, 0, 500, 250);
			dbctx.putImageData(ctx.getImageData(0, 0, 500, 250), 0, 0);
		}

		this.set('_canvas', canv);
	},

	tick: function() {
		if (!this.get('paused')) {
			var day = this.get('_day');
			var week = this.get('_week');
			var month = this.get('_month');
			var year = this.get('_year');


			day++;

			// Daily actions
			this._updateStories();
			this._drawPageViews();
			this.get_followers();
			this.get_pageview_income();
			this._checkEvents();

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

			// Too far in the red?
			if (this.check_balance()) {
				alert("Sorry dawg, your crushing debt has ruined your life. Your dreams of a crossover fanfiction empire are dead.");
			}
		}

		Ember.run.later(this, this.tick, App.Utils.get('config.DAY_LENGTH'));
	},

	// Social
	followers: 0,
	followers_facespace: 0,
	followers_tweetbook: 0,
	followers_wumbler: 0,
	followers_total: function() {
		return this.get('office.followers');
		//return this.get('followers_facespace') + this.get('followers_tweetbook') + this.get('followers_wumbler');
	}.property('office.followers'),
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
		var income;
		if (!this.get('office')) {
			return;
		}

		income = this.get('office.money_incoming') || 0;

		this.set('office.bank', this.get('office.bank') + income);
	},
	get_followers: function() {
		var followers;

		if (!this.get('office')) {
			return;
		}

		followers = this.get('office.followers_incoming') || 0;

		this.set('office.followers', this.get('office.followers') + followers);
	},

	payroll_and_rent: function() {
		var expenses;

		if (!this.get('office')) {
			return;
		}

		expenses = this.get('office.money_outgoing') || 0;

		this.set('office.bank', this.get('office.bank') - expenses);
	},

	check_balance: function() {
		if (!this.get('office')) {
			return false;
		}

		return (this.get('office.bank') < -2000000);
	}
});