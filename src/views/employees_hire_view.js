App.HireView = Em.View.extend({
	currentIndex: 0,
	startOfList: function() {
		return this.get('currentIndex') === 0;
	}.property('currentIndex'),
	endOfList: function() {
		return (this.get('currentIndex') === this.get('controller.model.length') - 1) || (this.get('controller.model.length') === 0);
	}.property('currentIndex', 'controller.model.length'),
	actions: {
		prev: function() {
			if (this.get('startOfList') === false) {
				var cindex = this.get('currentIndex');

				cindex--;

				var elems = this.$().find('.hire-employee.employee');
				var scrollTo = $(elems[cindex]);
				var container = this.$().find('.hire-employee.container');

				container.animate({
					scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
				}, 500);
				this.set('currentIndex', cindex);
			}
		},
		next: function() {
			if (this.get('endOfList') === false) {
				var cindex = this.get('currentIndex');
				cindex++;

				var elems = this.$().find('.hire-employee.employee');
				var scrollTo = $(elems[cindex]);
				var container = this.$().find('.hire-employee.container');

				container.animate({
					scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
				}, 500);
				this.set('currentIndex', cindex);
			}
		}
	}
});