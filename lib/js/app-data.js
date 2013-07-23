/* ------------------------------------------------------------------------------ */
/* App - data */
/* ------------------------------------------------------------------------------ */
window.App = (function(app){
	
	//create empty App obj if none found
	var App = app || {};
	
	/* ------------------------------------------------------------------------------ */
	/* data */
	App.data = {
		
		/* ------------------------------------------------------------------------------ */
		//function - getPage
		getPage: function(targetURL, dir){
			//vars
			var thisObj = this,										//ref to data obj
				request,											//request status
				url = targetURL;									//request url
						
			//abort if no url or in request already
			if (!url || this.inRequest) return false;
			
			//otherwise set in request status and show loader
			this.inRequest = true;
			//App.utils.popmsg( 'show', {} );
			
			//make request call			
			request = $.ajax({
				url:		url,
				type:		'GET',
				dataType:	'html',
				success:	function(data, textStatus, jqXHR) {  
								//alert('getPage: success');
								console.log('getPage: success');
								//console.log(data);
								//App.view.slider.slidePage( $(data) );
								App.view.slider.slidePageFrom( $(data), dir );	
							},
				complete:	function(jqXHR, textStatus) { 
								//alert('getPage: complete');
								console.log('getPage: complete');
								thisObj.inRequest = false;
								//hide loader
								//App.utils.popmsg(); 
							},
				error:		function(jqXHR, textStatus, errorThrown) { 
								//alert('getPage: error', textStatus, errorThrown);
								console.log('getPage: error', textStatus, errorThrown);
							}
			});				
		},
					
		/* ------------------------------------------------------------------------------ */
		//function - init data obj
		init: function() {
			//alert('app.data.init()');
		}
			
	}
	
	return App;
	
})(window.App);
