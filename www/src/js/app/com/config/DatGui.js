

APP.DatGui = (function(window){
	
	
	function DatGui() {
		this.$ = {};
		this.gui = null;
	}
	
	
	DatGui.prototype.init = function() {
		this.gui = new dat.GUI({
			width : 300
		});
		var nbParticles = this.gui.add(APP.Views.Index, 'nbParticles', 5, 200).step(1);
		this.gui.addColor(APP.Views.Index, 'backgroundColor');
		var particleColor = this.gui.addColor(APP.Views.Index, 'particleColor');
		var particleRadius = this.gui.add(APP.Views.Index, 'particleRadius', 0.5, 3).step(0.5);
		var attraction = this.gui.add(APP.Views.Index, 'attraction');
		var attractionForce = this.gui.add(APP.Views.Index, 'attractionForce', 1, 100).step(1);
		var attractionDistance = this.gui.add(APP.Views.Index, 'attractionDistance', 30, 150).step(1);
		this.gui.add(APP.Views.Index, 'replaceParticles');
		
		particleColor.onChange(APP.Views.Index.manageParticles.bind(APP.Views.Index, 'color'));
		particleRadius.onChange(APP.Views.Index.manageParticles.bind(APP.Views.Index, 'radius'));
		attraction.onChange(APP.Views.Index.manageParticles.bind(APP.Views.Index, 'attraction'));
		attractionForce.onChange(_manageAttractionForce.bind(this));
		attractionDistance.onChange(APP.Views.Index.manageParticles.bind(APP.Views.Index, 'attractionDist'));
		
		this.attractionController = this.gui.__controllers[4];
		this.attractionForceController = this.gui.__controllers[5];
	};
	
	
	var _manageAttractionForce = function(v) {
		if(!this.attractionController.getValue()) this.attractionController.setValue(true);
		
		APP.Views.Index.manageParticles('attractionForce');
	};
	
	
	return new DatGui();
	
	
})(window);

