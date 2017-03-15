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
// hotelsModule for displaying a clickable list of search results.
// -----------------------------------------------------------------------------

angular.module('hotelsModule', []);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// hotelsCtrl -- displays a list of hotels with fitlers
// -----------------------------------------------------------------------------

var HotelsCtrl = function () {
    _createClass(HotelsCtrl, null, [{
        key: 'initClass',
        value: function initClass() {
            HotelsCtrl.$inject = ['$window', 'hotelsSortOptions'];
        }
    }]);

    function HotelsCtrl($window, hotelsSortOptions) {
        _classCallCheck(this, HotelsCtrl);

        if (_typeof($window.hotelsData) === 'object') {
            this.list = $window.hotelsData.Establishments;
        } else {
            this.list = [];
        }

        this.selectedSortOption = hotelsSortOptions.options[0];
        this.sortOptions = hotelsSortOptions.options;
    }

    _createClass(HotelsCtrl, [{
        key: 'onSortChange',
        value: function onSortChange() {
            console.log(this.selectedSortOption);
        }
    }]);

    return HotelsCtrl;
}();

HotelsCtrl.initClass();

angular.module('hotelsModule').controller('hotelsCtrl', HotelsCtrl);
'use strict';

angular.module('hotelsModule').constant('hotelsSortOptions', {
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
'use strict';

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

angular.module('hotelsModule').filter('humanizeStars', function () {
    return function (numberOfStars) {
        return '\u2605'.repeat(numberOfStars) + '\u2606'.repeat(5 - numberOfStars);
    };
});
'use strict';

angular.module('hotelsModule').filter('humanizeVotesCount', function () {
    return function (votes) {
        if (votes === 1) {
            return votes + ' vote';
        } else {
            return votes + ' votes';
        }
    };
});
})();
