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
        //debugger;
        if (selected) {
            if (newStory.get('world1') === world) {
                newStory.set('world1', undefined);
                this.set('selected', false);
                return;
            }
            if (newStory.get('world2') === world) {
                newStory.set('world2', undefined);
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