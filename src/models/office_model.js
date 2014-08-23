App.Office = Ember.Model.extend({
	employees: [],
	currentProjects: [],
	//Techie is special in that s/he effects the office as a whole.
	techie: undefined,
	level: 1,
	//Maybe? We'll balance it out later.
	rent: {
		1: 0,
		2: 200,
		3: 400,
		4: 700,
		5: 1200,
		6: 2000,
		7: 3400
	},
});

//App.Office.table = 'office';