

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
		
		this.aParticles = [];
		
		this.id = 0;
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		
		this.nbParticles = 100;
		this.backgroundColor = '#ffffff';
	//	this.particleColor = '#000000';
		this.particleColor = [0, 0, 0];
		this.particleRadius = 1;
		this.distanceMax = 100;
		this.attraction = 10;
		
		this.$.canvas = $(this.canvas);
		
		_initParticles.call(this);
		
		TweenLite.ticker.addEventListener('tick', _draw, this);
	//	TweenLite.ticker.fps(5);
	};
	
	
	Index.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
		_resize.call(this);
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	Index.prototype.changeParticleColor = function() {
		this.particleColor[0] = parseInt(this.particleColor[0]);
		this.particleColor[1] = parseInt(this.particleColor[1]);
		this.particleColor[2] = parseInt(this.particleColor[2]);
		
		for(i=0; i<this.nbParticles; i++) {
			this.aParticles[i].changeColor(this.particleColor);
		}
	};
	
	
	Index.prototype.changeParticleRadius = function() {
		for(i=0; i<this.nbParticles; i++) {
			this.aParticles[i].changeRadius(this.particleRadius);
		}
	};
	
	
	Index.prototype.changeParticleDistMax = function() {
		for(i=0; i<this.nbParticles; i++) {
			this.aParticles[i].changeDistMax(this.distanceMax);
		}
	};
	
	
	Index.prototype.changeParticleAttraction = function() {
		var attraction = 100000/this.attraction;
		
		for(i=0; i<this.nbParticles; i++) {
			this.aParticles[i].changeAttraction(attraction);
		}
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.canvas.width = APP.Main.windowW;
		this.canvas.height = APP.Main.windowH;
		
		for(var i=0; i<this.nbParticles; i++) {
			this.aParticles[i].resize();
		}
	};
	
	
	var _initParticles = function() {
		var attraction = 100000/this.attraction;
		for(var i=0; i<this.nbParticles; i++) {
			var particle = new APP.Views.Particle(i+1, this.particleRadius, this.particleColor, this.distanceMax, attraction);
			this.aParticles.push(particle);
			particle.init();
		}
	};
	
	
	var _draw = function() {
	//	this.id++;
	//	if(this.id > 5) return false;
		
		APP.Main.stats.begin();
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.context.beginPath();
		this.context.rect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillStyle = this.backgroundColor;
		this.context.fill();
		
		var particle = null;
		for(var i=0; i<this.nbParticles; i++) {
			particle = this.aParticles[i];
			particle.draw(this.particleColor);
			
			for(var j=0; j<this.nbParticles; j++) {
				if(i != j) this.aParticles[j].drawLine(particle);
			}
			particle.setParse(true);
		}
		
		for(i=0; i<this.nbParticles; i++) {
			this.aParticles[i].setParse(false);
		}
		
		APP.Main.stats.end();
	};
	
	
	return new Index();
	
	
})(window);

