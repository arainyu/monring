module("Language");
test('test lang: isArray', function() {
	expect(1);
	equal(ayujs._utils.isArray([]), true, "equal succeeds.");
});
test('test lang: forEach', function() {
	//expect(1);
	var a = [], b = [], c = [], d=[];
	a.push("1");
	a.push("2");
	a.push("3");
	ayujs._utils.forEach(a, function(item, i, arr) {
		b.push(item);
		c[i] = item;
		d = arr;
	});
	//equal(a, b, "equal not succeeds.");
	ok(a[1] == b[1] && a[0] == b[0] && a[2] == b[2], "check item ok");
	ok(a[1] == c[1] && a[0] == c[0] && a[2] == c[2], "check index ok");
	ok(a[1] == d[1] && a[0] == d[0] && a[2] == d[2], "check arr ok");
});
module("Loader");
test('test loader: load two script files', function() {
	var timer = null;
	stop();
	ayujs._utils.loader({
		src : 'loader/a.js'
	}, function() {
		ayujs._utils.loader({
			src : 'loader/b.js'
		}, function() {
			clearTimeout(timer);
			start();
			equal('ArainYu', myFirstName + myLastName, "equal succeeds.");
		});
	});
	timer = setTimeout(function() {
		start();
	}, 1000);
});
module("Publisher");
test('test publisher: ', function() {
	var preloads = 10;
	var publisher = ayujs._utils.publisher;
	var fn = function(){
		preloads--;
	};
	
	publisher.addListener('click', fn);
	publisher.addListener('click', function(){
		preloads--;
	});
	
	publisher.fire('click');
	equal(8, preloads, "The first fire: 8.");

	publisher.fire('click');
	equal(6, preloads, "The second fire: 6.");
	
	publisher.removeListener('click', fn);
	publisher.fire('click');
	equal(5, preloads, "The thire fire [after remove listener(just remove fn)]: 5.");
	
	publisher.addListener('click', fn);
	publisher.fire('click');
	equal(3, preloads, "The fourth fire [add listener fn]: 3.");
	
	publisher.removeListener('click');
	publisher.fire('click');
	equal(3, preloads, "The fifth fire [remove listener of all]: 3.");
	
});
