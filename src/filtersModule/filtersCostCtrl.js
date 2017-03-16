// -----------------------------------------------------------------------------
// filtersCostCtrl -- handles a text input value for hotel name
// -----------------------------------------------------------------------------

class FiltersCostController {
    static initClass() {
        FiltersCostController.debounceTime = 500;

        FiltersCostController.$inject = [
            '$window',
            '$scope',
            'filtersInterface'
        ];
    }

    constructor(
        $window,
        $scope,
        filtersInterface
    ) {
        this._$window = $window;
        this._filtersInterface = filtersInterface;

        this.limitMin = 0;
        this.limitMax = 10000;
        this._setLimitsFromBackendData();

        // start with whole range
        this.valueMin = this.limitMin;
        this.valueMax = this.limitMax;
        this._dispatchValue();

        this.dispatchValueDebounced = _.debounce(
            // lodash works outside angular digest cycle, so we need $apply
            () => {$scope.$apply(this._dispatchValue.bind(this));},
            FiltersCostController.debounceTime
        );
    }

    _dispatchValue() {
        this._filtersInterface.setCostRange(this.valueMin, this.valueMax);
    }

    _setLimitsFromBackendData() {
        if (typeof this._$window.hotelsData === 'object') {
            let lowestCost = Infinity;
            let highestCost = 0;

            this._$window.hotelsData.Establishments.forEach((hotel) => {
                if (hotel.MinCost < lowestCost) {
                    lowestCost = Math.floor(hotel.MinCost);
                } else if (hotel.MinCost > highestCost) {
                    highestCost = Math.ceil(hotel.MinCost);
                }
            });

            this.limitMin = lowestCost;
            this.limitMax = highestCost;
        }
    }
}

FiltersCostController.initClass();

angular.module('filtersModule').controller(
    'filtersCostCtrl',
    FiltersCostController
);
