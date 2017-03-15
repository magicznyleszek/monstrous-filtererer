angular.module('hotelsModule').filter('humanizeDistance', () => {
    return function (kilometers) {
        if (kilometers < 1) {
            const metres = kilometers.toFixed(3) * 1000;
            return `${metres} m`;
        } else if (kilometers >= 1 && kilometers < 10) {
            const smallKilometers = kilometers.toFixed(2);
            return `${smallKilometers} km`;
        } else {
            const bigKilometers = kilometers.toFixed(0);
            return `${bigKilometers} km`;
        }
    };
});
