(function (angular) {
    let app = angular
        .module("app")
        .controller("oceneCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) { //korisnikFormaCtrl
            let that = this
            let ocene = []
            
            this.dobaviOcene = function(){
                $http.get("api/ocene").then(
                    function(response){
                        that.ocene = response.data
                        console.log(that.ocene)
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.dobaviOcene()


     

    }]);
})(angular);