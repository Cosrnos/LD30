App.HireController = Ember.ArrayController.extend({
    actions: {
        add_employee: function(employee) {
            employee.set('hired', true);
            alert(employee.get('name') + " hired!");
        }
    }
});