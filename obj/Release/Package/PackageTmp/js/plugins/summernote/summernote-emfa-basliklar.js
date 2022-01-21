
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
            emfaBasliklar: {
                index: 'Başlıklar Göster'
            }
        },
        'tr-TR': {
            emfaBasliklar: {
                index: 'Başlıklar Göster'
            }
        },
    });

    function emfaScrollClick(id) {

        var elem = document.getElementById(id);

        if (elem)
            elem.scrollIntoView();

    }

    $.extend($.summernote.plugins, {
        'emfaBasliklar': function (context) {
            let ui = $.summernote.ui;
            let $editor = context.layoutInfo.editor;
            let options = context.options;
            let lng = options.langInfo;

            var baslikKapat = function (a, soldiv) {
                a.removeChild(soldiv);
            }

            let fireFoxMu = function () {
                const userAgent = navigator.userAgent;
                const edgeMi = /Edge\/\d+/.test(userAgent);
                return !edgeMi && /firefox/i.test(userAgent);
            }




            context.memo('button.emfaBasliklar', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-list-alt"/>',
                    tooltip: lng.emfaBasliklar.index,
                    container: options.container,
                    click: function () {

                        var varmi = document.getElementById('emfasoldiv');
                        var dokumanAlan = document.getElementById('emfa');
                        // var b = document.getElementsByClassName('note-handle')[0];
                        // var c = document.getElementsByClassName('note-codable')[0];
                        //  var d = document.getElementsByClassName('note-editable')[0];
                        //  a.innerHTML = "";
                        if (varmi) {
                            baslikKapat(dokumanAlan, varmi);

                        }
                        else {
                            //var div = document.createElement('div');

                            let headings = [];
                            let content = context.invoke('code');

                            var divdiv = document.createElement("div");
                            divdiv.innerHTML = content;





                            var heads = divdiv.querySelectorAll("h1,h2,h3,h4,h5,h6");

                            for (var i = 0; i < heads.length; i++) {
                                heads[i].setAttribute("id", "emfa_indexing_" + i);
                                headings.push(heads[i].innerText);
                            }


                            var soldiv = document.createElement('div');
                            soldiv.id = "emfasoldiv";
                            soldiv.setAttribute("style", "background-color: white; width: 20%; height: 842px; margin: 42px 0 0px 18px; padding: 0 0 0 0px; border-radius: 5px; z-index: 1; float: left; ");
                            var row1 = document.createElement('div');
                            row1.className = "row";
                            var row1col = document.createElement('div');
                            row1col.className = "col-lg-12";
                            row1.appendChild(row1col);
                            
                            var kapatButton = document.createElement('div');
                            kapatButton.className = "pull-right";
                            kButton = document.createElement('button');
                            kButton.id = "kapatButton";
                            kButton.className = "btn btn-white btn-sm";
                            kapatButton.setAttribute("style", "color: white; margin: 10px 10px 0 10px;");
                            kButtonI = document.createElement('i');
                            kButtonI.className = "fa fa-close";
                            kButton.appendChild(kButtonI);
                            kapatButton.appendChild(kButton);
                            row1col.appendChild(kapatButton);
                            var row1BaslikDiv = document.createElement('div');
                            row1BaslikDiv.className = "pull-left";
                            row1BaslikDiv.setAttribute('style', 'margin: 17px 0 0 10px;');
                            var row1Baslik = document.createElement('strong');
                            row1Baslik.append("Başlıklar");
                            row1BaslikDiv.appendChild(row1Baslik);
                            row1col.appendChild(row1BaslikDiv);
                            row1col.appendChild(document.createElement('br'));
                            row1col.appendChild(document.createElement('br'));
                            row1col.appendChild(document.createElement('hr'));
                            var row2 = document.createElement('div');
                            row2.className = "row";
                            var row2col = document.createElement('div');
                            row2col.className = "col-lg-12";
                            row2.appendChild(row2col);
                            var clientDetail = document.createElement('div');
                            clientDetail.className = "client-detail";
                            clientDetail.setAttribute("style", " height: 765px; overflow-x: hidden; overflow-y: scroll; background-color: white;");
                            var fullHeightScroll = "<div  class='full-height-scroll'><ul class='list-group clear-list'>";
                            //fullHeightScroll.setAttribute('full-scroll');
                            for (let index = 0; index < headings.length; index++) {

                                let aElement = document.createElement("a");
                                aElement.innerHTML = headings[index];
                                let liElement = document.createElement("li");
                                liElement.className = "list-group-item fist-item";

                                aElement.id = "_emfa_indexing_" + index;
                                aElement.className = "emfa_indexing_class";
                                //aElement.onclick = function () {
                                //    debugger;
                                //    var ids = aElement.id.substring(1);
                                //    var elem = document.getElementById(ids);

                                //    if (elem)
                                //        elem.scrollIntoView();
                                //}


                                liElement.innerHTML = aElement.outerHTML;
                                fullHeightScroll = fullHeightScroll + liElement.outerHTML;


                            }

                            fullHeightScroll = fullHeightScroll + '</ul></div>';
                            clientDetail.innerHTML = fullHeightScroll;
                            
                            row2col.appendChild(clientDetail);
                            soldiv.appendChild(row1);
                            soldiv.appendChild(row2);
                            dokumanAlan.appendChild(soldiv);

                            context.invoke('code', divdiv.innerHTML);
                            var elems = soldiv.getElementsByClassName("emfa_indexing_class");

                            if (elems && elems.length > 0) {

                                for (var i = 0; i < elems.length; i++) {

                                    elems[i].addEventListener("click", function () {

                                        var ids = this.id.substring(1);
                                        var elem = document.getElementById(ids);

                                        if (elem)
                                            elem.scrollIntoView();
                                    });
                                }
                            }

                        }

                        document.getElementById("kapatButton").onclick = function () {
                            var sol = document.getElementById('emfasoldiv');
                            var alan = document.getElementById('emfa');
                            baslikKapat(alan, sol);
                        };







                    }
                });
                return button.render();
            });
        }
    });
    // Extends plugins for print plugin.

}));

