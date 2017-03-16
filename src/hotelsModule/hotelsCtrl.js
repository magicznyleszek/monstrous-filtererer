// -----------------------------------------------------------------------------
// hotelsCtrl -- displays a list of hotels with fitlers
// -----------------------------------------------------------------------------

class HotelsCtrl {
    static initClass() {
        HotelsCtrl.$inject = [
            '$window',
            'sorterInterface',
            'hotelsStarsOptions'
        ];
    }

    constructor(
        $window,
        sorterInterface,
        hotelsStarsOptions
    ) {
        this._$window = $window;
        this._sorterInterface = sorterInterface;

        this.list = this._getListFromBackendData();

        this.currentSort = null;
        this._refreshSort();

        this.selectedStarsOption = hotelsStarsOptions.options[0];
        this.starsOptions = hotelsStarsOptions.options;

        this.nameFilterValue = '';

        this._sorterInterface.registerSortObserver(this._refreshSort.bind(this));
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

HotelsCtrl.initClass();

angular.module('hotelsModule').controller('hotelsCtrl', HotelsCtrl);
