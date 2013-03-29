(function(utils) {
	utils.publisher = {
		actionType : {
			UNSUBSCRIBER : 'unsubscriber',
			PUBLISH : 'publish'
		},
		subscribers : {
			any : []
		},
		addListener : function(type, fn, context) {
			type = type || 'any';
			fn = typeof fn === 'function' ? fn : context[fn];
			if( typeof this.subscribers[type] === 'undefined') {
				this.subscribers[type] = [];
			}
			this.subscribers[type].push({
				fn : fn,
				context : context || this
			});

		},
		removeListener : function(type, fn, context) {
			context = context || this;
			this.visitSubscribers(this.actionType.UNSUBSCRIBER, type, fn, context);
		},
		fire : function(type, publication) {
			this.visitSubscribers(this.actionType.PUBLISH, type, publication);
		},
		visitSubscribers : function(action, type, arg, context) {
			var pubType = type || 'any';
			var subscribers = this.subscribers[pubType];

			if(action === this.actionType.UNSUBSCRIBER && !arg) {
				delete this.subscribers[pubType];
				return;
			}

			for(var i = 0, len = subscribers ? subscribers.length : 0; i < len; i++) {
				var subFn = subscribers[i].fn;
				var subContext = subscribers[i].context;

				if(action === this.actionType.PUBLISH) {
					subFn.call(subContext, arg);
				} else {
					if(subFn === arg && subContext === context) {
						subscribers.splice(i, 1);
						len--;
						i--;
					}
				}
			}
		}
	};
})(ayujs._utils);
