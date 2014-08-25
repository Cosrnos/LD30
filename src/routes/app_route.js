App.AppRoute = Ember.Route.extend({
    model: function() {
        var you = App.Employee.create({
            name: "You",
            you: true,
            gender: (Math.floor(Math.random() * 2) == 0) ? 'masculine' : 'feminine',
            base_creativity: 15,
            base_grammar: 15,
            base_charisma: 15,
            base_math: 15,
            base_digital_dexterity: Math.floor(Math.random() * App.Utils.get('config.ATTRIBUTE_MAX')),
            level_editor: 0,
            level_techie: 0,
            level_artist: 0,
            level_writer: 0,
            level_promoter: 0
        });

        return {
            office: App.OfficeController.create({
                content: App.Office.create({
                    employees: Em.A([you])
                })
            }),
            stats: []
        };
    },
    setupController: function(controller, model) {
        controller.set('content', model);
        App.theOffice = model.office;
    }
});