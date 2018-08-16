(function(){
	
	angular.module('app').factory('SpeechService', SpeechService);

	function SpeechService() {
		
		return function (callback) {

			var recognition = new webkitSpeechRecognition();
			recognition.lang = "pt-BR";

			recognition.onresult = function(event) {
				if (event.results.length > 0) {
					var text = event.results[0][0].transcript;
					callback(text);
				}
			}

			return recognition;
		}
	}
})()