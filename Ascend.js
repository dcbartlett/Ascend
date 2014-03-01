var Ascend = (function() {

	return func = function() {

		if (!this.controller) {
			this.controller = new Leap.Controller({ enableGestures: true });
			this.controller.on('animationFrame', function(frame){
				if (frame.id%10 === 0) {
					if (frame.pointables.length) {
						// $(options.element).trigger('pointables', frame);
					} else {
						// $(options.element).trigger('pointablesout', frame);
					}
					if (frame.hands.length) {
						// $(options.element).trigger('hands', frame);
					} else {
						// $(options.element).trigger('handsout', frame);
					}
					if (frame.fingers.length) {
						// $(options.element).trigger('fingers', frame);
					} else {
						// $(options.element).trigger('fingersout', frame);
					}
					if (frame.tools.length) {
						console.log('Tool '+frame.tools[0].id+' Detected');
						// $(options.element).trigger('tools', frame);
					} else {
						// $(options.element).trigger('toolsout', frame);
					}
					if (frame.gestures.length > 0) {
						// $(options.element).trigger('gesture', frame);
						frame.gestures.forEach(function(gesture) {
							// $(options.element).trigger(gesture.type, gesture);
							// $(options.element).trigger(
							// 	gesture.type + gesture.state,
							// 	gesture
							// );
						});
					}
				}
			});
			
			//Lets bind some default functions
			bind('connect', function() {
				console.log('Device Connected');
			})
			
			bind('deviceConnected', function() {
				console.log('Device Connected');
			})

			bind('deviceDisconnected', function() {
				console.log('Device Disconnected');
			})

			bind('blur', function(){

			})

			//Lets monitor the default things for LeapJS
			this.controller.on('connect', function(){
				trigger('connect');
			})

			this.controller.on('deviceConnected', function(){
				trigger('deviceConnected');
			});

			this.controller.on('deviceDisconnected', function(){
				trigger('deviceDisconnected');
			});
			this.controller.on('focus', function(){
				trigger('focus');
			});

			this.controller.on('blur', function(){
				trigger('blur');
			});

			//Finally Connect
			this.controller.connect();
		}

		function bind(eventType, listener) {
			if(!this._listeners) {
				 this._listeners = {};
			}
			if(!(eventType in this._listeners)) {
				this._listeners[eventType] = [];
			}
			var arr = this._listeners[eventType];
			if(arrIndexOf(arr, listener) === -1) {
				arr.push(listener);
			}
			return;
		};

		function unbind(eventType, listener) {
			if(!(this._listeners && (eventType in this._listeners))) {
				return;
			}
			var arr = this._listeners[eventType];
			var idx = arrIndexOf(arr, listener);
			if (idx !== -1) {
				if(arr.length > 1) {
					this._listeners[eventType] = arr.slice(0, idx).concat( arr.slice(idx+1) );
				} else {
					delete this._listeners[eventType];
				}
				return;
			}
			return;
		};

		function trigger(eventType) {
			var args = Array.prototype.slice.call(arguments, 0);
			if (this._listeners && eventType in this._listeners) {
				for(var i=0; i < this._listeners[eventType].length; i++) {
					this._listeners[eventType][i].apply(this, args);
				}
			}
		};

		function arrIndexOf(arr, obj) {
			for(var i=0; i < arr.length; i++){
				if(arr[i] === obj){
					return i;
				}
			}
			return -1;
		}


		// Create our overlay layer
		var div = document.createElement("div");
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.overflow = "hidden";
		div.style.position = "absolute";
		div.style.top = 0;
		div.style.left = 0;
		div.style.z-index = "9999";
		div.style.background = "rgba(0,0,0,0.6)";
		div.style.color = "white";
		div.innerHTML = "Hello";

		document.body.appendChild(div);

		return {
			controller: this.controller,
			bind: bind,
			unbind: unbind,
			trigger: trigger,
			swipe: function(callback) {

			},
			punch: function() {

			}
		};
	}

})();