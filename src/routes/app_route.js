App.AppRoute = Ember.Route.extend({
    model: function() {
        var you = App.Employee.create({
            name: "You",
            you: true,
            gender: (Math.floor(Math.random() * 2) == 0) ? 'masculine' : 'feminine',
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
    }
});