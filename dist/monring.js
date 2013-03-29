/*! monring - v0.1.0 - 2013-03-25
* https://www.monring.com
* Copyright (c) 2013 Arain; Licensed MIT */
this.ayujs = {
	_ayujs : this.ayujs
};

ayujs._utils = {};

ayujs._config = {
	preload : []
};

;(function(utils) {
	var toString = Object.prototype.toString;

	utils.isArray = Array.isArray ||
	function(val) {
		return toString.call(val) === '[object Array]';
	};


	utils.forEach = Array.prototype.forEach ? function(arr, fn) {
		arr.forEach(fn);
	} : function(arr, fn) {
		for(var i = 0; i < arr.length; i++) {
			fn(arr[i], i, arr);
		}
	};
})(ayujs._utils);

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

(function(window, ayujs, utils, config) {

	var modules = config.modules = [];

	modules = config.modules.push({
		uri : window.location.pathname,
		id : "main-modular-module",
		status : 5
	});

	config.checkModule = function(id) {
		utils.forEach(modules, function(item, index) {
			if(item.id === id || item.uri === id) {
				return item;
			}
		});
		return null;
	};
})(window, ayujs, ayujs._utils, ayujs._config);

(function(ayujs, utils, config) {
	var READY_STATE_REG = /loaded|complete|undefined/;
	var appendTo = document.head || document.getElementsByTagName('head');

	//var testScriptElem = document.createElement("script");
	//var scriptOrderedAsync = (testScriptElem.async === true);

	utils.loader = function(scriptObject, onload) {
		var script, xhr;
		var src = scriptObject.src;
		script = document.createElement('script');

		script.type = scriptObject.type || "text/javascript";
		if(scriptObject.charset) {
			script.charset = scriptObject.charset;
		}

		script.onload = script.onreadystatechange = function() {
			if(READY_STATE_REG.test(script.readyState)) {
				script.onload = script.onreadystatechange = null;
				onload();
			}
		};
		script.src = src;
		document.getElementsByTagName('head')[0].appendChild(script);
	};
	
})(ayujs, ayujs._utils, ayujs._config);
(function(window, ayujs, utils, config) {

	function Module(uri, status) {
		this.uri = uri;
		this.status = status;
		this.dependencies = [];
		this.waitings = [];
	}

	var _define = function(id, deps, factory) {

		var argsLen = arguments.length;

		if(argsLen === 1) {
			factory = id;
			id = undefined;
		} else if(argsLen === 2) {
			factory = deps;
			deps = undefined;
			if(utils.isArry(id)) {
				deps = id;
				id = undefined;
			}
		}

	};
	var _require = function(deps, factory) {

	};
})(window, ayujs, ayujs._utils, ayujs._config);
