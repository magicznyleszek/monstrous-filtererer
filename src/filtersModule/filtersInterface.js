// -----------------------------------------------------------------------------
// filtersInterface keeps current filters value
// -----------------------------------------------------------------------------

class FiltersInterfaceService {
    static initClass() {
        FiltersInterfaceService.$inject = [];
    }

    constructor() {
        this._hotelName = null;
        this._minStars = null;
    }

    setHotelName(hotelName) {
        // we want to keep the name lowercased for easier comparison
        this._hotelName = hotelName.toLowerCase();
    }

    setMinimumStars(stars) {
        console.log('setMinimumStars', stars);
        this._minStars = Number.parseInt(stars, 10);
    }

    matchHotel(hotel) {
        // check name
        if (!_.isEmpty(this._hotelName)) {
            if (!hotel.Name.toLowerCase().includes(this._hotelName)) {
                return false;
            }
        }

        // check minimum stars
        if (_.isInteger(this._minStars)) {
            if (Number.parseInt(hotel.Stars, 10) < this._minStars) {
                return false;
            }
        }

        return true;
    }
}

FiltersInterfaceService.initClass();

angular.module('filtersModule').service(
    'filtersInterface',
    FiltersInterfaceService
);
