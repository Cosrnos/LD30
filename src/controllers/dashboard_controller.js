App.DashboardController = Ember.ObjectController.extend({
    needs: ['app'],

    actions: {
        fire: function(employee) {
            employee.set('hired', false);
            if (confirm("Do you really want to fire " + employee.name + "? This can't be undone!")) {
                this.get('controllers.app.office.employees').removeObject(employee);
            }
        },
        assign_techie: function(employee) {
            // Free up previous techie
            var previous_techie = this.get('controllers.app.office.techie');

            if (previous_techie) {
                previous_techie.set('busy', false);
                previous_techie.set('techie', false);
            }

            // Assign new techie
            employee.set('busy', true);
            employee.set('techie', true);
        },
        unassign_techie: function(employee) {
            employee.set('busy', false);
            employee.set('techie', false);
        },
        finish_story: function(story) {
            var author = story.get('author');
            var editor = story.get('editor');
            var artist = story.get('artist');
            var promoter = story.get('promoter');

            if (author) {
                author.set('busy', false);
                //Apply stats
            }

            if (editor) {
                editor.set('busy', false);
                //apply stats
            }

            if (artist) {
                artist.set('busy', false);
                //apply stats
            }

            if (promoter) {
                promoter.set('busy', false);
                //apply stats
            }

            story.set('_done', true);

            console.log('Synopsis: ' + story.get('synopsis'));
        }
    }
});