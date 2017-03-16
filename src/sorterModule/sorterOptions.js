// -----------------------------------------------------------------------------
// sorterOptions is a list of sorter select input options
// -----------------------------------------------------------------------------

angular.module('sorterModule').constant('sorterOptions', {
    options: [
        {
            label: 'Distance: nearest first',
            property: 'Distance',
            propertyReverse: false
        },
        {
            label: 'Distance: furthest first',
            property: 'Distance',
            propertyReverse: true
        },
        {
            label: 'Stars: best first',
            property: 'Stars',
            propertyReverse: true
        },
        {
            label: 'Stars: worst first',
            property: 'Stars',
            propertyReverse: false
        },
        {
            label: 'Cost: cheapest first',
            property: 'MinCost',
            propertyReverse: false
        },
        {
            label: 'Cost: most expensive first',
            property: 'MinCost',
            propertyReverse: true
        },
        {
            label: 'Rating: lowest first',
            property: 'UserRating',
            propertyReverse: false
        },
        {
            label: 'Rating: highest first',
            property: 'UserRating',
            propertyReverse: true
        }
    ]
});
