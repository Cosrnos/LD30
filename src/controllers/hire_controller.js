App.HireController = Ember.ArrayController.extend({
    needs: ['app'],
    actions: {
        add_employee: function(employee) {
            var office = this.get('controllers.app.office');
            var total_space = office.get('level') + 1;

            if (total_space > office.get('employees.length')) {
                employee.set('hired', true);
                office.get('employees').addObject(employee);
            } else {
                alert("Sorry! Your office is full. You'll have to expand your office or let go of some staff before hiring more people.");
            }

            Ember.run.later(this, function() {
                this.transitionToRoute('dashboard');
            }, 1000);
        },
        cancel: function() {
            this.transitionToRoute('dashboard');
        }
    }
});