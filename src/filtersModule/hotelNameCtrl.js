// -----------------------------------------------------------------------------
// filtersHotelNameCtrl -- handles a text input value for hotel name
// -----------------------------------------------------------------------------

class FiltersHotelNameController {
    static initClass() {
        FiltersHotelNameController.$inject = [
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

FiltersHotelNameController.initClass();

angular.module('filtersModule').controller(
    'filtersHotelNameCtrl',
    FiltersHotelNameController
);
