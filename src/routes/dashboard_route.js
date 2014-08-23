App.DashboardRoute = Ember.Route.extend({
    model: function() {
        var stats = {
            pageviews: 999
        };
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
            stats: stats,
            employees: employees,
            stories: stories
        };
    }
});