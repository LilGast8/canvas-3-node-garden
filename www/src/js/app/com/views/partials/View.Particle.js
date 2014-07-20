

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
	//	this.color = 'rgba(50, 50, 50, 0.5)';
		this.color = 50;
		this.opacity = 1;
	//	this.colorLine = 50;
		this.distMax = 150;
		
		this.speedX = Math.random()*2-1;
		this.speedY = Math.random()*2-1;
		
		this.isParsed = false;
		
		this.draw();
	};
	
	
	Particle.prototype.bindEvents = function() {
		
	};
	
	
	Particle.prototype.draw = function() {
		this.x += this.speedX;
		this.y += this.speedY;
		
		/*
		if(this.x-this.radius > this.windowW) this.x = -this.radius;
		else if(this.x+this.radius < 0) this.x = this.windowW+this.radius;
		if(this.y-this.radius > this.windowH) this.y = -this.radius;
		else if(this.y+this.radius < 0) this.y = this.windowH+this.radius;
		*/
		
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
		
		if(dist <= this.distMax) {
			var opacity = (Math.cos(Math.PI*dist/this.distMax)+1)/2*0.5;
			
			this.context.beginPath();
			this.context.moveTo(particle1.x, particle1.y);
			this.context.lineTo(this.x, this.y);
			this.context.lineWidth = 1;
			this.context.lineCap = 'round';
			this.context.strokeStyle = 'rgba('+this.color+', '+this.color+', '+this.color+', '+opacity+')';
			this.context.stroke();
			this.context.closePath();
		}
	};
	
	
	Particle.prototype.setParse = function(val) {
		this.isParsed = val;
	};
	
	
	var _getDistance = function (particle1) {
		var distX = particle1.x-this.x;
		var distY = particle1.y-this.y;
		
		var dist = Math.sqrt(distX*distX+distY*distY);
		
		return dist;
	};
	
	
	return Particle;
	
	
})(window);

