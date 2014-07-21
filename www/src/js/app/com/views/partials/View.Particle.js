

APP.Views = APP.Views || {};


APP.Views.Particle = (function(window){
	
	
	function Particle(id) {
		APP.View.call(this);
		
		this.name = 'particle-'+id;
	}
	
	
	Particle.prototype = Object.create(APP.View.prototype);
	Particle.prototype.constructor = Particle;
	
	
	Particle.prototype.initElt = function() {
		this.context = APP.Views.Index.context;
		
		this.windowW = APP.Main.windowW;
		this.windowH = APP.Main.windowH;
		
		this.x = Math.random()*this.windowW;
		this.y = Math.random()*this.windowH;
		this.radius = 1;
		this.color = 0;
		this.opacity = 1;
		this.distMax = 100;
		
		this.speed = 2;
		this.speedX = Math.random()*this.speed-this.speed/2;
		this.speedY = Math.random()*this.speed-this.speed/2;
		
		this.isParsed = false;
		
		this.draw();
	};
	
	
	Particle.prototype.bindEvents = function() {
		
	};
	
	
	Particle.prototype.draw = function() {
		this.x += this.speedX;
		this.y += this.speedY;
		
		if(this.x+this.radius > this.windowW || this.x-this.radius < 0) this.speedX = -this.speedX;
		if(this.y+this.radius > this.windowH || this.y-this.radius < 0) this.speedY = -this.speedY;
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
		this.context.fillStyle = 'rgba('+this.color+', '+this.color+', '+this.color+', '+this.opacity+')';
		this.context.fill();
	};
	
	
	Particle.prototype.drawLine = function(particle1) {
		if(this.isParsed) return false;
		
		var dist = _getDistance.call(this, particle1);
		
		if(dist.total <= this.distMax) {
			var opacity = (Math.cos(Math.PI*dist.total/this.distMax)+1)/2*0.2;
			
			this.context.beginPath();
			this.context.moveTo(particle1.x, particle1.y);
			this.context.lineTo(this.x, this.y);
			this.context.lineWidth = 1;
			this.context.lineCap = 'round';
			this.context.strokeStyle = 'rgba('+this.color+', '+this.color+', '+this.color+', '+opacity+')';
			this.context.stroke();
			this.context.closePath();
			
			var vSpeedX = dist.distX/20000;
			var vSpeedY = dist.distY/20000;
			
			particle1.speedX -= vSpeedX;
			particle1.speedY -= vSpeedY;
			this.speedX += vSpeedX;
			this.speedY += vSpeedY;
		}
	};
	
	
	Particle.prototype.setParse = function(val) {
		this.isParsed = val;
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

