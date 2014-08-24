App.OfficeController = Ember.ObjectController.extend({
    actions: {
        upgrade: function() {
            var level = this.get('level');

            if (level < 9) {
                this.set('level', level + 1);
            } else {
                alert("Sorry! You can't upgrade because your office is already gigantic.");
            }
        },
        downgrade: function() {
            var employees = this.get('employees.length');
            var level = this.get('level');
            var space_available = level + 1;

            if (level > 1 && employees < space_available) {
                this.set('level', level - 1);
            } else {
                alert("Sorry! You can't downgrade your office because you're at capacity. You have to let some staff go to free up space first!");
            }
        }
    }
});