

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	Index.prototype.bindEvents = function() {
		
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	return new Index();
	
	
})(window);

