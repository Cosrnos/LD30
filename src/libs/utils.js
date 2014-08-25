App.Utils = Ember.Object.create({
	config: Ember.Object.create({
		ATTRIBUTE_MAX: 20,
		ATTRIBUTE_MIN: 0,
		DAY_LENGTH: 1200,
		PAGEVIEW_CENTS: 5,
		ROLE_LEVEL_INIT_MAX: 5,
		ROLE_LEVEL_INIT_MIN: 0,

		RANDOM_VIEW_THRESHOLD: 20,
		DAY_ONE_FOLLOWER_FACTOR: 33,
		DECAY_RATE: 0.91,
		FOLLOW_GROWTH_RATE: 4.3,

		// Percentage a story will be done each day
		STORY_PROGRESS_INTERVAL: 100 / 12

	})
});