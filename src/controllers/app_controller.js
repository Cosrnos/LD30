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

			if (day === 8) {
				week += 1;
				day = 1;
			}

			if (week === 5) {
				month += 1;
				week = 1;
			}

			if (month === 13) {
				year += 1;
				month = 1;
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
	}.property('followers_facespace', 'followers_tweetbook', 'followers_wumbler')
});