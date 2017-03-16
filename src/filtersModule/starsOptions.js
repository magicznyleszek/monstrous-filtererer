// -----------------------------------------------------------------------------
// starsOptions is a list of stars select input options
// -----------------------------------------------------------------------------

angular.module('filtersModule').constant('starsOptions', {
    options: [
        {
            label: '\u2605'.repeat(1),
            property: 'Stars'
        },
        {
            label: '\u2605'.repeat(2),
            property: 'Stars'
        },
        {
            label: '\u2605'.repeat(3),
            property: 'Stars'
        },
        {
            label: '\u2605'.repeat(4),
            property: 'Stars'
        },
        {
            label: '\u2605'.repeat(5),
            property: 'Stars'
        }
    ]
});
