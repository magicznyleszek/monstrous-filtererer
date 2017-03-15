angular.module('hotelsModule').constant('hotelsStarsOptions', {
    options: [
        {
            label: 'Any',
            property: 'Stars'
        },
        {
            label: '\u2605'.repeat(5),
            property: 'Stars'
        },
        {
            label: '\u2605'.repeat(4),
            property: 'Stars'
        },
        {
            label: '\u2605'.repeat(3),
            property: 'Stars'
        },
        {
            label: '\u2605'.repeat(2),
            property: 'Stars'
        },
        {
            label: '\u2605'.repeat(1),
            property: 'Stars'
        },
        {
            label: 'Zero',
            property: 'Stars'
        }
    ]
});
