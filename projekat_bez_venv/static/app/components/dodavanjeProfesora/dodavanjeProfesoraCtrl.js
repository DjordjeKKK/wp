(function (angular) {
    let app = angular
        .module("app")
        .controller("dodavanjeProfesoraCtrl", ["$http", "$state", function ($http, $state) { //korisnikFormaCtrl
        	let that = this
            
            this.noviProfesor = {
                "id":"",
                "ime":"",
                "prezime":"",
                "titula":""
            }

            this.dodajProfesora = function(){
                $http.post("api/profesori",that.noviProfesor).then(
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





