class EventObserver {
	constructor() {
		// subscribers
		this.observers = [];
	}

	// Subscribe on event
	subscribe(fn) {
		this.observers.push(fn);
	}

	// unsubscribe
	unsubscribe(fn) {
		this.observers = this.observers.filter(item => {
			if(item !== fn) {
				return item;
			}
		})
	}

	fire(args) {
		this.observers.forEach(fn => {
			fn.call(null, args)
		})
	}
}