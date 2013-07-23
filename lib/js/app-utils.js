/* ------------------------------------------------------------------------------ */
/* App - utils */
/* ------------------------------------------------------------------------------ */
window.App = (function(app){
	
	//create empty App obj if none found
	var App = app || {};

	/* ------------------------------------------------------------------------------ */
	/* utils - logger */
	window.Logger = function() {
		var oldConsoleLog = null,
			pub = {};
		pub.enableLogger = function enableLogger() {
			if(oldConsoleLog == null) return;
			window['console']['log'] = oldConsoleLog;
		};
		pub.disableLogger = function disableLogger() {
			oldConsoleLog = console.log;
			window['console']['log'] = function() {};
		};
		return pub;
	}();
	
	/* ------------------------------------------------------------------------------ */
	/* utils - Platform */
	window.Platform = new function(){
		//detecting functions
		function checkPlatform(os) { return (navigator.userAgent.toLowerCase().indexOf(os.toLowerCase())>=0); }
		function checkEvent(e) { return (e in document.documentElement); }
		//add properties
		this.iPhone = checkPlatform('iPhone');
		this.iPad = checkPlatform('iPad');
		this.iPod = checkPlatform('iPod');
		this.iOS = this.iPhone||this.iPad||this.iPod;
		this.android = checkPlatform('android');
		this.touchOS = checkEvent('ontouchstart');
		this.debugLog = function(){
			console.log('iPhone: '+this.iPhone);
			console.log('iPad: '+this.iPad);
			console.log('iPod: '+this.iPod);
			console.log('iOS: '+this.iOS);
			console.log('android: '+this.android);
			console.log('touchOS: '+this.touchOS);
		}
		//return self
		return this;
	}
	
	/* ------------------------------------------------------------------------------ */
	/* utils - alert */
	if ( !window.Platform.iOS && !window.Platform.android ) {
		window.alert = function(msg){ console.log('window.alert: '+msg); }
	}
	
	/* ------------------------------------------------------------------------------ */
	/* utils */
	App.utils = {
				
		/* ------------------------------------------------------------------------------ */
		/*addDeviceClass*/
		addDeviceClass:	function() {
			var p = Platform;
				$html = $('html:eq(0)');
			$html.removeClass('no-js').addClass('js');
			if (p.touchOS) {
				$html.addClass('touch');
			}
			else {
				$html.addClass('no-touch');
			}
			if (p.iOS) {
				$html.addClass('ios');
				if (p.iPhone) {	$html.addClass('iphone'); }
				else if (p.iPod) {	$html.addClass('ipod'); }
				else if (p.iPad) {	$html.addClass('ipad'); }
			} 
			else if (p.android) {
				$html.addClass('android');
			}
		},	
		
		/* ------------------------------------------------------------------------------ */
		/*checkConnection*/
		checkConnection: function() {
			//exit if no API
			if ( !navigator.network || !navigator.network.connection ) return false;
			
			//vars
			var networkState = navigator.network.connection.type;
			
			//return state
			return networkState;
		},
		
		/* ------------------------------------------------------------------------------ */
		/*reloadApp*/
		reloadApp: function() {
			//update to main app file address without page id
			window.location = String(window.location).substr(0, String(window.location).indexOf('#'));	
		},
		
		/* ------------------------------------------------------------------------------ */
		/*init*/
		init: function() {
			//alert('app.utils.init()');
			this.addDeviceClass();
		}
		
	};
	
	return App;
	
})(window.App);