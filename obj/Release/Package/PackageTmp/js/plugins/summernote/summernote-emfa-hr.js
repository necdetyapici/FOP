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
            emfaHR: {
                index: 'Çizgi'
            }
        },
        'tr-TR': {
            emfaHR: {
                index: 'Çizgi'
            }
        },
    });

    $.extend($.summernote.plugins, {
        'emfaHR': function (context) {
            let ui = $.summernote.ui;
            let $editor = context.layoutInfo.editor;
            let options = context.options;
            let lng = options.langInfo;

            let fireFoxMu = function () {
                const userAgent = navigator.userAgent;
                const edgeMi = /Edge\/\d+/.test(userAgent);
                return !edgeMi && /firefox/i.test(userAgent);
            }

          

            context.memo('button.emfaHR', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-minus"/>',
                    tooltip: lng.emfaHR.index,
                    container: options.container,
                    click: function () {
                     document.execCommand('insertHorizontalRule');

                        

                       

                    }
                });
                return button.render();
            });
        }
    });
    // Extends plugins for print plugin.

}));


