// -----------------------------------------------------------------------------
// filtersInterface keeps current filters value
// -----------------------------------------------------------------------------

class FiltersInterfaceService {
    constructor() {
        this._hotelName = null;
        this._minStars = null;
        this._costMin = null;
        this._costMax = null;
        this._minRating = null;
    }

    setHotelName(hotelName) {
        // we want to keep the name lowercased for easier comparison
        this._hotelName = hotelName.toLowerCase();
    }

    setMinimumStars(stars) {
        this._minStars = Number.parseInt(stars, 10);
    }

    setCostRange(minimum, maximum) {
        this._costMin = Number.parseInt(minimum, 10);
        this._costMax = Number.parseInt(maximum, 10);
    }

    setMinimumRating(rating) {
        this._minRating = Number.parseFloat(rating);
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

        // check if cost meets the range
        if (_.isInteger(this._costMin) && _.isInteger(this._costMax)) {
            const costNumber = Number.parseFloat(hotel.MinCost);
            if (costNumber > this._costMax || costNumber < this._costMin) {
                return false;
            }
        }

        // check minimum rating
        if (_.isNumber(this._minRating)) {
            if (Number.parseFloat(hotel.UserRating) < this._minRating) {
                return false;
            }
        }

        return true;
    }
}

angular.module('filtersModule').service(
    'filtersInterface',
    FiltersInterfaceService
);
