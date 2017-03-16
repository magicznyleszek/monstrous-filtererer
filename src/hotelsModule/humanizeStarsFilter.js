// -----------------------------------------------------------------------------
// humanizeStars filter returns a string of 5 stars with fulls and empties
// -----------------------------------------------------------------------------

angular.module('hotelsModule').filter('humanizeStars', () => {
    return function (numberOfStars) {
        return '\u2605'.repeat(numberOfStars) + '\u2606'.repeat(5 - numberOfStars);
    };
});
