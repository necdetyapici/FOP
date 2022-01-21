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

tinymce.PluginManager.add('basliklar', function (editor) {
  

    editor.addCommand('basliklar', function () {
        
        
        var varmi = document.getElementById('emfasoldiv');
        var dokumanAlan = document.getElementById('emfa');
        if (varmi) {
            baslikKapat(dokumanAlan, varmi);
        }
        else {
            let headings = [];
           // let content = context.invoke('code');

            var divdiv = document.createElement("div");
            
            divdiv.innerHTML = editor.getContent();

            var heads = divdiv.querySelectorAll("h1,h2,h3,h4,h5,h6");

            for (var i = 0; i < heads.length; i++) {
                heads[i].setAttribute("id", "emfa_indexing_" + i);
                headings.push(heads[i].innerText);
            }
           
            var soldiv = document.createElement('div');
            soldiv.id = "emfasoldiv";
            soldiv.setAttribute("style", "background-color: white; width: 18%; height: 842px; margin: 42px 0 0px 18px; padding: 0 0 0 0px; border-radius: 5px; z-index: 1; float: left; position: absolute;");
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
            kButton.setAttribute("style", "color: inherit !important;background: white!important; border: 1px solid #e7eaec!important; padding: 7px 10px !important");
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
            row1Baslik.append("Baþlýklar");
            row1BaslikDiv.appendChild(row1Baslik);
            row1col.appendChild(row1BaslikDiv);
            row1.appendChild(document.createElement('br'));
            var row2 = document.createElement('div');
            row2.className = "row";
            var row2col = document.createElement('div');
            row2col.className = "col-lg-12";
            row2.appendChild(row2col);
            var clientDetail = document.createElement('div');
            clientDetail.className = "client-detail";
            clientDetail.setAttribute("style", " height: 700px; overflow-x: hidden; overflow-y: scroll; background-color: white;");
            var fullHeightScroll = "<div  class='full-height-scroll'><ul class='list-group clear-list'>";

            for (let index = 0; index < headings.length; index++) {

                let aElement = document.createElement("a");
                aElement.innerHTML = headings[index];
                let liElement = document.createElement("li");
                liElement.className = "list-group-item fist-item";

                aElement.id = "_emfa_indexing_" + index;
                aElement.className = "emfa_indexing_class";


                liElement.innerHTML = aElement.outerHTML;
                fullHeightScroll = fullHeightScroll + liElement.outerHTML;


            }

            fullHeightScroll = fullHeightScroll + '</ul></div>';
            clientDetail.innerHTML = fullHeightScroll;

            row2col.appendChild(clientDetail);
            soldiv.appendChild(row1);
            soldiv.appendChild(row2);
            dokumanAlan.appendChild(soldiv);
            editor.setContent(divdiv.innerHTML);
            var elems = soldiv.getElementsByClassName("emfa_indexing_class");

            if (elems && elems.length > 0) {

                for (var i = 0; i < elems.length; i++) {

                    elems[i].addEventListener("click", function () {

                        var ids = this.id.substring(1);
                        var doc = editor.getDoc();
                        var elem = doc.getElementById(ids);
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
    });



    var baslikKapat = function (a, soldiv) {
        a.removeChild(soldiv);
    }



    


    editor.addButton('basliklar', {
        image: '/img/title.png',
        tooltip: 'basliklar',
        cmd: 'basliklar'
    });

    //editor.addMenuItem('hr', {
    //    icon: 'hr',
    //    text: 'Horizontal line',
    //    cmd: 'InsertHorizontalRule',
    //    context: 'insert'
    //});
});
