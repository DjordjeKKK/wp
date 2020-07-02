(function(angular){
   
    let app = angular.module("app", ["ui.router"]);

    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

        $stateProvider.state({
            name: "home",
            url: "/", 
            templateUrl: "app/components/homePage/homePage.tpl.html", 
            controller: "homePageCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: "izmenaStudenta",
            url: "/izmenaStudenta/{id}", 
            templateUrl: "app/components/izmenaStudenta/izmenaStudenta.tpl.html", 
            controller: "izmenaStudentaCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: "izmenaPredmeta",
            url: "/izmenaPredmeta/{id}", 
            templateUrl: "app/components/izmenaPredmeta/izmenaPredmeta.tpl.html", 
            controller: "izmenaPredmetaCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: "dodavanjeStudenta",
            url: "/dodavanjeStudenta", 
            templateUrl: "app/components/dodavanjeStudenta/dodavanjeStudenta.tpl.html", 
            controller: "dodavanjeStudentaCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: "dodavanjePredmeta",
            url: "/dodavanjePredmeta", 
            templateUrl: "app/components/dodavanjePredmeta/dodavanjePredmeta.tpl.html", 
            controller: "dodavanjePredmetaCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: "zadaci",
            url: "/zadaci", 
            templateUrl: "app/components/zadaci/zadaci.tpl.html", 
            controller: "zadaciCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: "dodavanjeZadatka",
            url: "/dodavanjeZadatka", 
            templateUrl: "app/components/dodavanjeZadatka/dodavanjeZadatka.tpl.html", 
            controller: "dodavanjeZadatkaCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: "izmenaZadatka",
            url: "/izmenaZadatka/{id}", 
            templateUrl: "app/components/izmenaZadatka/izmenaZadatka.tpl.html", 
            controller: "izmenaZadatkaCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: "ocene",
            url: "/ocene", 
            templateUrl: "app/components/ocene/ocene.tpl.html", 
            controller: "oceneCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: "dodavanjeOcene",
            url: "/dodavanjeOcene", 
            templateUrl: "app/components/dodavanjeOcene/dodavanjeOcene.tpl.html", 
            controller: "dodavanjeOceneCtrl", 
            controllerAs: "pctrl" 
        })
        .state({
            name: 'login',
            url: '/login',
            templateUrl: 'app/components/login/login.tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'lc'
        })
        $urlRouterProvider.otherwise("/")
    }])
})(angular);