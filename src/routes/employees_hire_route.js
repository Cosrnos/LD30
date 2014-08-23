App.HireRoute = Ember.Route.extend({
    model: function() {
        var employees = Em.A([]);

        for (var i = 0; i < 10; i++) {
            employees.addObject(this.generate_employee());
        }

        return employees;
    },

    // Returns an array of Employee objects
    generate_employee: function() {
        var gender = (Math.floor(Math.random() * 2) == 0) ? 'masculine' : 'feminine';
        var first_name = App.EmployeeNames.first_names[gender][Math.floor(Math.random() * App.EmployeeNames.first_names[gender].length)];
        var last_name = App.EmployeeNames.last_names[Math.floor(Math.random() * App.EmployeeNames.last_names.length)];
        var characteristic_max = 20;

        return App.Employee.create({
            name: first_name + " " + last_name,
            gender: gender,
            base_creativity: Math.floor(Math.random() * characteristic_max),
            base_grammar: Math.floor(Math.random() * characteristic_max),
            base_charisma: Math.floor(Math.random() * characteristic_max),
            base_math: Math.floor(Math.random() * characteristic_max),
            base_digital_dexterity: Math.floor(Math.random() * characteristic_max),
            level_editor: Math.floor(Math.random() * 5),
            level_techie: Math.floor(Math.random() * 5),
            level_artist: Math.floor(Math.random() * 5),
            level_writer: Math.floor(Math.random() * 5),
            level_promoter: Math.floor(Math.random() * 5)
        });
    }
});