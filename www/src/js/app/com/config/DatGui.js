

APP.DatGui = (function(window){
	
	
	function DatGui() {
		this.$ = {};
		this.gui = null;
	}
	
	
	DatGui.prototype.init = function() {
		this.gui = new dat.GUI({
			width : 300
		});
	//	var nbParticles = this.gui.add(APP.Views.Index, 'nbParticles', 5, 200).step(1);
		this.gui.addColor(APP.Views.Index, 'backgroundColor');
		var particleColor = this.gui.addColor(APP.Views.Index, 'particleColor');
		var particleRadius = this.gui.add(APP.Views.Index, 'particleRadius', 0.5, 3).step(0.5);
		var attractionDistance = this.gui.add(APP.Views.Index, 'attractionDistance', 30, 200).step(1);
		var attraction = this.gui.add(APP.Views.Index, 'attraction', 1, 100).step(1);
		
		particleColor.onChange(APP.Views.Index.manageParticles.bind(APP.Views.Index, 'color'));
		particleRadius.onChange(APP.Views.Index.manageParticles.bind(APP.Views.Index, 'radius'));
		attractionDistance.onChange(APP.Views.Index.manageParticles.bind(APP.Views.Index, 'attractionDist'));
		attraction.onChange(APP.Views.Index.manageParticles.bind(APP.Views.Index, 'attraction'));
	};
	
	
	return new DatGui();
	
	
})(window);

