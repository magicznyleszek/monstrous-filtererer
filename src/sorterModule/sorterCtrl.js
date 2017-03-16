// -----------------------------------------------------------------------------
// sorterCtrl -- handles a select input value for sorterOptions
// -----------------------------------------------------------------------------

class SorterController {
    static initClass() {
        SorterController.$inject = [
            'sorterOptions',
            'sorterInterface'
        ];
    }

    constructor(
        sorterOptions,
        sorterInterface
    ) {
        this._sorterInterface = sorterInterface;
        this.selectedOption = sorterOptions.options[0];
        this.options = sorterOptions.options;
        this.dispatchValue();
    }

    dispatchValue() {
        this._sorterInterface.setSort(this.selectedOption);
    }
}

SorterController.initClass();

angular.module('sorterModule').controller('sorterCtrl', SorterController);
