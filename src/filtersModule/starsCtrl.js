// -----------------------------------------------------------------------------
// filtersStarsCtrl -- handles a select input value for starsOptions
// -----------------------------------------------------------------------------

class FiltersStarsController {
    static initClass() {
        FiltersStarsController.$inject = [
            'starsOptions',
            'filtersInterface'
        ];
    }

    constructor(
        starsOptions,
        filtersInterface
    ) {
        this._filtersInterface = filtersInterface;
        this.selectedOption = starsOptions.options[0];
        this.options = starsOptions.options;
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
