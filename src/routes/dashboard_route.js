App.DashboardRoute = Ember.Route.extend({
    model: function() {
        var stats = {
            pageviews: 999
        };

        return {
            stats: stats,
        };
    }
});