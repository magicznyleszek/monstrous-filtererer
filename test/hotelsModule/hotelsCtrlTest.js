describe('hotelsCtrl', () => {
    let hotelsCtrl = null;

    beforeEach(() => {
        module('testAppModule');
        module('hotelsModule');
        inject(($injector, $controller) => {
            hotelsCtrl = $controller('hotelsCtrl', {
                $window: $injector.get('$window')
            });
        });
    });

    it('should have data availabe from backend', () => {
        expect(hotelsCtrl.list).toBeDefined();
    });
});
