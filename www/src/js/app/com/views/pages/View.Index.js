

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
		
		this.nbParticles = 50;
		this.aParticles = [];
		
		this.id = 0;
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		
		this.$.canvas = $(this.canvas);
		
		_initParticles.call(this);
		
		TweenLite.ticker.addEventListener('tick', _draw, this);
	//	TweenLite.ticker.fps(10);
	};
	
	
	Index.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
		_resize.call(this);
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.canvas.width = APP.Main.windowW;
		this.canvas.height = APP.Main.windowH;
	};
	
	
	var _initParticles = function() {
		for(var i=0; i<this.nbParticles; i++) {
			var particle = new APP.Views.Particle(i+1);
			this.aParticles.push(particle);
			particle.init();
		}
	};
	
	
	var _draw = function() {
	//	this.id++;
	//	if(this.id > 5) return false;
		
		APP.Main.stats.begin();
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		var particle = null;
		for(var i=0; i<this.nbParticles; i++) {
			particle = this.aParticles[i];
			particle.draw();
			
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

