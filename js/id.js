const Id = (function(){
	let symbols = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

	const generate = function() {
		let id = '';

		for(let i = 0; i < 15; i++) {
		let position = Math.floor(Math.random() * symbols.length);
		id += symbols[position];
		}

		return id;
	};

	return {
		generate
	}
}())