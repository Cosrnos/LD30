App.DashboardRoute = Ember.Route.extend({
    model: function() {
        var employees = [{
            name: "Brian",
            role: "writer"
        }, {
            name: "Seth",
            role: "editor"
        }, {
            name: "Alex",
            role: "artist"
        }];
        var stories = [{
            title: "Story 1"
        }, {
            title: "Story 2"
        }];

        return {
            employees: employees,
            stories: stories
        };
    }
});