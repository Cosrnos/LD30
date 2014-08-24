//Extends Em.Select to be a Select2 Box.
App.SelectField = Ember.Select.extend({
    init: function() {
        this._super();
        //debugger;
    },
    didInsertElement: function() {
        var width = "resolve";
        if (this.get('width') !== undefined) {
            width = this.get('width');
        }
        //Em.run.schedule('afterRender', function() {

        this.$().select2({
            width: width,
            //selectOnBlur: true
            // minimumResultsForSearch: -1,
            // createSearchChoicePosition: 'top',
            // createSearchChoice: function(term) {
            //     debugger;
            //     return {
            //         id: term
            //     };
            // },
            containerCss: {
                'margin-bottom': '6px'
            },
        });
        this.$().css('min-width', '100px');
        // });

    },

    // observeSelectionLoaded: function() {
    //     var loaded = this.get('selection.isLoaded');

    //     var width = "resolve";
    //     if (this.get('width') !== undefined) {
    //         width = this.get('width');
    //     }

    //     if (loaded === true) {
    //         this.$().select2({
    //             width: width,
    //             // createSearchChoicePosition: 'top',
    //             // createSearchChoice: function(term) {
    //             //     debugger;
    //             //     return {
    //             //         id: term
    //             //     };
    //             // },
    //             containerCss: {
    //                 'margin-bottom': '6px'
    //             }
    //         });
    //     }

    // }.observes('selection.isLoaded'),

    //Forces Select2 to update when value changes.
    observeValue: function() {
        var self = this;
        var new_value;
        var emitChange = true;

        if (this.valueBinding) {
            new_value = self.get('value');
        }
        if (this.selectionBinding) {
            new_value = self.get('selection');
            //The only reason I set emitChange to false here is to make the "Add All" assignments button
            //on HQ Questions work.  I don't know if it's an issue with MultiSelect boxes or using "selection"
            //instead of "value" in the EmberHandlbars select helper.  I just know this fixes my problems.
            emitChange = false;
        }

        if (self.$() !== undefined) {
            self.$().select2("val", new_value, emitChange);
        }
    }.observes('value'),
});