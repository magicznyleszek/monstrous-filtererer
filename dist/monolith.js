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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// hotelsCtrl -- displays a list of hotels with fitlers
// -----------------------------------------------------------------------------

var HotelsCtrl = function () {
    _createClass(HotelsCtrl, null, [{
        key: 'initClass',
        value: function initClass() {
            HotelsCtrl.$inject = ['$window'];
        }
    }]);

    function HotelsCtrl($window) {
        _classCallCheck(this, HotelsCtrl);

        this.list = [];
        console.log($window.hotelsData);
    }

    return HotelsCtrl;
}();

HotelsCtrl.initClass();

angular.module('hotelsModule').controller('hotelsCtrl', HotelsCtrl);
})();
