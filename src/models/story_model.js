App.Stories = Ember.Object.extend({
	//Story Specifics
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
	views: 0,
	wordCount: undefined,

	age: 0, //In game days
	totalView: 0,

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
		var age = this.get('age');
		var criticRating = this.get('criticRating');
		var world1 = this.get('world1');
		var world2 = this.get('world2');
		var base = Math.ceil((world1.get('google') + world2.get('google')) / 1000000);
		var followers = App.get('office.followers_total') || 0;
		base = Math.max(base, 10);
		var dayOne = (followers / 10) * criticRating + (75 * Math.pow(base, 0.75));

		if (age === 7) {
			if (criticRating <= 10) {
				if (world1.get('fuckingWat') || world2.get('fuckingWat')) {
					var goViral = Math.random() > .9;
				}
			}
		}

		return Math.ceil(dayOne / (0.75 * age));

	}.property('age'),


});

//App.Statuses.table = 'stories';