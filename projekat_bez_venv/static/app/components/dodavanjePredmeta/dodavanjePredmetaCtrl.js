(function (angular) {
    let app = angular
        .module("app")
        .controller("dodavanjePredmetaCtrl", ["$http", "$state", function ($http, $state) { //korisnikFormaCtrl
        	let that = this
            
            this.noviPredmet = {
                "ime":"",
                "prezime":""
            }

            this.dodajPredmet = function(){
                $http.post("api/predmeti",that.noviPredmet).then(
                    function(response){
                        $state.go("home")
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }
    }]);
})(angular);





