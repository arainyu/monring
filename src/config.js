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
