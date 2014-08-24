App.NewStoryRoute = Ember.Route.extend({
    // renderTemplate: function() {
    //     this.render('adminUsers', {
    //         into: 'settings',
    //         outlet: 'settingsView'
    //     });
    // },

    setupController: function(controller, model) {

        controller.set('worldChoices', _.sample(App.Worlds, 3));
        controller.set('newStory', App.Stories.create());

        office = controller.get('controllers.app.office');
        controller.set('availableTeam', office.get('employees_available'));
        c = controller;
    }

});


App.NewStoryController = Ember.Controller.extend({
    needs: ['app'],

    chosenTeam: function() {
        var newStory = this.get('newStory');
        var team = [];
        debugger;
        if (newStory.author) {
            team.addObject(newStory.author);
        }
        if (newStory.editor) {
            team.addObject(newStory.editor);
        }
        if (newStory.artist) {
            team.addObject(newStory.artist);
        }
        if (newStory.promoter) {
            team.addObject(newStory.promoter);
        }
        return team;
    }.property('newStory.author', 'newStory.editor', 'newStory.artist', 'newStory.promoter'),

    myAvailableTeam: Em.computed.setDiff('availableTeam', 'chosenTeam'),

    showCreateButton: function() {
        var newStory = this.get('newStory');

        if (newStory.get('title') && newStory.get('genre') && newStory.get('author') && newStory.get('world1') && newStory.get('world2')) {
            return true;
        } else {
            return false;
        }
    }.property('newStory.genre', 'newStory.title', 'newStory.author', 'newStory.world1', 'newStory.world2'),

    actions: {
        cancelArtist: function() {
            var newStory = this.get('newStory');
            newStory.set('artist', undefined);
        },
        cancelAuthor: function() {
            var newStory = this.get('newStory');
            newStory.set('author', undefined);
        },
        cancelEditor: function() {
            var newStory = this.get('newStory');
            newStory.set('editor', undefined);
        },
        cancelPromoter: function() {
            var newStory = this.get('newStory');
            newStory.set('promoter', undefined);
        }
    },

});

App.WorldChoiceView = Em.View.extend({
    tagName: 'div',
    classNameBindings: [':world-choice', 'selected:world-selected'],
    selected: false,
    click: function(event) {
        //debugger;
        var newStory = this.get('controller.newStory');
        var world = this.get('context');
        var selected = this.get('selected');

        //If it's already selected, unselect it.  Else, select it.
        if (selected) {
            if (newStory.get('world1') === world) {
                newStory.set('world1', undefined);
                this.set('selected', false);
                return;
            }
            if (newStory.get('world2') === world) {
                newStory.set('world2', world);
                this.set('selected', false);
                return;
            }
        } else {
            if (!newStory.get('world1')) {
                newStory.set('world1', world);
                this.set('selected', true);
                return;
            }
            if (!newStory.get('world2')) {
                newStory.set('world2', world);
                this.set('selected', true);
                return;
            }
        }
    }
});

App.TeamMemberSelector = Em.View.extend({
    tagName: 'div',
    classNameBindings: [':team-choice'],

});