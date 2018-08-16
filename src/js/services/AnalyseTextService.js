(function(){
	
	angular.module('app').factory('AnalyseTextService', AnalyseTextService);

	function AnalyseTextService() {
		
		return function (text) {

			var commands = 'NA';

			if (/desliga/i.test(text)) {

				commands = 'cmdDesligLampK1.4=on&cmdDesligLampK2.4=on';

			} else if(/liga/i.test(text)) {

				commands = 'cmdLigLampK1.4=on&cmdLigLampK2.4=on';

			}

			return commands;
		}
	}
})()