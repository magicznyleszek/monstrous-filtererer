// -----------------------------------------------------------------------------
// hotelNameCtrl -- handles a text input value for hotel name
// -----------------------------------------------------------------------------

class HotelNameController {
    static initClass() {
        HotelNameController.$inject = [
            'filtersInterface'
        ];
    }

    constructor(
        filtersInterface
    ) {
        this._filtersInterface = filtersInterface;
        this.value = '';
        this.dispatchValue();
    }

    dispatchValue() {
        this._filtersInterface.setHotelName(this.value);
    }
}

HotelNameController.initClass();

angular.module('filtersModule').controller(
    'hotelNameCtrl',
    HotelNameController
);
