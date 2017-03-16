// -----------------------------------------------------------------------------
// starsOptions is a list of stars select input options
// -----------------------------------------------------------------------------

angular.module('filtersModule').constant('filtersStarsOptions', {
    options: [
        {
            label: 'Any',
            count: 0
        },
        {
            label: '\u2605'.repeat(1),
            count: 1
        },
        {
            label: '\u2605'.repeat(2),
            count: 2
        },
        {
            label: '\u2605'.repeat(3),
            count: 3
        },
        {
            label: '\u2605'.repeat(4),
            count: 4
        },
        {
            label: '\u2605'.repeat(5),
            count: 5
        }
    ]
});
