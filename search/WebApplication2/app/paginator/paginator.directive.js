(function () {
    "use strict";

    app.factory('Pagination', function () {

        var pagination = {};

        pagination.getNew = function (perPage) {
            perPage = perPage === undefined ? 5 : perPage;
            var paginator = {
                perPage: perPage,       // Per page how many items should be displayed
                currentPage: 1,         // In General or UI the current feed Page value
                totalPage: 0,           // In general or UI total feed page
                start: 0,               // In general or UI starting feed page value                
            };

            paginator.NextPage = function () {
                if (paginator.currentPage < paginator.totalPage)
                    paginator.currentPage++;
                paginator.start = (paginator.currentPage - 1) * paginator.perPage;
            }

            paginator.PreviousPage = function () {
                if (paginator.currentPage > 1)
                    paginator.currentPage--;
                paginator.start = (paginator.currentPage - 1) * paginator.perPage;
            }

            paginator.SetPage = function (page) {
                if (page > 0 && page <= paginator.totalPage)
                    paginator.currentPage = page;
                paginator.start = (paginator.currentPage - 1) * paginator.perPage;
            }

            paginator.SetTotalPage = function (totalCount) {
                paginator.totalPage = Math.ceil(totalCount / perPage);
            }

            return paginator;
        };

        return pagination;
    });

    app.filter('paginate', function () {
        return function (input, start) {
            if (input === undefined) {
                return input;
            } else {
                return input.slice(+start);
            }
        };
    });

    app.directive('syncPaginator', ['toaster', function (toaster) {
        return {
            templateUrl: 'app/shared/paginator/paginator.html',
            link: function ($scope, element, attrs, toaster) {

                var attrFiltercount = Number(attrs.filterCount);
                $scope.attrFiltercount = Number(attrs.filterCount);
                var loadNext = false;
                var totalItems = Number(attrs.totalItems);
                var perPage = Number(attrs.prePage);
                $scope.hasNextPage = true;
                $scope.currentSet = 0;
                $scope.currentPage = Number(attrs.currentPage);
                $scope.totalPage = Number(attrs.totalPage);
                $scope.currentFilterCount = Number(attrs.filterCount);
                if ($scope.currentFilterCount > $scope.totalPage)
                    $scope.currentFilterCount = angular.copy($scope.totalPage);
                $scope.filterCount = new Array($scope.currentFilterCount);

				$scope.PreSetPage = function (page) {
					debugger;
                    $scope.SetPage(page + ($scope.currentSet * attrFiltercount));
                    $scope.currentPage = page;
                    $("section").animate({ scrollTop: 0 });
                };

                $scope.$on('resetPaginatorDir', function () {
                    $scope.currentSet = 0;
                    $scope.PreSetPage(1);
                });

                $scope.NextPage = function () {
                    //var tempCurrentPage = (Number($scope.currentPage) + Number($scope.currentSet * $scope.currentFilterCount));
                    var tempCurrentPage = (Number($scope.currentFilterCount) + Number($scope.currentSet * attrFiltercount));

                    if ($scope.totalPage == tempCurrentPage) {
                        if ($scope.currentFilterCount == attrFiltercount) {
                            if (totalItems == perPage * $scope.currentPage) {
                                $scope.currentPage = 1;
                                $scope.currentSet++;
                            }
                        } else {
                            if (totalItems == perPage * $scope.currentPage) {
                                $scope.currentPage = $scope.currentFilterCount + 1;
                                $("section").animate({ scrollTop: 0 });
                            } else {
                                $scope.currentPage = $scope.currentFilterCount;
                            }
                        }
                        loadNext = true;
                        $scope.$emit('nextFeeds');
                    } else {
                        $scope.currentPage = 1;
                        $scope.currentSet++;
                        $scope.PreSetPage(1);
                        $scope.checkPageAvailable();
                    }
                };

				$scope.PrePage = function () {
					debugger;
                    if ($scope.currentSet > 0) {
                        $scope.currentSet--;
                        $scope.currentPage = attrFiltercount;
                        $scope.PreSetPage($scope.currentPage);
                        $scope.checkPageAvailable();
                    }
                }

                /* update on change */
                attrs.$observe('currentPage', function (data) {
                    //$scope.currentPage = Number(data) - Number($scope.currentSet * $scope.currentFilterCount);
                }, true);

                attrs.$observe('totalItems', function (data) {
                    totalItems = Number(data);
                }, true);

                attrs.$observe('totalPage', function (data) {
                    $scope.totalPage = Number(data);
                    $scope.PreSetPage($scope.currentPage);
                    $scope.checkPageAvailable();
                }, true);

                attrs.$observe('isNext', function (data) {
                    if (data == 1)
                    {
                        $scope.hasNextPage = false;
                    } else {
                        $scope.hasNextPage = true;
                    }
                        
                }, true);

                $scope.checkPageAvailable = function () {
                    var tempAttrCount = attrFiltercount * ($scope.currentSet + 1);
                    if (tempAttrCount > $scope.totalPage) {
                        if ($scope.totalPage < attrFiltercount)
                            $scope.currentFilterCount = angular.copy($scope.totalPage);
                        else
                            $scope.currentFilterCount = angular.copy($scope.totalPage - (attrFiltercount * $scope.currentSet));
                    } else {
                        $scope.currentFilterCount = attrFiltercount;
                    }

                    $scope.filterCount = new Array($scope.currentFilterCount);
                };

            }
        }
    }]);

})();


(function (window) {

    'use strict';

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function DotNav(el, options) {
        this.nav = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    DotNav.prototype.options = {};

    DotNav.prototype._init = function () {
        // special case "dotstyle-hop"
        var hop = this.nav.parentNode.className.indexOf('dotstyle-hop') !== -1;

        var dots = [].slice.call(this.nav.querySelectorAll('li')), current = 0, self = this;

        dots.forEach(function (dot, idx) {
            dot.addEventListener('click', function (ev) {
                ev.preventDefault();
                if (idx !== current) {
                    dots[current].className = '';

                    // special case
                    if (hop && idx < current) {
                        dot.className += ' current-from-right';
                    }

                    setTimeout(function () {
                        dot.className += ' current';
                        current = idx;
                        if (typeof self.options.callback === 'function') {
                            self.options.callback(current);
                        }
                    }, 25);
                }
            });
        });
    }

    // add to global namespace
    window.DotNav = DotNav;

})(window);