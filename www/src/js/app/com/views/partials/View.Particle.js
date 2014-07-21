

APP.Views = APP.Views || {};


APP.Views.Particle = (function(window){
	
	
	function Particle(id, radius, color, attractionDistance, attraction) {
		APP.View.call(this);
		
		this.name = 'particle-'+id;
		
		this.radius = radius;
		this.color = {
			r : color[0],
			g : color[1],
			b : color[2]
		};
		this.attractionDist = attractionDistance;
		this.attraction = attraction;
		
		this.speedMax = 2;
		
		this.isParsed = false;
	}
	
	
	Particle.prototype = Object.create(APP.View.prototype);
	Particle.prototype.constructor = Particle;
	
	
	Particle.prototype.initElt = function() {
		this.resize();
		_setSpeed.call(this);
		
		this.context = APP.Views.Index.context;
	};
	
	
	Particle.prototype.bindEvents = function() {
		
	};
	
	
	Particle.prototype.resize = function() {
		this.windowW = APP.Main.windowW;
		this.windowH = APP.Main.windowH;
		
		this.replace(false);
	};
	
	
	Particle.prototype.draw = function(color) {
		this.x += this.speedX;
		this.y += this.speedY;
		
		if(this.x+this.radius > this.windowW || this.x-this.radius < 0) this.speedX = -this.speedX;
		if(this.y+this.radius > this.windowH || this.y-this.radius < 0) this.speedY = -this.speedY;
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
		this.context.fillStyle = 'rgba('+this.color.r+', '+this.color.g+', '+this.color.b+', 1)';
		this.context.fill();
	};
	
	
	Particle.prototype.drawLine = function(particle1) {
		if(this.isParsed) return false;
		
		var dist = _getDistance.call(this, particle1);
		
		if(dist.total <= this.attractionDist) {
			var opacity = (Math.cos(Math.PI*dist.total/this.attractionDist)+1)/2*0.2;
			
			this.context.beginPath();
			this.context.moveTo(particle1.x, particle1.y);
			this.context.lineTo(this.x, this.y);
			this.context.lineWidth = 1;
			this.context.lineCap = 'round';
			this.context.strokeStyle = 'rgba('+this.color.r+', '+this.color.g+', '+this.color.b+', '+opacity+')';
			this.context.stroke();
			this.context.closePath();
			
			var vSpeedX = dist.distX/this.attraction;
			var vSpeedY = dist.distY/this.attraction;
			
			particle1.speedX -= vSpeedX;
			particle1.speedY -= vSpeedY;
			this.speedX += vSpeedX;
			this.speedY += vSpeedY;
		}
	};
	
	
	Particle.prototype.setParse = function(val) {
		this.isParsed = val;
	};
	
	
	Particle.prototype.changeColor = function(color) {
		this.color.r = color[0];
		this.color.g = color[1];
		this.color.b = color[2];
	};
	
	
	Particle.prototype.changeRadius = function(radius) {
		this.radius = radius;
	};
	
	
	Particle.prototype.changeAttractionDist = function(distance) {
		this.attractionDist = distance;
		
		_setSpeed.call(this);
	};
	
	
	Particle.prototype.changeAttraction = function(attraction) {
		this.attraction = attraction;
		
		_setSpeed.call(this);
	};
	
	
	Particle.prototype.replace = function(replace) {
		this.x = Math.random()*this.windowW;
		this.y = Math.random()*this.windowH;
		
		if(replace) _setSpeed.call(this);
	};
	
	
	var _setSpeed = function() {
		this.speedX = Math.random()*this.speedMax-this.speedMax/2;
		this.speedY = Math.random()*this.speedMax-this.speedMax/2;
	};
	
	
	var _getDistance = function (particle1) {
		var distance = {};
		distance.distX = particle1.x-this.x;
		distance.distY = particle1.y-this.y;
		
		distance.total = Math.sqrt(distance.distX*distance.distX+distance.distY*distance.distY);
		
		return distance;
	};
	
	
	return Particle;
	
	
})(window);

