App.NewStoryController = Ember.Controller.extend({
    needs: ['app'],
    showExtra: Ember.computed.and('hasMultipleFree', 'newStory.author'),

    teamMembers: function() {
        return this.get('controllers.app.office.employees_sorted');
    }.property('controllers.app.office.employees_sorted'),

    teamLength: function() {
        return this.get('controllers.app.office.employees_sorted.length');
    }.property('controllers.app.office.employees_sorted.length'),

    hasMultipleFree: function() {
        return this.get('controllers.app.office.employees_available.length') > 1;
    }.property('controllers.app.office.employees_available.length'),

    chosenTeam: function() {
        var newStory = this.get('newStory');
        var team = [];
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
        },

        createStory: function() {
            var newStory = this.get('newStory');
            var world1 = newStory.get('world1');
            var world2 = newStory.get('world2');

            var author = newStory.get('author');
            var editor = newStory.get('editor');
            var artist = newStory.get('artist');

            var office = this.get('controllers.app.office');
            var editorMuliplier = 1;
            //Calculate critic rating.
            var criticBase = 2 * author.get('creativity') + author.get('grammar');
            if (editor) {
                criticBase += (2 * editor.get('grammar'));
                var editorMuliplier = 1 + (1 * (2 / Math.PI)) * Math.atan(.05 * editor.get('charisma'));
            }
            if (artist) {
                criticBase += artist.get('creativity') + 2 * artist.get('digital_dexterity');
            }

            //THis function has a horizontal asymtote at 100.
            var criticRating = (100 * (2 / Math.PI)) * Math.atan(.020 * (criticBase * editorMuliplier));

            newStory.set('criticRating', Math.ceil(criticRating));
            newStory.set('weirdness', Math.max(world1.get('weirdness'), world2.get('weirdness')));

            office.get('currentProjects').pushObject(newStory);

            debugger;
        }
    },

});