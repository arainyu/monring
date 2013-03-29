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
