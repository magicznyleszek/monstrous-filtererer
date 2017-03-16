// -----------------------------------------------------------------------------
// filtersRatingCtrl -- handles a range input for minimum user rating
// -----------------------------------------------------------------------------

class FiltersRatingController {
    static initClass() {
        FiltersRatingController.debounceTime = 500;

        FiltersRatingController.$inject = [
            '$scope',
            'filtersInterface'
        ];
    }

    constructor(
        $scope,
        filtersInterface
    ) {
        this._filtersInterface = filtersInterface;

        this.limitMin = 0;
        this.limitMax = 10;

        this.value = this.limitMin;
        this._dispatchValue();

        this.dispatchValueDebounced = _.debounce(
            // lodash works outside angular digest cycle, so we need $apply
            () => {$scope.$apply(this._dispatchValue.bind(this));},
            FiltersRatingController.debounceTime
        );
    }

    _dispatchValue() {
        this._filtersInterface.setMinimumRating(this.value);
    }
}

FiltersRatingController.initClass();

angular.module('filtersModule').controller(
    'filtersRatingCtrl',
    FiltersRatingController
);
