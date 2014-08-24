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

        return App.Employee.create({
            name: first_name + " " + last_name,
            gender: gender,
            base_creativity: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
            base_grammar: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
            base_charisma: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
            base_math: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
            base_digital_dexterity: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
            level_editor: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX')),
            level_techie: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX')),
            level_artist: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX')),
            level_writer: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX')),
            level_promoter: Math.floor(Math.random() * App.Utils.get('config.ROLE_LEVEL_INIT_MAX'))
        });
    }
});