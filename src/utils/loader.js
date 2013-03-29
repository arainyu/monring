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