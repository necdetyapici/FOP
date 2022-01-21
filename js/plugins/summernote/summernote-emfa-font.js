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
            emfaStrikethrough: {
                index: 'Üstü Çizili'
            }
        },
        'tr-TR': {
            emfaStrikethrough: {
                index: 'Üstü Çizili'
            }
        },
    });

    $.extend($.summernote.plugins, {
        'emfaStrikethrough': function (context) {
            let ui = $.summernote.ui;
            let $editor = context.layoutInfo.editor;
            let options = context.options;
            let lng = options.langInfo;
            
            let fireFoxMu = function () {
                const userAgent = navigator.userAgent;
                const edgeMi = /Edge\/\d+/.test(userAgent);
                return !edgeMi && /firefox/i.test(userAgent);
            }

          

            context.memo('button.emfaStrikethrough', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-strikethrough"/>',
                    tooltip: lng.emfaStrikethrough.index,
                    container: options.container,
                    click: function () {
                     document.execCommand('strikethrough');

                        

                       

                    }
                });
                return button.render();
            });
        }
    });
    // Extends plugins for print plugin.

}));



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
            emfaSubscript: {
                index: 'Alt Simge'
            }
        },
        'tr-TR': {
            emfaSubscript: {
                index: 'Alt Simge'
            }
        },
    });

    $.extend($.summernote.plugins, {
        'emfaSubscript': function (context) {
            let ui = $.summernote.ui;
            let $editor = context.layoutInfo.editor;
            let options = context.options;
            let lng = options.langInfo;

            let fireFoxMu = function () {
                const userAgent = navigator.userAgent;
                const edgeMi = /Edge\/\d+/.test(userAgent);
                return !edgeMi && /firefox/i.test(userAgent);
            }

          

            context.memo('button.emfaSubscript', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-subscript"/>',
                    tooltip: lng.emfaSubscript.index,
                    container: options.container,
                    click: function () {
                     document.execCommand('subscript');

                        

                       

                    }
                });
                return button.render();
            });
        }
    });
    // Extends plugins for print plugin.

}));


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
            emfaSuperscript: {
                index: 'Üst Simge'
            }
        },
        'tr-TR': {
            emfaSuperscript: {
                index: 'Üst Simge'
            }
        },
    });

    $.extend($.summernote.plugins, {
        'emfaSuperscript': function (context) {
            let ui = $.summernote.ui;
            let $editor = context.layoutInfo.editor;
            let options = context.options;
            let lng = options.langInfo;

            let fireFoxMu = function () {
                const userAgent = navigator.userAgent;
                const edgeMi = /Edge\/\d+/.test(userAgent);
                return !edgeMi && /firefox/i.test(userAgent);
            }

          

            context.memo('button.emfaSuperscript', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-superscript"/>',
                    tooltip: lng.emfaSuperscript.index,
                    container: options.container,
                    click: function () {
 document.execCommand('superscript');
                    
                    }
                });
                return button.render();
            });
        }
    });
    // Extends plugins for print plugin.

}));

