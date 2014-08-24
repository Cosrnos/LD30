App.NewStoryRoute = Ember.Route.extend({
    // renderTemplate: function() {
    //     this.render('adminUsers', {
    //         into: 'settings',
    //         outlet: 'settingsView'
    //     });
    // },

    setupController: function(controller, model) {

        controller.set('worldChoices', _.sample(App.Worlds, 3));
        controller.set('newStory', App.Stories.create({
            id: (new Date().getTime())
        }));

        var office = controller.get('controllers.app.office');
        controller.set('availableTeam', office.get('employees_available'));
    }

});