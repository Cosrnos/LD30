App.Stories = Ember.Object.extend({
	//Story Specifics
	id: undefined,
	title: undefined,
	rating: undefined,
	genre: undefined,
	world1: undefined,
	world2: undefined,
	synopsis: undefined,
	progress: 0,
	_done: false,

	progressInterval: App.Utils.get('config.STORY_PROGRESS_INTERVAL'),

	progressStyle: function() {
		return 'width: ' + this.get('progress') + "%";
	}.property('progress'),

	ready: function() {
		return this.get('progress') >= 100;
	}.property('progress'),

	//Role Slots
	author: undefined,
	editor: undefined,
	artist: undefined,
	promoter: undefined,

	//Stats
	criticRating: undefined,
	weirdness: 0,
	weirdBonus: 1,
	views: 0,
	wordCount: undefined,

	age: 0, //In game days
	totalView: 0,
	wentViral: false,
	dayOneViews: 1,
	basePopularity: 1,

	done: function() {
		return (this.get('progress') >= 100 && this.get('_done'));
	}.property('progress', '_done'),

	createStory: function() {
		//Roles, Worlds and Genre must be selected.

	},

	generate_synopsis: function() {
		var genre = this.get('genre') || 'comedy';
		var template = _.sample(App.SynopsisTemplates[genre]);

		// random things
		var characters = [_.sample(this.get('world1.characters')), _.sample(this.get('world2.characters'))];
		var locations = [_.sample(this.get('world1.locations')), _.sample(this.get('world2.locations'))];
		var props = [_.sample(this.get('world1.props')), _.sample(this.get('world2.props'))];

		// Replacements
		template = template.replace(/{character1}/g, characters[0]);
		template = template.replace(/{character2}/g, characters[1]);
		template = template.replace(/{location1}/g, locations[0]);
		template = template.replace(/{location2}/g, locations[1]);
		template = template.replace(/{prop1}/g, props[0]);
		template = template.replace(/{prop2}/g, props[1]);

		this.set('synopsis', template);
	},

	viewsThisDay: function() {
		var viralBonus = 0;
		var age = this.get('age');
		var criticRating = this.get('criticRating');
		var world1 = this.get('world1');
		var world2 = this.get('world2');
		var weirdBonus = this.get('weirdBonus');
		var base = this.get('basePopularity')

		var dayOne = this.get('dayOneViews')

		if (age === 7) {
			if (criticRating <= 10) {
				if (world1.get('fuckingWat') || world2.get('fuckingWat')) {
					if (Math.random() > .9) {
						this.set('wentViral', true)
					}
				}
			}
		}

		if (this.get('wentViral')) {
			viralBonus = ((base * 100 / 10) * 80 + (base * 1.5 * Math.pow(base, 0.75))) * (weirdBonus * weirdBonus);
			viralBonus = Math.ceil(viralBonus / (0.95 * (age - 7)));
		}

		if (age === 0) {
			return Math.ceil(dayOne + viralBonus);
		} else {
			return Math.ceil(dayOne / (0.75 * age)) + viralBonus;
		}

	}.property('age'),

	followersThisDay: function() {
		var todayViews = this.get('viewsThisDay');
		return Math.floor((this.get('criticRating') * todayViews * .05) / (40));
	}.property('viewsThisDay')


});

//App.Statuses.table = 'stories';