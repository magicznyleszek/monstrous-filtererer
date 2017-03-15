describe('hotelsCtrl', () => {
    let hotelsCtrl = null;
    let testData = null;
    let $window = null;

    beforeEach(() => {
        module('testAppModule');
        module('hotelsModule');
        inject(($injector, $controller) => {
            testData = $injector.get('testData');
            $window = $injector.get('$window');
            // set backend data
            $window.hotelsData = testData.hotels;
            hotelsCtrl = $controller('hotelsCtrl', {
                $window: $window
            });
        });
    });

    it('should use data from backend', () => {
        expect(hotelsCtrl.list.length).toBe(testData.hotels.Establishments.length);
    });
});
