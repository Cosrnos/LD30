App.Utils = Ember.Object.create({
	config: Ember.Object.create({
		ATTRIBUTE_MAX: 20,
		ATTRIBUTE_MIN: 0,
		DAY_LENGTH: 1200,
		PAGEVIEW_CENTS: 1,
		ROLE_LEVEL_INIT_MAX: 5,
		ROLE_LEVEL_INIT_MIN: 0,

		// Percentage a story will be done each day
		STORY_PROGRESS_INTERVAL: 100 / 14

	})
});