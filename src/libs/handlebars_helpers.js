/*
 * Takes a unix timestamp and displays it in the format you choose
 */
Ember.Handlebars.registerBoundHelper('friendly_timestamp', function(timestamp, format) {
    var datetime;

    try {
        timestamp = timestamp || 0;
        timestamp = parseInt(timestamp, 0);
    } catch (e) {
        timestamp = 0;
    }

    format = format || '';

    if (moment) {
        datetime = moment.unix(timestamp).format(format);
    } else {
        datetime = timestamp;
    }

    return datetime;
});

/*
 * Cents to Dollars conversion
 */
Ember.Handlebars.registerBoundHelper('cents_to_dollars', function(cents) {
    var dollars;

    try {
        cents = cents || 0;
        cents = parseInt(cents, 0);
        dollars = (cents / 100).toFixed(2);
    } catch (e) {
        dollars = 0.00;
    }

    return dollars;
});