App.HistoryController = Ember.ArrayController.extend({
    needs: ['app'],
    sortProperties: ['id'],
    sortAscending: false
});