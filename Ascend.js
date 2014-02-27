var Ascend = (function() {

	return func = function() {
		console.log(arguments[0]);
		if (!this.controller) {
			this.controller = new Leap.Controller({ enableGestures: true });
		}
		return {
			controller: this.controller,
			swipe: function() {
				// do the animation
				return this;
			},

		}
	}

})();