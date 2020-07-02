(function (angular) {
    let app = angular
        .module("app")
        .controller("dodavanjeStudentaCtrl", ["$http", "$state", function ($http, $state) { //korisnikFormaCtrl
        	let that = this
            
            this.noviStudent = {
                "indeks":"",
                "ime":"",
                "prezime":""
            }

            this.dodajStudenta = function(){
                $http.post("api/studenti",that.noviStudent).then(
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





