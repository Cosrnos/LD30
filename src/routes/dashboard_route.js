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
            title: "Story 1",
            world1: "Shrek",
            world2: "Sonic",
            progressStyle: "width: 50%"
        }, {
            title: "Story 2",
            world1: "Teen Wolf",
            world2: "Care Bears",
            progressStyle: "width: 25%"
        }];

        return {
            stats: stats,
            employees: employees,
            stories: stories
        };
    }
});