App.HireController = Ember.ArrayController.extend({
    needs: ['app'],
    actions: {
        add_employee: function(employee) {
            var office = this.get('controllers.app.office');

            if (office.get('level') > office.get('employees.length')) {
                employee.set('hired', true);
                office.get('employees').addObject(employee);
            } else {
                alert("Sorry! Your office is full. You'll have to expand your office or let go of some staff before hiring more people.");
            }

        }
    }
});