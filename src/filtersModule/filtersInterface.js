// -----------------------------------------------------------------------------
// filtersInterface keeps current filters value
// -----------------------------------------------------------------------------

class FiltersInterfaceService {
    static initClass() {
        FiltersInterfaceService.$inject = [];
    }

    constructor() {
        this._hotelName = null;
    }

    setHotelName(hotelName) {
        // we want to keep the name lowercased for easier comparison
        this._hotelName = hotelName.toLowerCase();
    }

    matchHotel(hotel) {
        let matchesByName = true;
        if (!_.isEmpty(this._hotelName)) {
            matchesByName = hotel.Name.toLowerCase().includes(this._hotelName);
        }

        return matchesByName;
    }
}

FiltersInterfaceService.initClass();

angular.module('filtersModule').service(
    'filtersInterface',
    FiltersInterfaceService
);
