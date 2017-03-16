// -----------------------------------------------------------------------------
// hotelsCtrl -- displays a filtered list of hotels
// -----------------------------------------------------------------------------

class HotelsController {
    static initClass() {
        HotelsController.$inject = [
            '$window',
            'sorterInterface',
            'filtersInterface'
        ];
    }

    constructor(
        $window,
        sorterInterface,
        filtersInterface
    ) {
        this._$window = $window;
        this._sorterInterface = sorterInterface;

        // THE list
        this.list = this._getListFromBackendData();

        // sorter handling
        this.currentSort = null;
        this._refreshSort();
        this._sorterInterface.registerSortObserver(this._refreshSort.bind(this));

        // use the function from interface
        this.matchHotel = filtersInterface.matchHotel.bind(filtersInterface);
    }

    chooseHotel(hotel) {
        this._$window.alert(
            `You've chosen ${hotel.Name}. An excellent choice, may I say.`
        );
    }

    _getListFromBackendData() {
        if (typeof this._$window.hotelsData === 'object') {
            return this._$window.hotelsData.Establishments;
        } else {
            return [];
        }
    }

    _refreshSort() {
        this.currentSort = this._sorterInterface.getSort();
    }
}

HotelsController.initClass();

angular.module('hotelsModule').controller('hotelsCtrl', HotelsController);
