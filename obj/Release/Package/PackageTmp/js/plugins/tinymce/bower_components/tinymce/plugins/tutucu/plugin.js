/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*global tinymce:true */

tinymce.PluginManager.add('tutucu', function (editor) {
   

    let TOKEN = sessionStorage.getItem('ngStorage-TOKEN');

    editor.addCommand('tutucu', function () {
        
        
        var varmi = document.getElementById('emfasagdiv');
        var dokumanAlan = document.getElementById('emfa');
        if (varmi) {
            baslikKapatSag(dokumanAlan, varmi);
        }
        else {
           
            var sagdiv = document.createElement('div');
            sagdiv.id = "emfasagdiv";
            sagdiv.setAttribute("style", "float: right; background-color: white; width: 18%; height: 842px; margin: 42px 20px 0px 5px; border-radius: 5px; z-index: 1;  vertical-aling:unset !important; position: relative;");
            var row1 = document.createElement('div');
            row1.className = "row";
            var row1col = document.createElement('div');
            row1col.className = "col-lg-12";
            row1col.id = "sagIcerik";
            row1col.setAttribute("style", "font-size: 12px;");
            var kapatButton = document.createElement('div');
            kapatButton.className = "pull-left";
            kButton = document.createElement('button');
            kButton.id = "kapatButtonSag";
            kButton.className = "btn btn-white btn-sm";
            kButton.setAttribute("style", "color: inherit !important;background: white!important; border: 1px solid #e7eaec!important; padding: 7px 10px !important");
            kapatButton.setAttribute("style", "color: white; margin: 15px 10px 10px 10px;");
            kButtonI = document.createElement('i');
            kButtonI.className = "fa fa-close";
            kButton.appendChild(kButtonI);
            kapatButton.appendChild(kButton);
            row1col.appendChild(kapatButton);
            row1col.appendChild(document.createElement('br'));
            row1col.appendChild(document.createElement('br'));
            var sagBaslik = document.createElement('strong');
            sagBaslik.append('Tutucular');
            row1col.appendChild(sagBaslik);
            row1col.appendChild(document.createElement('br'));
            var select = document.createElement('select');
            select.id = "tutucuListe";
            select.setAttribute("style", "width: 85%; margin: 0px 0px 0px 15px; border: 1px solid #e5e6e7 !important; padding: 5px 0 5px 0 !important;");
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

            row1col.appendChild(document.createElement('br'));

            row1.appendChild(row1col);
            sagdiv.appendChild(row1);


            dokumanAlan.appendChild(sagdiv);



        }
        
        $('.mce-edit-area').on('keyup mouseup', function (e) {
            selection = window.getSelection();
            range = selection.getRangeAt(0);
            parentNode = range.commonAncestorContainer.parentNode;
        });

        document.getElementById("tutucuListe").onchange = function () {
            var t = document.getElementById('tutucuUl');
            if (t) {
                t.parentNode.removeChild(t);
            }
            var div = document.createElement('div');
            div.id = "tutucuUl";
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
                    ul.innerHTML = null;
                    
                    data.Veri.forEach(function (item) {
                        li = document.createElement('li');
                        var a = document.createElement('a');
                        a.setAttribute("tooltip", item.ADI);
                        a.setAttribute("id", "tutucuEkle");
                        a.setAttribute("tooltip-append-to-body", true);
                        a.onclick = function () {
                            var span = "<span style='font-size:12px;'>"+item.ADI+"</span>";
                            editor.insertContent(span);
                        };
                        var i = document.createElement('i');
                        i.className = "fa fa-chain-broken";
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
    });



    var baslikKapatSag = function (a, sagdiv) {
        a.removeChild(sagdiv);
    };



    var TutucuTipi = function (Liste, select) {
        Liste.forEach(function (item) {
            var option = document.createElement('option');
            option.append(item.ADI);
            option.value = item.DOKUMAN_TUTUCU_TIPI_ID;
            select.appendChild(option);
            
        });
    };


    editor.addButton('tutucu', {
        image: '/img/bookmark.png',
        tooltip: 'tutucu',
        cmd: 'tutucu'
    });

    //editor.addMenuItem('hr', {
    //    icon: 'hr',
    //    text: 'Horizontal line',
    //    cmd: 'InsertHorizontalRule',
    //    context: 'insert'
    //});
});
