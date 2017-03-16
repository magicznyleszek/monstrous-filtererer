// -----------------------------------------------------------------------------
// sorterInterface keeps current sorter value
// -----------------------------------------------------------------------------

class SorterInterfaceService {
    static initClass() {
        SorterInterfaceService.$inject = ['Observable'];
    }

    constructor(Observable) {
        this._currentSort = null;
        this._sortObservable = new Observable();
    }

    registerSortObserver(observer) {
        return this._sortObservable.register(observer);
    }

    setSort(sortOption) {
        this._currentSort = sortOption;
        this._sortObservable.notify();
    }

    getSort() {
        return this._currentSort;
    }
}

SorterInterfaceService.initClass();

angular.module('sorterModule').service(
    'sorterInterface',
    SorterInterfaceService
);
