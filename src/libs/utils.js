App.Utils = Ember.Object.create({
	config: Ember.Object.create({
		ATTRIBUTE_MAX: 20,
		ATTRIBUTE_MIN: 0,
		DAY_LENGTH: 1200,
		PAGEVIEW_CENTS: 40,
		ROLE_LEVEL_INIT_MAX: 5,
		ROLE_LEVEL_INIT_MIN: 0,

		RANDOM_VIEW_THRESHOLD: 20,

		// Percentage a story will be done each day
		STORY_PROGRESS_INTERVAL: 100 / 14

	})
});