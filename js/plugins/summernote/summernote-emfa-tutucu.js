
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
            emfaTutucu: {
                index: 'Yer Tutucu'
            }
        },
        'tr-TR': {
            emfaTutucu: {
                index: 'Yer Tutucu'
            }
        },
    });

    function emfaScrollClick(id) {

        var elem = document.getElementById(id);

        if (elem)
            elem.scrollIntoView();

    }
    var TutucuTipi = function (Liste, select) {
        Liste.forEach(function (item) {
            var option = document.createElement('option');
            option.append(item.ADI);
            select.appendChild(option);
            option.value = item.DOKUMAN_TUTUCU_TIPI_ID;
            //var olli = document.createElement('li');
            //olli.setAttribute("deep-watch", "true");
            //olli.setAttribute("data-value", item.KULLANICI_ID);
            //var ollia = document.createElement('a');
            //ollia.append(item.AD_SOYAD);
            //var olliaspan = document.createElement('span');
            //olliaspan.className = "glyphicon glyphicon-ok check-mark";
            //ollia.appendChild(olliaspan);
            //olli.appendChild(ollia);
            //ol.appendChild(olli);
        });
    };

    var baslikKapatSag = function (a, sagdiv) {
        a.removeChild(sagdiv);
    };

    

    $.extend($.summernote.plugins, {
        'emfaTutucu': function (context) {
            let ui = $.summernote.ui;
            let $editor = context.layoutInfo.editor;
            let options = context.options;
            let lng = options.langInfo;
            let TOKEN = sessionStorage.getItem('ngStorage-TOKEN');

            let fireFoxMu = function () {
                const userAgent = navigator.userAgent;
                const edgeMi = /Edge\/\d+/.test(userAgent);
                return !edgeMi && /firefox/i.test(userAgent);
            };

        



            context.memo('button.emfaTutucu', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-list-alt"/>',
                    tooltip: lng.emfaTutucu.index,
                    container: options.container,
                    click: function () {

                        var varmi = document.getElementById('emfasagdiv');
                        var dokumanAlan = document.getElementById('emfa');

                        if (varmi) {
                            baslikKapatSag(dokumanAlan, varmi);

                        }
                        else {
                            var sagdiv = document.createElement('div');
                            sagdiv.id = "emfasagdiv";
                            sagdiv.setAttribute("style", "float: right; background-color: white; width: 20%; height: 842px; margin: 42px 20px 0px 5px; border-radius: 5px; z-index: 1; ");
                            var row1 = document.createElement('div');
                            row1.className = "row";
                            var row1col = document.createElement('div');
                            row1col.className = "col-lg-12";
                            row1col.id = "sagIcerik";
                            var kapatButton = document.createElement('div');
                            kapatButton.className = "pull-left";
                            kButton = document.createElement('button');
                            kButton.id = "kapatButtonSag";
                            kButton.className = "btn btn-white btn-sm";
                            kapatButton.setAttribute("style", "color: white; margin: 10px 10px 10px 10px;");
                            kButtonI = document.createElement('i');
                            kButtonI.className = "fa fa-close";
                            kButton.appendChild(kButtonI);
                            kapatButton.appendChild(kButton);
                            row1col.appendChild(kapatButton);
                            row1col.appendChild(document.createElement('br'));
                            var sagBaslik = document.createElement('strong');
                            sagBaslik.append('Tutucular');
                            row1col.appendChild(sagBaslik);
                            row1col.appendChild(document.createElement('hr'));
                            var selectLabel = document.createElement('label');
                            selectLabel.setAttribute('style', 'display: inline-block; margin-bottom:.5rem; margin-left:5px; color: #676a6c;');
                            selectLabel.append('Tip');
                            row1col.appendChild(selectLabel);
                            row1col.appendChild(document.createElement('br'));
                            var select = document.createElement('select');
                            select.id = "tutucuListe";
                            select.setAttribute("style", "width: 85%; margin: 0px 0px 0px 15px; ");
                            select.className = "form-control";
                            select.setAttribute("title", "Kullanici Seçiniz");

                            $.ajax({
                                url: '/api/DokumanBaslik/DokumanTutucuTipi',
                                headers: { 'AUTH_TOKEN': TOKEN.replace(/"/g, "") },
                                method: 'get',
                                dataType: 'json',
                                data: { LISTE: false },
                                success: function (data) {
                                    TutucuTipi(data, select);

                                }
                            });


                            row1col.appendChild(select);

                            row1col.appendChild(document.createElement('hr'));

                            row1.appendChild(row1col);
                            sagdiv.appendChild(row1);


                            dokumanAlan.appendChild(sagdiv);



                        }

                        var lastCaretPos = 0;
                        var parentNode;
                        var range;
                        var selection;
                        $('.note-editable').on('keyup mouseup', function (e) {
                            selection = window.getSelection();
                            range = selection.getRangeAt(0);
                            parentNode = range.commonAncestorContainer.parentNode;
                        });

                        document.getElementById("tutucuListe").onchange = function () {
                            
                            var div = document.createElement('div');
                            div.setAttribute("style", " height: 500px; overflow-x: hidden; overflow-y: scroll; background-color: white;");
                            var ul = document.createElement('ul');
                            ul.className = "list-unstyled file-list";
                            $.ajax({
                                url: '/api/DokumanBaslik/DokumanTutucu',
                                headers: { 'AUTH_TOKEN': TOKEN.replace(/"/g, "") },
                                method: 'get',
                                dataType: 'json',
                                data: { DOKUMAN_TUTUCU_TIPI_ID: $(this).val() },
                                success: function (data) {
                                    data.Veri.forEach(function (item) {
                                        li = document.createElement('li');
                                        var a = document.createElement('a');
                                        a.setAttribute("tooltip", item.ADI);
                                        a.setAttribute("id", "tutucuEkle");
                                        a.setAttribute("tooltip-append-to-body", true);
                                        a.onclick = function () {

                                            if ($(parentNode).parents().is('.note-editable') || $(parentNode).is('.note-editable')) {

                                                var span = document.createElement('span');
                                                span.setAttribute('style', 'font-size: 12px;');
                                                span.innerHTML = item.ADI;

                                                range.deleteContents();
                                                range.insertNode(span);
                                                //cursor at the last with this
                                                range.collapse(false);
                                                selection.removeAllRanges();
                                                selection.addRange(range);
                                            } else {
                                                return;
                                            }
                                        };
                                        var i = document.createElement('i');
                                        i.className = "fa  fa-chain-broken";
                                        a.appendChild(i);
                                        if (item.ADI.length > 25) {
                                            a.append(" " + item.ADI.substring(0, 25) + "...");
                                        } else {
                                            a.append(" " + item.ADI);
                                        }

                                        li.appendChild(a);
                                        ul.appendChild(li);
                                    });

                                }
                            });
                            div.appendChild(ul);
                            var row1col = document.getElementById('sagIcerik');
                            row1col.appendChild(div);
                           
                            
                                
                               
                        };
                        
                        document.getElementById("kapatButtonSag").onclick = function () {
                            var sag = document.getElementById('emfasagdiv');
                            var alan = document.getElementById('emfa');
                            baslikKapatSag(alan, sag);
                        };

                    }
                });
                return button.render();
            });
        }
    });
    // Extends plugins for print plugin.

}));

