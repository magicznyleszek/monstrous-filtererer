// -----------------------------------------------------------------------------
// hotelsCtrl -- displays a list of hotels with fitlers
// -----------------------------------------------------------------------------

class HotelsCtrl {
    static initClass() {
        HotelsCtrl.$inject = [
            '$window',
            'hotelsSortOptions'
        ];
    }

    constructor($window, hotelsSortOptions) {
        if (typeof $window.hotelsData === 'object') {
            this.list = $window.hotelsData.Establishments;
        } else {
            this.list = [];
        }

        this.selectedSortOption = hotelsSortOptions.options[0];
        this.sortOptions = hotelsSortOptions.options;
        this.nameFilterValue = '';
    }

    onNameFilterChange() {
        console.log(this.nameFilterValue);
    }

    onSortChange() {
        console.log(this.selectedSortOption);
    }
}

HotelsCtrl.initClass();

angular.module('hotelsModule').controller('hotelsCtrl', HotelsCtrl);
