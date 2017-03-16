// -----------------------------------------------------------------------------
// sorterCtrl -- handles a select input value for sorterOptions
// -----------------------------------------------------------------------------

class SorterCtrl {
    static initClass() {
        SorterCtrl.$inject = [
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
        this.setCurrentSort();
    }

    setCurrentSort() {
        this._sorterInterface.setSort(this.selectedOption);
    }
}

SorterCtrl.initClass();

angular.module('sorterModule').controller('sorterCtrl', SorterCtrl);
