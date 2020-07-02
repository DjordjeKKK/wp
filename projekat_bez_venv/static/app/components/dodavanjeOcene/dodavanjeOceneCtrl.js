(function (angular) {
    let app = angular
        .module("app")
        .controller("dodavanjeOceneCtrl", ["$http", "$state", function ($http, $state) { 
        	let that = this

            this.novaOcena = {
                "student_id":"",
                "predmet_id":"",
                "ocena":"",
                "datum_ocene":""
            }

            this.dobaviZadatke = function(){
                $http.get("api/zadaci").then(
                    function(response){
                        that.zadaci = response.data
                        console.log(response.data)
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.dobaviStudente = function(){
                $http.get("api/studenti").then(
                    function(response){
                        that.studenti = response.data
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.dodajOcenu = function(){
                $http.post("api/ocene",that.novaOcena).then(
                    function(response){
                        $state.go("home")
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }    

            this.srediDatum = function() {
                let datum = new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                // console.log(mysqlDateFormat);
                that.novaOcena.datum_ocene = datum;
            }
            

            this.dobaviStudente()
            this.dobaviZadatke()
            that.srediDatum()

    }]);
})(angular);