// -----------------------------------------------------------------------------
// hotelsCtrl -- displays a list of hotels with fitlers
// -----------------------------------------------------------------------------

class HotelsCtrl {
    static initClass() {
        HotelsCtrl.$inject = ['$window'];
    }

    constructor($window) {
        this.list = [];
        console.log($window.hotelsData);
    }
}

HotelsCtrl.initClass();

angular.module('hotelsModule').controller('hotelsCtrl', HotelsCtrl);
