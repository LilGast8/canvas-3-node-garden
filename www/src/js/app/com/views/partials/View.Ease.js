

APP.Views = APP.Views || {};


APP.Views.Ease = (function(window){
	
	
	function Ease(value, pow, duration, timeBegin) {
		APP.View.call(this);
		
		this.value = this.begin = this.end = value;
		
		this.pow = pow;
		
		this.maxDuration = duration;
		this.time = timeBegin;
		this.reset();
	}
	
	
	Ease.prototype = Object.create(APP.View.prototype);
	Ease.prototype.constructor = Ease;
	
	
	Ease.prototype.initElt = function() {
		
	};
	
	
	Ease.prototype.bindEvents = function() {
		
	};
	
	
	Ease.prototype.update = function(timeChange) {
		if(timeChange === undefined) timeChange = 1;
		var timeRatio = this.time / this.duration;
		
		if(timeRatio < 0.5) timeRatio = 0.5 * Math.pow(timeRatio * 2, this.pow);
		else timeRatio = 1 - 0.5 * Math.pow((1 - timeRatio) * 2, this.pow);
		
		this.value = this.begin + timeRatio * (this.end - this.begin);
		this.time += timeChange;
		if(this.time > this.duration) this.reset();
	};
	
	
	Ease.prototype.reset = function() {
		this.begin = this.end;
		this.end = Math.random();
		this.time = 0;
		this.duration = Math.sqrt(Math.abs(this.end - this.begin)) * this.maxDuration;
	};
	
	
	return Ease;
	
	
})(window);

