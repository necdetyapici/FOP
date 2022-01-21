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
            emfa: {
                index: 'Add Index',
                docx: 'Upload Word',
                docxsave: "Save Word"
            }
        },
        'tr-TR': {
            emfa: {
                index: 'İçindekiler Ekle',
                docx: 'Word Yükle',
                docxsave: "Word Kaydet",
            }
        },
    });

    $.extend($.summernote.plugins, {
        'emfa': function (context) {
            let ui = $.summernote.ui;
            let $editor = context.layoutInfo.editor;
            let options = context.options;
            let lng = options.langInfo;

            let fireFoxMu = function () {
                const userAgent = navigator.userAgent;
                const edgeMi = /Edge\/\d+/.test(userAgent);
                return !edgeMi && /firefox/i.test(userAgent);
            }



            context.memo('button.emfa', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-check"/> ' + lng.emfa.index,
                    tooltip: lng.emfa.index,
                    container: options.container,
                    click: function () {

                        let headings = [];
                        let content = context.invoke('code');

                        var divdiv = document.createElement("div");
                        divdiv.innerHTML = content;

                        var b = divdiv.getElementsByClassName("emfa_indexing");

                        if (b.length > 0) {


                            while (b.length > 0) {
                                divdiv.removeChild(b[0]);
                            }



                        }

                        var heads = divdiv.querySelectorAll("h1,h2,h3,h4,h5,h6");

                        for (var i = 0; i < heads.length; i++) {
                            heads[i].setAttribute("id", "emfa_indexing_" + i);
                            headings.push(heads[i].innerText);
                        }

                        content = divdiv.innerHTML;

                        //let index = 0;                       

                        //while (index < content.length) {
                        //    var start = content.indexOf("<", index);
                        //    var end = content.indexOf(">", index);
                        //    var startTag = content.substring(start + 1, end);

                        //    var nextTagStart = content.indexOf("<", end + 1);
                        //    var nextTagEnd = content.indexOf(">", end + 1);
                        //    var nextTag = content.substring(nextTagStart + 1, nextTagEnd);

                        //    if (startTag.startsWith("h1") || startTag.startsWith("h2") || startTag.startsWith("h3") || startTag.startsWith("h4") || startTag.startsWith("h5") || startTag.startsWith("h6")) {
                        //        if (nextTag.startsWith("/")) {

                        //            headings.push(content.substring(end + 1, nextTagStart));

                        //        }
                        //        else {
                        //            var currentTag = "";
                        //            while (currentTag == "" && nextTagEnd != -1 && nextTagEnd < content.length) {
                        //                nextTagStart = content.indexOf("<", nextTagEnd + 1);
                        //                nextTagEnd = content.indexOf(">", nextTagEnd + 1);
                        //                nextTag = content.substring(nextTagStart + 1, nextTagEnd);

                        //                if (nextTag.startsWith("/") && nextTag.startsWith("h", 1)) {
                        //                    headings.push(content.substring(end + 1, nextTagStart));
                        //                    currentTag = nextTag;
                        //                }

                        //            }


                        //        }


                        //            index = nextTagEnd + 1;



                        //    }
                        //    else {



                        //        if (nextTag.startsWith("/")) {
                        //            index = nextTagEnd + 1;
                        //        }
                        //        else {
                        //            index = nextTagStart;
                        //        }
                        //    }


                        //    if (nextTagEnd == -1) {
                        //        break;
                        //    }

                        //}

                        var indexing = "<h1 class='emfa_indexing'>İçindekiler</h1><br class='emfa_indexing'/><ol class='emfa_indexing'>";

                        for (let index = 0; index < headings.length; index++) {



                            indexing = indexing + "<li><a class='emfa_indexing_index_a' href='#emfa_indexing_" + index + "' target='_self' id='_emfa_indexing_" + index + "'>" + headings[index] + "</a></li>";


                        }

                        indexing = indexing + "</ol><br class='emfa_indexing'/>";

                        indexing = indexing + content;

                       

                        context.invoke("code", indexing);

                        var docs = document.getElementsByClassName('emfa_indexing_index_a');

                        for (var i = 0; i < docs.length; i++) {
                            docs[i].addEventListener("click", function (event) {
                             
                                var c = this.id.substring(1);
                                let b = document.getElementById(c);
                                b.scrollIntoView();
                            })
                            
                            
                        }

                      
                        document.getElementsByClassName("note-editable")[0].scrollTop = 0;


                    }
                });
                return button.render();
            });
        }
    });


    $.extend($.summernote.plugins, {
        'emfadocx': function (context) {
            let ui = $.summernote.ui;
            let $editor = context.layoutInfo.editor;
            let options = context.options;
            let lng = options.langInfo;

            let fireFoxMu = function () {
                const userAgent = navigator.userAgent;
                const edgeMi = /Edge\/\d+/.test(userAgent);
                return !edgeMi && /firefox/i.test(userAgent);
            }

            function dosyaOku(event, callback) {
                let file = event.target.files[0];
                let reader = new FileReader();

                reader.onload = function (load) {
                    let buffer = load.target.result;
                    callback(buffer);
                }

                reader.readAsArrayBuffer(file);
            }



            context.memo('button.emfadocx', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-file-word-o"/> ' + lng.emfa.docx,
                    tooltip: lng.emfa.docx,
                    container: options.container,
                    click: function () {

                        var docx = document.createElement("input");
                        docx.type = "file";
                        docx.style.display = "none";
                        //docx.click = function (event) {
                        //    debugger;
                        //    console.log(event);

                        //};

                        docx.click();
                        docx.addEventListener("change", function (event) {
                            dosyaOku(event, function (buffer) {
                                mammoth.convertToHtml({ arrayBuffer: buffer }).then(function (result) {
                                    context.invoke("code", result.value);

                                    var docs = document.getElementsByTagName("a");

                                    for (var i = 0; i < docs.length; i++) {
                                        
                                        if (docs[i].href.indexOf("#_Toc") > -1) {
                                            console.log(docs[i].href);
                                            docs[i].href = "";
                                            
                                        }

                                    }

                                }).done();
                            })
                        });



                    }
                });
                return button.render();
            });
        }
    });

    $.extend($.summernote.plugins, {
        'emfasave': function (context) {
            let ui = $.summernote.ui;
            let $editor = context.layoutInfo.editor;
            let options = context.options;
            let lng = options.langInfo;

            let fireFoxMu = function () {
                const userAgent = navigator.userAgent;
                const edgeMi = /Edge\/\d+/.test(userAgent);
                return !edgeMi && /firefox/i.test(userAgent);
            }

            function dosyaOku(event, callback) {
                let file = event.target.files[0];
                let reader = new FileReader();

                reader.onload = function (load) {
                    let buffer = load.target.result;
                    callback(buffer);
                }

                reader.readAsArrayBuffer(file);
            }

            function convertImagesToBase64(content) {
                //  contentDocument = tinymce.get('content').getDoc();
                var doc = document.createElement("div");
                doc.innerHTML = content;
                var regularImages = doc.querySelectorAll("img");
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                [].forEach.call(regularImages, function (imgElement) {

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.width = imgElement.width;
                    canvas.height = imgElement.height;

                    ctx.drawImage(imgElement, 0, 0);

                    var dataURL = canvas.toDataURL();
                    imgElement.setAttribute('src', dataURL);
                })
                canvas.remove();
            }

            var saveAs = saveAs
                // IE 10+ (native saveAs)
                || (typeof navigator !== "undefined" &&
                    navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
                // Everyone else
                || (function (view) {
                    "use strict";
                    // IE <10 is explicitly unsupported
                    if (typeof navigator !== "undefined" &&
                        /MSIE [1-9]\./.test(navigator.userAgent)) {
                        return;
                    }
                    var
                        doc = view.document
                        // only get URL when necessary in case Blob.js hasn't overridden it yet
                        , get_URL = function () {
                            return view.URL || view.webkitURL || view;
                        }
                        , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
                        , can_use_save_link = !view.externalHost && "download" in save_link
                        , click = function (node) {
                            var event = doc.createEvent("MouseEvents");
                            event.initMouseEvent(
                                "click", true, false, view, 0, 0, 0, 0, 0
                                , false, false, false, false, 0, null
                            );
                            node.dispatchEvent(event);
                        }
                        , webkit_req_fs = view.webkitRequestFileSystem
                        , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
                        , throw_outside = function (ex) {
                            (view.setImmediate || view.setTimeout)(function () {
                                throw ex;
                            }, 0);
                        }
                        , force_saveable_type = "application/octet-stream"
                        , fs_min_size = 0
                        , deletion_queue = []
                        , process_deletion_queue = function () {
                            var i = deletion_queue.length;
                            while (i--) {
                                var file = deletion_queue[i];
                                if (typeof file === "string") { // file is an object URL
                                    get_URL().revokeObjectURL(file);
                                } else { // file is a File
                                    file.remove();
                                }
                            }
                            deletion_queue.length = 0; // clear queue
                        }
                        , dispatch = function (filesaver, event_types, event) {
                            event_types = [].concat(event_types);
                            var i = event_types.length;
                            while (i--) {
                                var listener = filesaver["on" + event_types[i]];
                                if (typeof listener === "function") {
                                    try {
                                        listener.call(filesaver, event || filesaver);
                                    } catch (ex) {
                                        throw_outside(ex);
                                    }
                                }
                            }
                        }
                        , FileSaver = function (blob, name) {
                            // First try a.download, then web filesystem, then object URLs
                            var
                                filesaver = this
                                , type = blob.type
                                , blob_changed = false
                                , object_url
                                , target_view
                                , get_object_url = function () {
                                    var object_url = get_URL().createObjectURL(blob);
                                    deletion_queue.push(object_url);
                                    return object_url;
                                }
                                , dispatch_all = function () {
                                    dispatch(filesaver, "writestart progress write writeend".split(" "));
                                }
                                // on any filesys errors revert to saving with object URLs
                                , fs_error = function () {
                                    // don't create more object URLs than needed
                                    if (blob_changed || !object_url) {
                                        object_url = get_object_url(blob);
                                    }
                                    if (target_view) {
                                        target_view.location.href = object_url;
                                    } else {
                                        window.open(object_url, "_blank");
                                    }
                                    filesaver.readyState = filesaver.DONE;
                                    dispatch_all();
                                }
                                , abortable = function (func) {
                                    return function () {
                                        if (filesaver.readyState !== filesaver.DONE) {
                                            return func.apply(this, arguments);
                                        }
                                    };
                                }
                                , create_if_not_found = { create: true, exclusive: false }
                                , slice
                                ;
                            filesaver.readyState = filesaver.INIT;
                            if (!name) {
                                name = "download";
                            }
                            if (can_use_save_link) {
                                object_url = get_object_url(blob);
                                save_link.href = object_url;
                                save_link.download = name;
                                click(save_link);
                                filesaver.readyState = filesaver.DONE;
                                dispatch_all();
                                return;
                            }
                            // Object and web filesystem URLs have a problem saving in Google Chrome when
                            // viewed in a tab, so I force save with application/octet-stream
                            // http://code.google.com/p/chromium/issues/detail?id=91158
                            if (view.chrome && type && type !== force_saveable_type) {
                                slice = blob.slice || blob.webkitSlice;
                                blob = slice.call(blob, 0, blob.size, force_saveable_type);
                                blob_changed = true;
                            }
                            // Since I can't be sure that the guessed media type will trigger a download
                            // in WebKit, I append .download to the filename.
                            // https://bugs.webkit.org/show_bug.cgi?id=65440
                            if (webkit_req_fs && name !== "download") {
                                name += ".download";
                            }
                            if (type === force_saveable_type || webkit_req_fs) {
                                target_view = view;
                            }
                            if (!req_fs) {
                                fs_error();
                                return;
                            }
                            fs_min_size += blob.size;
                            req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
                                fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir) {
                                    var save = function () {
                                        dir.getFile(name, create_if_not_found, abortable(function (file) {
                                            file.createWriter(abortable(function (writer) {
                                                writer.onwriteend = function (event) {
                                                    target_view.location.href = file.toURL();
                                                    deletion_queue.push(file);
                                                    filesaver.readyState = filesaver.DONE;
                                                    dispatch(filesaver, "writeend", event);
                                                };
                                                writer.onerror = function () {
                                                    var error = writer.error;
                                                    if (error.code !== error.ABORT_ERR) {
                                                        fs_error();
                                                    }
                                                };
                                                "writestart progress write abort".split(" ").forEach(function (event) {
                                                    writer["on" + event] = filesaver["on" + event];
                                                });
                                                writer.write(blob);
                                                filesaver.abort = function () {
                                                    writer.abort();
                                                    filesaver.readyState = filesaver.DONE;
                                                };
                                                filesaver.readyState = filesaver.WRITING;
                                            }), fs_error);
                                        }), fs_error);
                                    };
                                    dir.getFile(name, { create: false }, abortable(function (file) {
                                        // delete file if it already exists
                                        file.remove();
                                        save();
                                    }), abortable(function (ex) {
                                        if (ex.code === ex.NOT_FOUND_ERR) {
                                            save();
                                        } else {
                                            fs_error();
                                        }
                                    }));
                                }), fs_error);
                            }), fs_error);
                        }
                        , FS_proto = FileSaver.prototype
                        , saveAs = function (blob, name) {
                            return new FileSaver(blob, name);
                        }
                        ;
                    FS_proto.abort = function () {
                        var filesaver = this;
                        filesaver.readyState = filesaver.DONE;
                        dispatch(filesaver, "abort");
                    };
                    FS_proto.readyState = FS_proto.INIT = 0;
                    FS_proto.WRITING = 1;
                    FS_proto.DONE = 2;

                    FS_proto.error =
                        FS_proto.onwritestart =
                        FS_proto.onprogress =
                        FS_proto.onwrite =
                        FS_proto.onabort =
                        FS_proto.onerror =
                        FS_proto.onwriteend =
                        null;

                    view.addEventListener("unload", process_deletion_queue, false);
                    saveAs.unload = function () {
                        process_deletion_queue();
                        view.removeEventListener("unload", process_deletion_queue, false);
                    };
                    return saveAs;
                }(
                    typeof self !== "undefined" && self
                    || typeof window !== "undefined" && window
                    || this.content
                ));
            // `self` is undefined in Firefox for Android content script context
            // while `this` is nsIContentFrameMessageManager
            // with an attribute `content` that corresponds to the window

            if (typeof module !== "undefined" && module !== null) {
                module.exports = saveAs;
            } else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
                define([], function () {
                    return saveAs;
                });
            }



            context.memo('button.emfasave', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-floppy-o"/> ' + lng.emfa.docxsave,
                    tooltip: lng.emfa.docxsave,
                    container: options.container,
                    click: function () {

                        let contentDocument = context.invoke('code');

                        convertImagesToBase64(contentDocument);

                        let content = '<!DOCTYPE html>' + contentDocument;

                        let converted = htmlDocx.asBlob(content, { orientation: 'portrait' });

                        saveAs(converted, 'pictdocument.docx');

                        let link = document.createElement('a');
                        link.href = URL.createObjectURL(converted);
                        link.download = 'document.docx';
                        link.appendChild(
                            document.createTextNode('İndirme işlemi başlamdıysa buraya tıklayınız.'));

                        let area = document.getElementById("download-area");

                        if (area) {

                        }
                        else {
                            area = document.createElement("div");
                            area.id = "download-area";
                            let body = document.getElementsByTagName("body")[0];
                            body.appendChild(area);
                        }


                        let downloadArea = document.getElementById('download-area');
                        downloadArea.innerHTML = '';
                        downloadArea.appendChild(link);



                    }
                });
                return button.render();
            });
        }
    });


}));
//(function (factory) {
//    /* global define */
//    if (typeof define === 'function' && define.amd) {
//        // AMD. Register as an anonymous module.
//        define(['jquery'], factory);
//    } else if (typeof module === 'object' && module.exports) {
//        // Node/CommonJS
//        module.exports = factory(require('jquery'));
//    } else {
//        // Browser globals
//        factory(window.jQuery);
//    }
//}(function ($) {
//    // Extends lang for print plugin.
//    $.extend(true, $.summernote.lang, {
//        'en-US': {
//            print: {
//                print: 'Print'
//            }
//        },
//        'tr-TR': {
//            print: {
//                print: 'Yazdır'
//            }
//        },
//        'pt-BR': {
//            print: {
//                print: 'Imprimir'
//            }
//        }
//    });

//    // Extends plugins for print plugin.
//    $.extend($.summernote.plugins, {
//        /**
//         * @param {Object} context - context object has status of editor.
//         */
//        'print': function (context) {
//            var self = this;

//            // ui has renders to build ui elements.
//            //  - you can create a button with `ui.button`
//            var ui = $.summernote.ui;
//            var $editor = context.layoutInfo.editor;
//            var options = context.options;
//            var lang = options.langInfo;

//            var isFF = function () {
//                const userAgent = navigator.userAgent;
//                const isEdge = /Edge\/\d+/.test(userAgent);
//                return !isEdge && /firefox/i.test(userAgent)
//            }

//            var fillContentAndPrint = function ($frame, content) {
//                $frame.contents().find('body').html(content);

//                setTimeout(function () {
//                    $frame[0].contentWindow.focus();
//                    $frame[0].contentWindow.print();
//                    $frame.remove();
//                    $frame = null;
//                }, 250);
//            }

//            var getPrintframe = function ($container) {
//                var $frame = $(
//                    '<iframe name="summernotePrintFrame"' +
//                    'width="0" height="0" frameborder="0" src="about:blank" style="visibility:hidden">' +
//                    '</iframe>');
//                $frame.appendTo($editor.parent());

//                var $head = $frame.contents().find('head');
//                if (options.print && options.print.stylesheetUrl) {
//                    // Use dedicated styles
//                    var css = document.createElement('link');
//                    css.href = options.print.stylesheetUrl;
//                    css.rel = 'stylesheet';
//                    css.type = 'text/css';
//                    $head.append(css);
//                } else {
//                    // Inherit styles from document
//                    $('style, link[rel=stylesheet]', document).each(function () {
//                        $head.append($(this).clone());
//                    });
//                }

//                return $frame;
//            };

//            // add print button
//            context.memo('button.print', function () {
//                // create button
//                var button = ui.button({
//                    contents: '<i class="fa fa-print"/> ' + lang.print.print,
//                    tooltip: lang.print.print,
//                    container: options.container,
//                    click: function () {
//                        var $frame = getPrintframe();
//                        var content = context.invoke('code');

//                        if (isFF()) {
//                            $frame[0].onload = function () {
//                                fillContentAndPrint($frame, content);
//                            };
//                        } else {
//                            fillContentAndPrint($frame, content);
//                        }
//                    }
//                });
//                return button.render();
//            });
//        }
//    });
//}));