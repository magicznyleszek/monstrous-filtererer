// -----------------------------------------------------------------------------
// filtersStarsCtrl -- handles a select input value for filtersStarsOptions
// -----------------------------------------------------------------------------

class FiltersStarsController {
    static initClass() {
        FiltersStarsController.$inject = [
            'filtersStarsOptions',
            'filtersInterface'
        ];
    }

    constructor(
        filtersStarsOptions,
        filtersInterface
    ) {
        this._filtersInterface = filtersInterface;
        this.selectedOption = filtersStarsOptions.options[0];
        this.options = filtersStarsOptions.options;
        this.dispatchValue();
    }

    dispatchValue() {
        this._filtersInterface.setMinimumStars(this.selectedOption.count);
    }
}

FiltersStarsController.initClass();

angular.module('filtersModule').controller(
    'filtersStarsCtrl',
    FiltersStarsController
);
