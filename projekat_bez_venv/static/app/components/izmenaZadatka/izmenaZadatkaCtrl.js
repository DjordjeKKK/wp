(function (angular) {
    let app = angular
        .module("app")
        .controller("izmenaZadatkaCtrl", ["$http", "$state","$stateParams", function ($http, $state,$stateParams) { 
        	let that = this

            this.noviZadatak = {
                "predmet_id":"",
                "naslov":"",
                "sadrzaj":"",
                "datum_provere":""
            }

            this.dobaviZadatak = function(id){
                $http.get("/api/zadaci/" + id).then(
                    function(response){
                        that.noviZadatak = response.data
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.dobaviPredmete = function(){
                $http.get("api/predmeti").then(
                    function(response){
                        that.predmeti = response.data
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

/*             this.srediDatum = function() {
               mysqlDateFormat = that.noviZadatak.datum_provere
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                // console.log(mysqlDateFormat);
                that.noviZadatak.datum_provere = mysqlDateFormat;
              };
*/
            this.izmeniZadatak = function(id){
               // that.srediDatum()
               $http.put("api/zadaci/" + id,that.noviZadatak).then(
                   function(response){
                        $state.go("home")
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.sacuvaj = function(){
                that.izmeniZadatak($stateParams["id"])
            }
            
            this.dobaviPredmete()
            this.dobaviZadatak($stateParams["id"])

    }]);
})(angular);
