(function (angular) {
    let app = angular
        .module("app")
        .controller("homePageCtrl", ["$http", "$state", function ($http, $state) { 
            let that = this
            
            let studenti = []
            let predmeti = []

            this.dobaviPredmete = function() {
                $http.get("/api/predmeti").then(
                    function(response){
                        that.predmeti = response.data
                        // console.log(response.data)
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.dobaviStudente = function() {
                $http.get("/api/studenti").then(
                    function(response){
                        that.studenti = response.data
                        // console.log(response.data)
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.obrisiPredmet = function(id) {
                $http.delete("/api/predmeti/" + id).then(
                    function(response){
                        // console.log(response)
                        that.dobaviPredmete()
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.obrisiStudenta = function(id) {
                $http.delete("/api/studenti/" + id).then(
                    function(response){
                        // console.log(response)
                        that.dobaviStudente()
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.dobaviPredmete()
            this.dobaviStudente()

     

    }]);
})(angular);






