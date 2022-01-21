/**
 * pageTitle - Directive for set Page title - mata title
 */
//function pageTitle($rootScope, $timeout) {
//    return {
//        link: function (scope, element) {
//            var listener = function (event, toState, toParams, fromState, fromParams) {
//                var title = 'PICT';
//                if (toState.data && toState.data.pageTitle) title = 'PICT | ' + toState.data.pageTitle;
//                $timeout(function () {
//                    element.text(title);
//                });
//            }; fileread
//            $rootScope.$on('$stateChangeStart', listener);
//        }
//    }
//};

function pageTitle($rootScope, $timeout) {
    return {
        link: function (scope, element) {
            var listener = function (event, toState, toParams, fromState, fromParams) {
                var title = 'FOP';
                if (toState.data && toState.data.pageTitle) title = 'FOP | ' + toState.data.pageTitle;
                $timeout(function () {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function () {
                // element.metisMenu();
            });
        }
    };
};

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
};

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else if ($('body').hasClass('fixed-sidebar')) {
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 300);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};

function closeOffCanvas() {
    return {
        restrict: 'A',
        template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
        controller: function ($scope, $element) {
            $scope.closeOffCanvas = function () {
                $("body").toggleClass("mini-navbar");
            }
        }
    };
}

/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline() {
    return {
        restrict: 'A',
        scope: {
            sparkData: '=',
            sparkOptions: '=',
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.sparkData, function () {
                render();
            });
            scope.$watch(scope.sparkOptions, function () {
                render();
            });
            var render = function () {
                $(element).sparkline(scope.sparkData, scope.sparkOptions);
            };
        }
    }
};

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, element, $attrs, ngModel) {
            return $timeout(function () {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function (newValue) {
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function (event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function () {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function () {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
}

/**
 * customValid - Directive for custom validation example
 */
function customValid() {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function () {

                // You can call a $http method here
                // Or create custom validation

                var validText = "Inspinia";

                if (scope.extras == validText) {
                    c.$setValidity('cvalid', true);
                } else {
                    c.$setValidity('cvalid', false);
                }

            });
        }
    }
}

/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            $timeout(function () {
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

function datetimepicker() {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                format: 'dd/mm/yyyy',
                language: 'tr',
                todayBtn: 'linked',
                clearBtn: true,
                autoclose: true,
                todayHighlight: true,
                onSelect: function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                }
            });
        }
    }
}


/**
* clockPicker - Directive for clock picker plugin
*/
function clockPicker() {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.clockpicker();
        }
    };
};


/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('sparkline', sparkline)
    .directive('icheck', icheck)
    .directive('customValid', customValid)
    .directive('fullScroll', fullScroll)
    .directive('closeOffCanvas', closeOffCanvas)
    .directive('datetimepicker', datetimepicker)
    .directive('clockPicker', clockPicker)
    .directive('nextgenDateTimePicker', function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, controller) {
                var updateModel, onblur;
                if (controller !== null) {
                    updateModel = function () {
                        if (element.data("DateTimePicker").minViewMode === element.data("DateTimePicker").viewMode) {
                            element.data("DateTimePicker").hide();
                            element.blur();
                        }
                    };

                    onblur = function () {
                        var date = element.datetimepicker().data("DateTimePicker").date();
                        if (date != undefined) {
                            return $scope.$apply(function () {
                                date = moment(date).format();//.set('hour', date.hours() + 3);
                                return controller.$setViewValue(date);
                            });

                        }
                        else {

                            return controller.$setViewValue(undefined);

                        }
                    };

                    controller.$render = function () {
                        if (controller.$viewValue != undefined) {
                            //var date = controller.$viewValue;
                            var date = moment(controller.$viewValue);

                            if (angular.isDefined(date) && date != null && moment.isMoment(date)) {
                                element.datetimepicker().data("DateTimePicker").date(date);
                            } else if (angular.isDefined(date)) {
                                throw new Error('ng-model deðeri tarih olmalý - þu an ' + typeof date + '.');
                            }
                        }
                        else {
                            element.value = '';
                            controller.$setViewValue(undefined);
                        }
                        return controller.$viewValue;
                    };
                }
                return attrs.$observe('nextgenDateTimePicker', function (value) {
                    var options;
                    options = {
                        locale: 'tr',
                        format: 'DD/MM/YYYY HH:mm'
                    };
                    if (angular.isObject(value)) {
                        options = value;
                    }
                    if (typeof (value) === "string" && value.length > 0) {
                        options = angular.fromJson(value);
                    }
                    return element.datetimepicker(options).on('change.dp', updateModel).on('blur', onblur);
                });
            }
        };
    })
    .directive('nextgenDatePicker', function ($timeout) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, controller) {


                // $compile(element)(scope);

                var updateModel, onblur;

                if (controller !== null) {
                    updateModel = function () {
                        if (element.data("DateTimePicker").minViewMode === element.data("DateTimePicker").viewMode) {
                            element.data("DateTimePicker").hide();
                            element.blur();
                        }
                    };

                    onblur = function () {
                        var date = element.datetimepicker().data("DateTimePicker").date();
                        if (date != undefined) {

                            $timeout(function () {

                                return $scope.$apply(function () {
                                    date = moment(date).format();//.set('hour', date.hours() + 3);
                                    return controller.$setViewValue(date);
                                });
                            })




                        }
                        else {
                            return controller.$setViewValue(undefined);
                        }
                    };

                    controller.$render = function () {
                        if (controller.$viewValue != undefined) {
                            //var date = controller.$viewValue;
                            var date = moment(controller.$viewValue);

                            if (angular.isDefined(date) && date != null && moment.isMoment(date)) {
                                element.datetimepicker().data("DateTimePicker").date(date);
                            } else if (angular.isDefined(date)) {
                                throw new Error('ng-model deðeri tarih olmalý - þu an ' + typeof date + '.');
                            }
                        }
                        else {
                            element.value = '';
                            controller.$setViewValue(undefined);
                        }
                        return controller.$viewValue;
                    };
                }
                return attrs.$observe('nextgenDatePicker', function (value) {
                    var options;
                    options = {
                        locale: 'tr',
                        format: 'DD/MM/YYYY',
                        showTodayButton: true,
                        showClear: true,
                        tooltips: {
                            today: 'Bugün',
                            clear: 'Temizle'
                        }
                    };
                    if (angular.isObject(value)) {
                        options = value;
                    }
                    if (typeof (value) === "string" && value.length > 0) {
                        options = angular.fromJson(value);
                    }
                    element.mask("99/99/9999");
                    return element.datetimepicker(options).on('change.dp', updateModel).on('blur', onblur);
                });
            }
        };
    })
    .directive('addASpaceBetween', [function () {
        'use strict';
        return function (scope, element) {
            if (scope.post.VaziyetPlanSiraNo == 7) {
                element.after('<div class=\"row m-b"> <br/><br/></div>');
            }

        }
    }])

    .directive('ionslider', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                min: '=',
                max: '=',
                type: '@',
                prefix: '@',
                maxPostfix: '@',
                prettify: '@',
                grid: '@',
                gridMargin: '@',
                postfix: '@',
                step: '@',
                hideMinMax: '@',
                hideFromTo: '@',
                from: '=',
                disable: '=',
                onChange: '=',
                onFinish: '='

            },
            template: '<div></div>',
            replace: true,
            link: function ($scope, $element, attrs) {
                (function init() {
                    $element.ionRangeSlider({
                        min: $scope.min,
                        max: $scope.max,
                        type: $scope.type,
                        prefix: $scope.prefix,
                        force_edges: true,
                        grid_snap: true,
                        maxPostfix: $scope.maxPostfix,
                        prettify: $scope.prettify,
                        grid: $scope.grid,
                        gridMargin: $scope.gridMargin,
                        postfix: $scope.postfix,
                        step: $scope.step,
                        hideMinMax: $scope.hideMinMax,
                        hideFromTo: $scope.hideFromTo,
                        from: $scope.from,
                        disable: $scope.disable,
                        onChange: $scope.onChange,
                        onFinish: $scope.onFinish
                    });
                })();
                $scope.$watch('min', function (value) {
                    $timeout(function () { $element.data("ionRangeSlider").update({ min: value }); });
                }, true);
                $scope.$watch('max', function (value) {
                    $timeout(function () { $element.data("ionRangeSlider").update({ max: value }); });
                });
                $scope.$watch('from', function (value) {
                    $timeout(function () { $element.data("ionRangeSlider").update({ from: value }); });
                });
                $scope.$watch('disable', function (value) {
                    $timeout(function () { $element.data("ionRangeSlider").update({ disable: value }); });
                });
            }
        }
    })
    .directive('asNumber', ['$locale', function ($locale, undefined) {
        return {
            restrict: 'A',
            require: '?ngModel',
            compile: function (tElement, tAttrs) {
                if (tElement[0].nodeName !== 'INPUT') {
                    throw ('Error. asNumber directive must be used inside an <input> element.');
                }
                tElement.attr('pattern', '[0-9]*');

                return function (scope, element, attrs, ngModelCtrl, undefined) {
                    if (!ngModelCtrl) {
                        return;
                    }

                    var step, newValue;
                    var maxAttr = (attrs.hasOwnProperty('max') && attrs.max !== '') ? parseInt(attrs.max, 10) : false,
                        minAttr = (attrs.hasOwnProperty('min') && attrs.min !== '') ? parseInt(attrs.min, 10) : false,
                        stepAttr = (attrs.hasOwnProperty('step') && attrs.step !== '') ? parseInt(attrs.step, 10) : 1;

                    element.on('keydown', function (event) {
                        // Arrow key incrementation:
                        if (event.keyCode === 38 || event.keyCode === 40) {
                            event.preventDefault();
                            step = (event.shiftKey) ? (stepAttr * 10) : stepAttr;
                            if (event.keyCode === 40) // Arrow down
                            {
                                step *= -1;
                            }

                            newValue = (isNaN(ngModelCtrl.$modelValue)) ? step : ngModelCtrl.$modelValue + step;

                            if (maxAttr !== false && newValue > maxAttr) {
                                newValue = maxAttr;
                            }
                            else if (minAttr !== false && newValue < minAttr) {
                                newValue = minAttr;
                            }
                            newValue = String(newValue);
                            if ($locale.NUMBER_FORMATS.DECIMAL_SEP === ',') {
                                newValue = newValue.replace(/\.(\d*)$/, ',$1');
                            }
                            else {
                                newValue = newValue.replace(/,(\d*)$/, '.$1');
                            }
                            ngModelCtrl.$setViewValue(newValue);
                            ngModelCtrl.$render();
                            element.select();
                        }
                    }); // end on keydown

                    ngModelCtrl.$parsers.unshift(function (value) {
                        if (typeof value !== 'string' || value === '') {
                            return null;
                        }
                        value = value.replace(/,(\d*)$/, '.$1');
                        var out = parseFloat(value, 10);
                        if (isNaN(out)) {
                            return undefined;
                        }
                        return out;
                    }); // end $parser

                    ngModelCtrl.$formatters.unshift(function (value) {
                        if (typeof value !== 'string') {
                            return value;
                        }
                        if (isNaN(parseFloat(value, 10))) {
                            return '';
                        }
                        if ($locale.NUMBER_FORMATS.DECIMAL_SEP === ',') {
                            return value.replace(/\.(\d*)$/, ',$1');
                        }
                        return value.replace(/,(\d*)$/, '.$1');
                    }); // end $formatter

                    ngModelCtrl.$validators.number = function (modelValue, viewValue) {
                        if (modelValue === undefined || modelValue === null || modelValue === '') {
                            return true;
                        }
                        if (isNaN(modelValue)) {
                            return false;
                        }
                        return true;
                    }; // end $validator number

                    ngModelCtrl.$validators.range = function (modelValue, viewValue) {
                        if ((maxAttr && modelValue > maxAttr) || (minAttr && modelValue < minAttr)) {
                            return false;
                        }
                        return true;
                    }; // end $validator range

                };  // end link function
            } // end compile function
        };
    }])
    .directive('inputMask', function () {
        return {

            require: "ngModel",

            link: function (scope, elem, attr, ctrl) {

                elem.inputmask("(999) 999-9999");

                elem.on('keyup', function () {

                    scope.$apply(function () {

                        ctrl.$setViewValue(elem.val());

                    });

                });

            }

        };
    })
    .directive('menuIcerikYuklendi', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    console.log(element)
                    element.ready(function () {
                        scope.menuyuCalistir();
                    });
                }
            }
        }
    })
    .directive('date', function (dateFilter) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                var dateFormat = attrs['date'] || 'yyyy-MM-dd';
                var minDate = Date.parse(attrs['min']) || 0;
                var maxDate = Date.parse(attrs['max']) || 9007199254740992;

                ctrl.$parsers.unshift(function (viewValue) {
                    var parsedDateMilissec = Date.parse(viewValue);
                    if (parsedDateMilissec > 0) {
                        if (parsedDateMilissec >= minDate && parsedDateMilissec <= maxDate) {
                            ctrl.$setValidity('date', true);
                            return parsedDateMilissec;
                        }
                    }

                    // in all other cases it is invalid, return undefined (no model update)
                    ctrl.$setValidity('date', false);
                    return undefined;
                });

                ctrl.$formatters.unshift(function (modelValue) {
                    return dateFilter(modelValue, dateFormat);
                });
            }
        };
    })



    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    if (element.val() != "") {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.fileread = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                        element.val(null);
                    }
                });
            }
        }
    }])



    //Multi dokuman upload
    .directive('ngFileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.ngFileModel);
                var isMultiple = attrs.multiple;
                var modelSetter = model.assign;
                element.bind('change', function (e) {
                    var files = e.target.files;
                    var values = [];
                    angular.forEach(files, function (item) {
                        var reader = new FileReader();
                        reader.addEventListener('load', function (event) {
                            var target = event.target;
                            var value = {
                                name: item.name,
                                size: item.size,
                                type: item.type,
                                _file: item,
                                base64: target.result
                            };
                            values.push(value);
                        });
                        reader.readAsDataURL(item);
                    });
                    scope.$apply(function () {
                        if (isMultiple) {
                            modelSetter(scope, values);
                        } else {
                            modelSetter(scope, values[0]);
                        }
                    });
                });
            }
        };
    }])
  

    .directive('upload', function ($rootScope) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            elem.bind("change", function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    scope.$apply(function ($scope) {
                        $scope.DosyaYukleme(file, evt.target.result);
                        //$rootScope.myImage = evt.target.result;
                        //console.log($rootScope.myImage);
                    });
                };
                if (file) {
                    reader.readAsDataURL(file);
                }
            });
        }
    };
})

    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter, { 'event': event });
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive('saDosyaindir', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                hedef: '=hedef',
                dosya: '=dosya',
                tablo: '@tablo',
                dosyaid: '=dosyaid'
            },
            template: '<a href="api/DosyaIndir?t=' + $rootScope.$storage.TOKEN.toString().split('=').join('_') + '&Tablo={{tablo}}&KayitID={{dosyaid}}" rel="tooltip" data-placement="right" target="{{hedef}}"   ng-transclude></a>',

            link: function (scope, element, attrs) {
                if (scope.title) {
                    element.addClass('tooltip-title');
                }
            },
        }
    })
    ;