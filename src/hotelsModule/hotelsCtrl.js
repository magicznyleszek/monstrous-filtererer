// -----------------------------------------------------------------------------
// hotelsCtrl -- displays a list of hotels with fitlers
// -----------------------------------------------------------------------------

class HotelsCtrl {
    static initClass() {
        HotelsCtrl.$inject = [
            '$window',
            'hotelsSortOptions',
            'hotelsStarsOptions'
        ];
    }

    constructor(
        $window,
        hotelsSortOptions,
        hotelsStarsOptions
    ) {
        if (typeof $window.hotelsData === 'object') {
            this.list = $window.hotelsData.Establishments;
        } else {
            this.list = [];
        }

        this.selectedSortOption = hotelsSortOptions.options[0];
        this.sortOptions = hotelsSortOptions.options;

        this.selectedStarsOption = hotelsStarsOptions.options[0];
        this.starsOptions = hotelsStarsOptions.options;

        this.nameFilterValue = '';
    }
}

HotelsCtrl.initClass();

angular.module('hotelsModule').controller('hotelsCtrl', HotelsCtrl);
