(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {
    // Extends lang for print plugin.
    $.extend(true, $.summernote.lang, {
        'en-US': {
            print: {
                print: 'Print'
            }
        },
        'tr-TR': {
            print: {
                print: 'Yazdır'
            }
        },
        'ko-KR': {
            print: {
                print: '인쇄'
            }
        },
        'pt-BR': {
            print: {
                print: 'Imprimir'
            }
        }
    });

    // Extends plugins for print plugin.
    $.extend($.summernote.plugins, {
        /**
         * @param {Object} context - context object has status of editor.
         */
        'print': function (context) {
            var self = this;

            // ui has renders to build ui elements.
            //  - you can create a button with `ui.button`
            var ui = $.summernote.ui;
            var $editor = context.layoutInfo.editor;
            var options = context.options;
            var lang = options.langInfo;

            var isFF = function () {
                const userAgent = navigator.userAgent;
                const isEdge = /Edge\/\d+/.test(userAgent);
                return !isEdge && /firefox/i.test(userAgent)
            }

            var fillContentAndPrint = function ($frame, content) {
                
                $frame.contents().find('body').html(content);
                $frame.contents().find('header').html("kadir");
                console.log($frame.contents().find('header'));
                setTimeout(function () {
                    $frame[0].contentWindow.focus();
                    $frame[0].contentWindow.print();
                    $frame.remove();
                    $frame = null;
                }, 250);
            }

            var getPrintframe = function ($container) {
                var $frame = $(
                    '<iframe name="summernotePrintFrame"' +
                    'width="0" height="0" frameborder="0" src="about:blank" style="visibility:hidden">' +
                    '</iframe>');
                
                $frame.appendTo($editor.parent());
                //console.log($editor);
                //console.log($editor.parent());
                var $head = $frame.contents().find('head');
                $head.find("title").remove();
                $head.append("<title></title>");
                if (options.print && options.print.stylesheetUrl) {
                    // Use dedicated styles
                    var css = document.createElement('link');
                    css.href = options.print.stylesheetUrl;
                    css.rel = 'stylesheet';
                    css.type = 'text/css';
                    $head.append(css);
                }
                if (options.print && options.print.stylesheetUrl) {
                    // Use dedicated styles
                    var css = document.createElement('link');
                    css.href = options.print.stylesheetUrl1;
                    css.rel = 'stylesheet';
                    css.type = 'text/css';
                    $head.append(css);
                }
                if (options.print && options.print.stylesheetUrl) {
                    // Use dedicated styles
                    var css = document.createElement('link');
                    css.href = options.print.stylesheetUrl2;
                    css.rel = 'stylesheet';
                    css.type = 'text/css';
                    $head.append(css);
                } else {
                    // Inherit styles from document
                    $('style, link[rel=stylesheet]', document).each(function () {
                        $head.append($(this).clone());
                    });
                }
                var csspagination = '@media print {' +
                    '.page-break {  page-break-after: always; }' +
                    '}' + '@page {margin-top: 2.5cm; margin-bottom: 2.5cm; margin-left: 2.5cm; margin-right: 2.5cm;};';
                $head.append($('<style type="text/css">' + csspagination + '</style>'));
                return $frame;
            };

            // add print button
            context.memo('button.print', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-print"/> ' + lang.print.print,
                    tooltip: lang.print.print,
                    container: options.container,
                    click: function () {
                        var $frame = getPrintframe();
                        var content = context.invoke('code');
                        if (isFF()) {
                            $frame[0].onload = function () {
                                //console.log($frame[0]);
                                //console.log($frame);
                                //console.log(content);
                                fillContentAndPrint($frame, content);
                            };
                        } else {
                            //console.log($frame[0]);
                            //console.log($frame);
                            //console.log(content);
                            fillContentAndPrint($frame, content);
                        }
                    }
                });
                return button.render();
            });
        }
    });
}));
