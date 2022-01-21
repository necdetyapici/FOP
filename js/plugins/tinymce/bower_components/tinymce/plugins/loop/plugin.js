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


tinymce.PluginManager.add('loop', function (ed) {

    ed.addCommand('loop', function () {
        function tutucuBaslik(selected) {
            var doc = ed.getDoc();
            var div = doc.getElementById("baslik" + selected);
            if (div) {
                div.parentElement.removeChild(div);
            }
            var div = document.createElement('div');
            div.className = "xloopChild";
            div.setAttribute("contenteditable", false);
            var button = document.createElement('button');
            button.id = "tutucu" + selected;
            button.setAttribute("style", "color: inherit !important;background: white!important; border: 1px solid #e7eaec!important; padding: 0px 9px 0px 10px !important");
            
            button.className = "btnstyle";
            button.setAttribute("contenteditable", false);
            button.append("Kapat");
            button.onclick = function () {
                var tinyclass = ed.getDoc().getElementById("sel-mce_0");
                tinyclass.parentElement.removeChild(tinyclass);
                var xloop = ed.getDoc().getElementById(selected);
                xloop.removeChild(xloop.firstChild);
                if (xloop) {
                    var prev = xloop.previousSibling;
                    if (prev) {
                        if (prev.childNodes.length == 0 || (prev.childNodes.length == 1 && prev.childNodes[0].nodeType == Node.TEXT_NODE && prev.childNodes[0].data == "")) {
                            prev.parentNode.removeChild(prev);
                        }
                    }
                    var next = xloop.nextSibling;
                    if (next) {
                        if (next.childNodes.length == 0 || (next.childNodes.length == 1 && next.childNodes[0].nodeType == Node.TEXT_NODE && next.childNodes[0].data == "")) {
                            next.parentNode.removeChild(next);
                        }
                    }
                    for (var i = 0; i < xloop.childNodes.length; i++) {
                        var icerik = xloop.childNodes[i].cloneNode(true);
                        xloop.parentNode.insertBefore(icerik, xloop);
                    }
                    xloop.parentNode.removeChild(xloop);
                   
                }
            }
            //button.appendChild(buttonI);
            div.appendChild(button);
            var span = document.createElement('span');
            span.setAttribute("contenteditable", false);
            span.append("Tutucu #" + selected);
            div.append(span);
            div.style.color = "red";
            div.id = "baslik" + selected;
            var maindiv = doc.getElementById(selected);
            maindiv.insertBefore(div, maindiv.childNodes[0]);
        }

        let TOKEN = sessionStorage.getItem('ngStorage-TOKEN');

        var select = "";
        var selected = "";
        $.ajax({
            url: '/api/DokumanTutucuLoop',
            headers: { 'AUTH_TOKEN': TOKEN.replace(/"/g, "") },
            method: 'get',
            dataType: 'json',
            success: function (data) {


                select = '<select class="mce-textbox mce-placeholder" id="select-tekrar">';
                data.forEach(function (item) {
                    var option = '<option value="' + item.TUTUCU_LOOP + '">' + item.TUTUCU_LOOP + '</option>';
                    select = select + option;
                });
                select = select + "</select>";

                ed.windowManager.open({
                    title: 'Tekrarlayici',
                    body: [{
                        type: "container",
                        html: '<form action="" method="POST" enctype="multipart/form-data">' +
                            '<div class="mce-container" hidefocus="1" tabindex="-1">' +
                            '<div class="mce-container-body">' +
                            '<label>Tekrarlayici Sec<br />' +
                            select +
                            '</label></div>' +
                            '</div>' +
                            '</form>'
                    }],
                    onSubmit: function () {

                        var s = document.getElementById('select-tekrar');
                        selected = s.options[s.selectedIndex].value;

                        var kontrol = ed.getDoc();
                        var div = kontrol.getElementById("baslik" + selected);
                        if (div == null) {

                            if (ed.selection.getContent() != "") {
                                var seciliAlan = ed.selection.getContent();
                                var loop = "<div id='" + selected + "' class='xloop' style='border-color:red; border-top-style: solid; border-bottom-style: solid; border-right-style: solid; border-top-width:1px; border-bottom-width:1px; border-right-width:1px; display: block; padding: 0px 0px 2px 0px; '>";
                                loop = loop + seciliAlan + "</div>";
                                ed.selection.setContent(loop);
                                tutucuBaslik(selected);
                            } else {
                                ed.insertContent("<div id='" + selected + "' class='xloop' style='border-color:red; border-top-style: solid; border-bottom-style: solid; border-right-style: solid; border-top-width:1px; border-bottom-width:1px; border-right-width:1px;  display: block; padding: 0px 0px 2px 0px;'> <p><br ></p></div> <p><br></p>");
                                tutucuBaslik(selected);

                            }
                        }

                        
                  
                        ed.focus();

                        ed.windowManager.close();



                        return false;
                    }


                });


            }
        });



        //var maindiv = document.getElementById(selected);
        //maindiv.onmouseup = function () {
        //    tutucuBaslik(selected);
        //}

        //loopKontrol = editor.getDoc().getElementById('xloop');
        //if (loopKontrol == null) {
        //    var seciliAlan = editor.selection.getContent();
        //    var loop = "<div id='xloop' style='border: 1px solid red; display: block; padding: 2px;'>";
        //    loop = loop + seciliAlan + "</div>";
        //    editor.selection.setContent(loop);

        //} else {

        //    var prev = loopKontrol.previousSibling;
        //    if (prev) {
        //        if (prev.childNodes.length == 0 || (prev.childNodes.length == 1 && prev.childNodes[0].nodeType == Node.TEXT_NODE && prev.childNodes[0].data == "")) {
        //            prev.parentNode.removeChild(prev);
        //        }
        //    }
        //    var next = loopKontrol.nextSibling;
        //    if (next) {
        //        if (next.childNodes.length == 0 || (next.childNodes.length == 1 && next.childNodes[0].nodeType == Node.TEXT_NODE && next.childNodes[0].data == "")) {
        //            next.parentNode.removeChild(next);
        //        }
        //    }
        //    for (var i = 0; i < loopKontrol.childNodes.length; i++) {
        //        var icerik = loopKontrol.childNodes[i].cloneNode(true);
        //        loopKontrol.parentNode.insertBefore(icerik, loopKontrol);
        //    }
        //    loopKontrol.parentNode.removeChild(loopKontrol);


        //    console.log(loopKontrol);
        //}


    });





    ed.addButton('loop', {
        image: '/img/bookmark.png',
        tooltip: 'loop',
        cmd: 'loop'
    });

});
