/**
 * Project: Luzes IHM
 * Author: Shermam Xavier Miranda
 * email: shermam.miranda@hotmail.com 
 */
(function(){

	/**
	* Home Controller
	*
	* Controller that manages the Home page
	*/
	angular.module('app').controller('HomeController', [
		'SpeechService', 
		'AnalyseTextService', 
		'ConnectToPlcService', 
		HomeController]);

	/**
	 * Home Controller Function
	 */
	function HomeController(SpeechService, AnalyseTextService, ConnectToPlcService) {

		var recognition = SpeechService(function (texto) {
			console.log(ConnectToPlcService(AnalyseTextService(texto)));
		})
		
		//Sets the home variable to the current instance of the controller
		var home = this;

		home.started = false;

		home.speak = function () {

			if (!home.started) {
				recognition.start();
				home.started = true;
			} else {
				recognition.stop();
				home.started = false;
			}
		}

		

	}

})()