(function () {


    /**
     * @description Declaration of the main angular modulo
     */
    angular.module('app', ['ngMaterial', 'ui.router', 'ngMessages', 'angular.filter'])

    .run(function () {
        console.log("Rodou!!!");
    })

})()