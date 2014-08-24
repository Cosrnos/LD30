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
            var capacity = this.get('capacity');

            if (capacity <= 2) {
                alert("Sorry! You can't downgrade your office you need some room for an employee!");
            } else if (employees >= capacity) {
                alert("Sorry! You can't downgrade your office because you're at capacity. You have to let some staff go to free up space first!");
            } else {
                this.set('level', capacity - 2);
            }
        }
    }
});