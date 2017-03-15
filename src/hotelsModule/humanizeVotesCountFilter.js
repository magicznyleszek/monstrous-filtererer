angular.module('hotelsModule').filter('humanizeVotesCount', () => {
    return function (votes) {
        if (votes === 1) {
            return `${votes} vote`;
        } else {
            return `${votes} votes`;
        }
    };
});
