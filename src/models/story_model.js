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
	}

});

//App.Statuses.table = 'stories';