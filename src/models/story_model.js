App.Stories = Ember.Object.extend({
	//Story Specifics
	title: undefined,
	rating: undefined,
	genre: undefined,
	world1: undefined,
	world2: undefined,

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

	createStory: function() {
		//Roles, Worlds and Genre must be selected.

	}

});

//App.Statuses.table = 'stories';