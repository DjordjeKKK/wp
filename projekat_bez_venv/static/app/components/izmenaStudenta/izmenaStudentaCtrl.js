(function (angular) {
    let app = angular
        .module("app")
        .controller("izmenaStudentaCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) { 
        	let that = this
            
            this.dobaviStudenta = function(id){
                $http.get("/api/studenti/" + id).then(
                    function(response){
                        that.noviStudent = response.data
                        console.log(response.data)
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.izmeniStudenta = function(id){
                $http.put("/api/studenti/" + id,that.noviStudent).then(
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
                that.izmeniStudenta($stateParams["id"])
            }

            this.dobaviStudenta($stateParams["id"])
     

    }]);
})(angular);