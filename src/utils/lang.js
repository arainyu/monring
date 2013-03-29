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
