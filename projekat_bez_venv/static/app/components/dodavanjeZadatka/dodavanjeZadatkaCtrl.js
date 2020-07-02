(function (angular) {
    let app = angular
        .module("app")
        .controller("dodavanjeZadatkaCtrl", ["$http", "$state", function ($http, $state) { //korisnikFormaCtrl
        	let that = this

            this.noviZadatak = {
                "predmet_id":"",
                "naslov":"",
                "sadrzaj":"",
                "datum_provere":""
            }

            this.dobaviPredmete = function(){
                $http.get("api/predmeti").then(
                    function(response){
                        that.predmeti = response.data
                        console.log(response.data)
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

/*            this.srediDatum = function() {
                mysqlDateFormat = that.noviZadatak.datum_provere
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                // console.log(mysqlDateFormat);
                that.noviZadatak.datum_provere = mysqlDateFormat;
            }
*/
            this.dodajZadatak = function(){
                //that.srediDatum()
                $http.post("api/zadaci",that.noviZadatak).then(
                    function(response){
                        $state.go("home")
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }
    
            
            this.dobaviPredmete()

    }]);
})(angular);