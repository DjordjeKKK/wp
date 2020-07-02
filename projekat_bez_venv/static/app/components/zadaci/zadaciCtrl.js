(function (angular) {
    let app = angular
        .module("app")
        .controller("zadaciCtrl", ["$http", "$state", function ($http, $state) { //korisnikFormaCtrl
        	let that = this

            let zadaci = []
            let predmeti = []
            let imena = ["imena"]
            
            this.obrisiZadatak = function(id) {
                $http.delete("/api/zadaci/" + id).then(
                    function(response){
                        that.dobaviZadatke()
                    },
                    function(reason){
                        console.log(reason)
                    }
                )
            }

            this.dobaviZadatke = function(){
                $http.get("api/zadaci").then(
                    function(response){
                        that.zadaci = response.data
                        
                        // that.nadjiPredmet()
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

            // this.nadjiPredmet = function(){
            //     for (z in that.zadaci){
            //         for (p in that.predmeti){
            //             if (p.id === z.predmet_id){
            //                 that.imena.push(p.naziv)
            //                 console.log("uspesno ubaceno ime u listu")
            //             }else{
            //                 that.imena.push("###")
            //             }
            //         }
            //     }
                
            // }
            
            this.dobaviZadatke()
            that.dobaviPredmete()
            
    }]);
})(angular);