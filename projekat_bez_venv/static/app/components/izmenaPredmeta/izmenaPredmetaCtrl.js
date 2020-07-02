(function (angular) {
    let app = angular
        .module("app")
        .controller("izmenaPredmetaCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) { 
        	let that = this
            
            this.dobaviPredmet = function(id){
                $http.get("/api/predmeti/" + id).then(
                    function(response){
                        that.noviPredmet = response.data
                        console.log(response.data)
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.izmeniPredmet = function(id){
                $http.put("/api/predmeti/" + id,that.noviPredmet).then(
                    function(response){
                        console.log(response.data)
                        $state.go("home")
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.sacuvaj = function(){
                that.izmeniPredmet($stateParams["id"])
            }

            this.dobaviPredmet($stateParams["id"])
     

    }]);
})(angular);