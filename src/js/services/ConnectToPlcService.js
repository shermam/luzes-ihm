(function(){
	
	angular.module('app').factory('ConnectToPlcService', ['$http', 'Constants', ConnectToPlcService]);

	function ConnectToPlcService($http, Constants) {
		
		return function (commands) {

			if (commands === 'NA') {
				alert('Comando não reconhecido');
				return;
			}

			return $http.get(Constants.LUZES_API_URL, {
				params : {
					'commands' : commands
				}
			})
		}
	}

})()