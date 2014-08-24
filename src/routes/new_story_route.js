App.NewStoryRoute = Ember.Route.extend({
    // renderTemplate: function() {
    //     this.render('adminUsers', {
    //         into: 'settings',
    //         outlet: 'settingsView'
    //     });
    // },

    setupController: function(controller, model) {
        var office = controller.get('controllers.app.office');
        controller.set('newStory', App.Stories.create({
            id: (new Date().getTime())
        }));
        controller.set('worldChoices', _.sample(App.Worlds, 3 + office.get('employees.length')));
        controller.set('availableTeam', office.get('employees_available'));
    }

});