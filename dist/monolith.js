;(function () {
'use strict';

// -----------------------------------------------------------------------------
// monstrousFilterererAppModule is our single ngApp module for whole web app
// -----------------------------------------------------------------------------

angular.module('monstrousFilterererAppModule', ['hotelsModule']);
'use strict';

// -----------------------------------------------------------------------------
// tweak default angular configuration
// -----------------------------------------------------------------------------

angular.module('monstrousFilterererAppModule').config(['$interpolateProvider', '$compileProvider', function ($interpolateProvider, $compileProvider) {
    // unfortunately we can't use "{{ symbols }}" because Jekyll uses them
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    // We're disabling angular debug info - significant performance boost
    $compileProvider.debugInfoEnabled(false);
    // Don't look for directives in comments and classes (~10% boost)
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
}]);
'use strict';

// -----------------------------------------------------------------------------
// filtersModule for displaying a bunch of filters for hotels
// -----------------------------------------------------------------------------

angular.module('filtersModule', ['observableModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// filtersInterface keeps current filters value
// -----------------------------------------------------------------------------

var FiltersInterfaceService = function () {
    _createClass(FiltersInterfaceService, null, [{
        key: 'initClass',
        value: function initClass() {
            FiltersInterfaceService.$inject = [];
        }
    }]);

    function FiltersInterfaceService() {
        _classCallCheck(this, FiltersInterfaceService);

        this._hotelName = null;
    }

    _createClass(FiltersInterfaceService, [{
        key: 'setHotelName',
        value: function setHotelName(hotelName) {
            // we want to keep the name lowercased for easier comparison
            this._hotelName = hotelName.toLowerCase();
        }
    }, {
        key: 'matchHotel',
        value: function matchHotel(hotel) {
            var matchesByName = true;
            if (!_.isEmpty(this._hotelName)) {
                matchesByName = hotel.Name.toLowerCase().includes(this._hotelName);
            }

            return matchesByName;
        }
    }]);

    return FiltersInterfaceService;
}();

FiltersInterfaceService.initClass();

angular.module('filtersModule').service('filtersInterface', FiltersInterfaceService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// hotelNameCtrl -- handles a text input value for hotel name
// -----------------------------------------------------------------------------

var HotelNameController = function () {
    _createClass(HotelNameController, null, [{
        key: 'initClass',
        value: function initClass() {
            HotelNameController.$inject = ['filtersInterface'];
        }
    }]);

    function HotelNameController(filtersInterface) {
        _classCallCheck(this, HotelNameController);

        this._filtersInterface = filtersInterface;
        this.value = '';
        this.dispatchValue();
    }

    _createClass(HotelNameController, [{
        key: 'dispatchValue',
        value: function dispatchValue() {
            this._filtersInterface.setHotelName(this.value);
        }
    }]);

    return HotelNameController;
}();

HotelNameController.initClass();

angular.module('filtersModule').controller('hotelNameCtrl', HotelNameController);
'use strict';

// -----------------------------------------------------------------------------
// starsOptions is a list of stars select input options
// -----------------------------------------------------------------------------

angular.module('filtersModule').constant('starsOptions', {
    options: [{
        label: '\u2605'.repeat(1),
        property: 'Stars'
    }, {
        label: '\u2605'.repeat(2),
        property: 'Stars'
    }, {
        label: '\u2605'.repeat(3),
        property: 'Stars'
    }, {
        label: '\u2605'.repeat(4),
        property: 'Stars'
    }, {
        label: '\u2605'.repeat(5),
        property: 'Stars'
    }]
});
'use strict';

// -----------------------------------------------------------------------------
// hotelsModule for displaying a list of hotels, uses some modules for filtering
// -----------------------------------------------------------------------------

angular.module('hotelsModule', ['filtersModule', 'sorterModule']);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// hotelsCtrl -- displays a filtered list of hotels
// -----------------------------------------------------------------------------

var HotelsController = function () {
    _createClass(HotelsController, null, [{
        key: 'initClass',
        value: function initClass() {
            HotelsController.$inject = ['$window', 'sorterInterface', 'filtersInterface'];
        }
    }]);

    function HotelsController($window, sorterInterface, filtersInterface) {
        _classCallCheck(this, HotelsController);

        this._$window = $window;
        this._sorterInterface = sorterInterface;

        // THE list
        this.list = this._getListFromBackendData();

        // sorter handling
        this.currentSort = null;
        this._refreshSort();
        this._sorterInterface.registerSortObserver(this._refreshSort.bind(this));

        // use the function from interface
        this.matchHotel = filtersInterface.matchHotel.bind(filtersInterface);
    }

    _createClass(HotelsController, [{
        key: '_getListFromBackendData',
        value: function _getListFromBackendData() {
            if (_typeof(this._$window.hotelsData) === 'object') {
                return this._$window.hotelsData.Establishments;
            } else {
                return [];
            }
        }
    }, {
        key: '_refreshSort',
        value: function _refreshSort() {
            this.currentSort = this._sorterInterface.getSort();
        }
    }]);

    return HotelsController;
}();

HotelsController.initClass();

angular.module('hotelsModule').controller('hotelsCtrl', HotelsController);
'use strict';

// -----------------------------------------------------------------------------
// humanizeDistance filter returns meters or kilometers with no decimal if huge
// -----------------------------------------------------------------------------

angular.module('hotelsModule').filter('humanizeDistance', function () {
    return function (kilometers) {
        if (kilometers < 1) {
            var metres = kilometers.toFixed(3) * 1000;
            return metres + ' m';
        } else if (kilometers >= 1 && kilometers < 10) {
            var smallKilometers = kilometers.toFixed(2);
            return smallKilometers + ' km';
        } else {
            var bigKilometers = kilometers.toFixed(0);
            return bigKilometers + ' km';
        }
    };
});
'use strict';

// -----------------------------------------------------------------------------
// humanizeStars filter returns a string of 5 stars with fulls and empties
// -----------------------------------------------------------------------------

angular.module('hotelsModule').filter('humanizeStars', function () {
    return function (numberOfStars) {
        return '\u2605'.repeat(numberOfStars) + '\u2606'.repeat(5 - numberOfStars);
    };
});
'use strict';

// -----------------------------------------------------------------------------
// humanizeVotesCount filter handles pluralization of votes number
// -----------------------------------------------------------------------------

angular.module('hotelsModule').filter('humanizeVotesCount', function () {
    return function (votes) {
        if (votes === 1) {
            return votes + ' vote';
        } else {
            return votes + ' votes';
        }
    };
});
'use strict';

// -----------------------------------------------------------------------------
// observableModule is for managing a list of observers.
// -----------------------------------------------------------------------------

angular.module('observableModule', []);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// observable is a factory that creates a new instance of observer pattern.
// It handles adding observers, running them and removing.
// Any service that would like to keep a list of observers of some kind, can
// easily use this object for handling common logic of keeping and controlling
// sets of callback (observers) functions.
// -----------------------------------------------------------------------------

var ObservableModel = function () {
    function ObservableModel() {
        _classCallCheck(this, ObservableModel);

        this._observers = [];
        this._amountOfObservers = 0;
        this._observersToRemove = [];
        this._amountToRemove = 0;
        this._stateObservers = [];
        this._isActive = false;
    }

    _createClass(ObservableModel, [{
        key: '_createCancelFunction',
        value: function _createCancelFunction(observerToCancel, afterCancelCallback) {
            return function () {
                afterCancelCallback(observerToCancel);
                observerToCancel = null;
                afterCancelCallback = null;
            };
        }
    }, {
        key: '_afterCancel',
        value: function _afterCancel(observerToRemove) {
            this._amountToRemove = this._observersToRemove.push(observerToRemove);
        }
    }, {
        key: '_cleanRemovedObservers',
        value: function _cleanRemovedObservers() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._observersToRemove[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var observerToRemove = _step.value;

                    var indexOf = this._observers.indexOf(observerToRemove);
                    if (indexOf !== -1) {
                        this._observers.splice(indexOf, 1);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this._amountOfObservers = this._observers.length;
            this._amountToRemove = 0;
            this._observersToRemove.length = 0;
            this._updateState(this._amountOfObservers > 0);
        }
    }, {
        key: '_updateState',
        value: function _updateState(newActiveState) {
            if (this._isActive === newActiveState) {
                return;
            }

            this._isActive = newActiveState;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._stateObservers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var stateObserver = _step2.value;

                    stateObserver(this._isActive);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'register',
        value: function register(newObserver) {
            this._amountOfObservers = this._observers.push(newObserver);
            this._updateState(true);
            return this._createCancelFunction(newObserver, this._afterCancel.bind(this));
        }
    }, {
        key: 'notify',
        value: function notify() {
            if (this._amountToRemove !== 0) {
                this._cleanRemovedObservers();
            }

            if (!this._isActive) {
                return;
            }

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (this._amountOfObservers === 1) {
                this._observers[0].apply(null, args);
                return;
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._observers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var observer = _step3.value;

                    observer.apply(null, args);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'onStateChange',
        value: function onStateChange(stateObserver) {
            return this._stateObservers.push(stateObserver);
        }
    }]);

    return ObservableModel;
}();

angular.module('observableModule').factory('Observable', function () {
    return ObservableModel;
});
'use strict';

// -----------------------------------------------------------------------------
// sorterModule for displaying a select input for sorting hotels
// -----------------------------------------------------------------------------

angular.module('sorterModule', ['observableModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// sorterCtrl -- handles a select input value for sorterOptions
// -----------------------------------------------------------------------------

var SorterController = function () {
    _createClass(SorterController, null, [{
        key: 'initClass',
        value: function initClass() {
            SorterController.$inject = ['sorterOptions', 'sorterInterface'];
        }
    }]);

    function SorterController(sorterOptions, sorterInterface) {
        _classCallCheck(this, SorterController);

        this._sorterInterface = sorterInterface;
        this.selectedOption = sorterOptions.options[0];
        this.options = sorterOptions.options;
        this.setCurrentSort();
    }

    _createClass(SorterController, [{
        key: 'setCurrentSort',
        value: function setCurrentSort() {
            this._sorterInterface.setSort(this.selectedOption);
        }
    }]);

    return SorterController;
}();

SorterController.initClass();

angular.module('sorterModule').controller('sorterCtrl', SorterController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// sorterInterface keeps current sorter value
// -----------------------------------------------------------------------------

var SorterInterfaceService = function () {
    _createClass(SorterInterfaceService, null, [{
        key: 'initClass',
        value: function initClass() {
            SorterInterfaceService.$inject = ['Observable'];
        }
    }]);

    function SorterInterfaceService(Observable) {
        _classCallCheck(this, SorterInterfaceService);

        this._currentSort = null;
        this._sortObservable = new Observable();
    }

    _createClass(SorterInterfaceService, [{
        key: 'registerSortObserver',
        value: function registerSortObserver(observer) {
            return this._sortObservable.register(observer);
        }
    }, {
        key: 'setSort',
        value: function setSort(sortOption) {
            this._currentSort = sortOption;
            this._sortObservable.notify();
        }
    }, {
        key: 'getSort',
        value: function getSort() {
            return this._currentSort;
        }
    }]);

    return SorterInterfaceService;
}();

SorterInterfaceService.initClass();

angular.module('sorterModule').service('sorterInterface', SorterInterfaceService);
'use strict';

// -----------------------------------------------------------------------------
// sorterOptions is a list of sorter select input options
// -----------------------------------------------------------------------------

angular.module('sorterModule').constant('sorterOptions', {
    options: [{
        label: 'Distance: nearest first',
        property: 'Distance',
        propertyReverse: false
    }, {
        label: 'Distance: furthest first',
        property: 'Distance',
        propertyReverse: true
    }, {
        label: 'Stars: best first',
        property: 'Stars',
        propertyReverse: true
    }, {
        label: 'Stars: worst first',
        property: 'Stars',
        propertyReverse: false
    }, {
        label: 'Cost: cheapest first',
        property: 'MinCost',
        propertyReverse: false
    }, {
        label: 'Cost: most expensive first',
        property: 'MinCost',
        propertyReverse: true
    }, {
        label: 'Rating: lowest first',
        property: 'UserRating',
        propertyReverse: false
    }, {
        label: 'Rating: highest first',
        property: 'UserRating',
        propertyReverse: true
    }]
});
})();
