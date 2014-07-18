

APP.Views = APP.Views || {};


APP.Views.Circle = (function(window){
	
	
	function Circle(id, x, y) {
		APP.View.call(this);
		
		this.name = 'Circle'+id;
		this.toX = x;
		this.toY = y;
		
		this.canvas = APP.Views.Index.canvas;
		this.context = APP.Views.Index.context;
		
		this.fc = {};
		
		this.isHover = false;
		
		this.x = null;
		this.y = null;
		this.width = null;
		this.height = null;
		this.radiusO = null;
		this.radius = null;
		this.color = null;
		
		this.RADIUS_MIN = 5;
		this.RADIUS_VARIATION = 95;
		this.RADIUS_MAX = this.RADIUS_MIN+this.RADIUS_VARIATION;
	}
	
	
	Circle.prototype = Object.create(APP.View.prototype);
	Circle.prototype.constructor = Circle;
	
	
	Circle.prototype.initElt = function() {
		_buildCircle.call(this);
	};
	
	
	Circle.prototype.bindEvents = function() {
		
	};
	
	
	Circle.prototype.unbindEvents = function() {
		
	};
	
	
	Circle.prototype.draw = function() {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
		this.context.fillStyle = this.color;
		this.context.fill();
	};
	
	
	Circle.prototype.mouseEnter = function() {
		if(this.isHover) return false;
		else this.isHover = true;
		
		TweenLite.to(this, 0.5, {radius:this.radiusO+this.radiusO*30/100, ease:Quad.easeOut});
	};
	
	
	Circle.prototype.mouseLeave = function() {
		if(!this.isHover) return false;
		else this.isHover = false;
		
		TweenLite.to(this, 0.5, {radius:this.radiusO, ease:Quad.easeOut});
	};
	
	
	var _buildCircle = function() {
		var posStart = _getPosStart.call(this);
		this.x = posStart.startX;
		this.y = posStart.startY;
		this.radiusO = this.radius = Math.round(Math.random()*this.RADIUS_VARIATION+this.RADIUS_MIN);
		this.color = _getRandomColor();
		var duration = Math.round(Math.random()*40+10)/10;
		
		TweenLite.to(this, duration, {x:this.toX, y:this.toY, ease:Quart.easeOut});
	};
	
	
	var _getPosStart = function() {
		var x = null;
		var y = null;
		var start = parseInt(Math.random()*4);
		var windowW = APP.Main.windowW;
		var windowH = APP.Main.windowH;
		
		if(start === 0 ) { // top
			x = Math.random()*(windowW+200)-100;
			y = -this.RADIUS_MAX;
		} else if(start == 1){ // right
			x = windowW+this.RADIUS_MAX;
			y = Math.random()*(windowH+200)-100;
		} else if(start == 2){ // bottom
			x = Math.random()*(windowW+200)-100;
			y = windowH+this.RADIUS_MAX;
		} else if(start == 3){ // left
			x = -this.RADIUS_MAX;
			y = Math.random()*(windowH+200)-100;
		}
		
		var pos = {
			startX : x,
			startY : y
		};
		
		return pos;
	};
	
	
	var _getRandomColor = function() {
		var hex = '0123456789ABCDEF'.split('');
		var color = '#';
		for(var i = 0; i < 6 ; i++) color = color+hex[Math.floor(Math.random()*16)];
		
		return color;
	};
	
	
	return Circle;
	
	
})(window);

