

APP.Views = APP.Views || {};


APP.Views.Particle = (function(window){
	
	
	function Particle(id, radius, color, attraction, attractionForce, attractionDistance) {
		APP.View.call(this);
		
		this.name = 'particle-'+id;
		
		this.radius = radius;
		this.color = {
			r : color[0],
			g : color[1],
			b : color[2]
		};
		this.attraction = attraction;
		this.attractionForce = attractionForce;
		this.attractionDist = attractionDistance;
		
		this.speedMax = 2;
		
		this.isParsed = false;
		
		/*
		this.vX = 0;
		this.vY = 0;
		this.s1X = Math.random();
		this.s1Y = Math.random();
		this.s2X = Math.random();
		this.s2Y = Math.random();
		
		this.v1X = Math.random()*10-5;
		this.v1Y = Math.random()*10-5;
		this.v2X = Math.random()*10-5;
		this.v2Y = Math.random()*10-5;
		*/
		
		this.easeX = new APP.Views.Ease(Math.random(), 2, 30, 0);
		this.easeY = new APP.Views.Ease(Math.random(), 2, 30, 0);
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
		/*
		this.vX += Math.random()*0.5;
		this.vY += Math.random()*0.5;
	//	this.vX += this.s1X;
	//	this.vY += this.s1Y;
		
		var t1 = (Math.random()*0.6-0.3);
		var t2 = (Math.random()*0.6-0.3);
		
	//	console.log(Math.cos(this.x));
		this.x = (this.x+Math.cos(this.vX-t1)*this.v1X-Math.sin(this.vX-t2)*this.v2X*(Math.random()*1-0.5));
		this.y = this.y+Math.sin(this.vY-t2)*this.v1Y-Math.cos(this.vY-t1*(Math.random()*1-0.5))*this.v2Y;
		*/
		
		
		
	//	this.x += this.speedX;
	//	this.y += this.speedY;
		
		
		this.easeX.update(0.03);
		this.easeY.update(0.03);
		
		this.x = this.easeX.value*this.windowW;
		this.y = this.easeY.value*this.windowH;
		
		
		
		if(this.x+this.radius > this.windowW || this.x-this.radius < 0) this.speedX *= -1;
		if(this.y+this.radius > this.windowH || this.y-this.radius < 0) this.speedY *= -1;
		
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
			
			if(this.attraction) {
				var vSpeedX = dist.distX/this.attractionForce;
				var vSpeedY = dist.distY/this.attractionForce;
				
				particle1.speedX -= vSpeedX;
				particle1.speedY -= vSpeedY;
				this.speedX += vSpeedX;
				this.speedY += vSpeedY;
			}
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
	
	
	Particle.prototype.changeAttraction = function(attraction) {
		this.attraction = attraction;
		
		_setSpeed.call(this);
	};
	
	
	Particle.prototype.changeAttractionForce = function(attractionForce) {
		this.attractionForce = attractionForce;
		
		_setSpeed.call(this);
	};
	
	
	Particle.prototype.changeAttractionDist = function(distance) {
		this.attractionDist = distance;
		
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

