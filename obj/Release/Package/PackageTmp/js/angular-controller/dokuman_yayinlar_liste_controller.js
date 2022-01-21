angular.module('inspinia').controller(
    'dokuman_yayinlar_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokuman', 'Constants', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokuman, Constants, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanCinsi = Constants.DOKUMAN_CINSI;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.DOKUMAN_CINSI_ID = null;
                $scope.treeData = [];
                $scope.DokumanKlasorYetkiGetData();
            };

            $scope.AramaKriter = {
                YAYIN: true
            }

            $scope.DokumanKlasorYetkiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokuman.DokumanKlasorYetkiGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length === 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman klasör listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman klasör listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.treeData = gelen.data.Veri;
                        $("#tree").jstree("destroy");
                        $("#tree").jstree({
                            "core": {
                                'data': $scope.treeData,
                                "check_callback": true
                            },
                            "plugins": ["types", "dnd"],
                            "types": {
                                "klasor": {
                                    'icon': "fa fa-folder"
                                },
                                "emfadokuman": {
                                    "icon": 'img/login/pict-logo16x16.png'
                                },
                                "png": {
                                    "icon": "fa fa-file-picture-o"
                                },
                                "jpeg": {
                                    "icon": "fa fa-file-picture-o"
                                },
                                "jpg": {
                                    "icon": "fa fa-file-picture-o"
                                },
                                "tiff": {
                                    "icon": "fa fa-file-picture-o"
                                },
                                "pdf": {
                                    "icon": "fa fa-file-pdf-o"
                                },
                                "xlsx": {
                                    "icon": "fa fa-file-excel-o"
                                },
                                "xls": {
                                    "icon": "fa fa-file-excel-o"
                                },
                                "doc": {
                                    "icon": "fa fa-file-word-o"
                                },
                                "docx": {
                                    "icon": "fa fa-file-word-o"
                                },
                                "ppt": {
                                    "icon": "fa fa-file-powerpoint-o"
                                },
                                "pptx": {
                                    "icon": "fa fa-file-powerpoint-o"
                                },
                                "zip": {
                                    "icon": "fa fa-file-archive-o"
                                },
                                "default": {
                                    "icon": "fa fa-file-text-o"
                                },

                            }
                        });
                        $("#tree").on("select_node.jstree",
                            function (evt, data) {
                                $scope.DOKUMAN_CINSI_ID = data.node.original.type_id;
                                $scope.DOKUMAN_CINSI_GOSTER = data.node.original.type_goster;
                                if (data.node.original.dokuman_klasor_id !== null) {
                                    $scope.DOKUMAN_KLASOR_ID = data.node.original.dokuman_klasor_id;
                                }
                                if (data.node.original.dokuman_id !== null) {

                                    $scope.DOKUMAN_ID = data.node.original.dokuman_id;


                                } else {
                                    $scope.InfoDokumanYayinlar = null;
                                    document.getElementById('onizleme').innerHTML = null;
                                    $scope.DOKUMAN_ID = null;
                                }
                                $scope.DokumanOnIzleme(data.node.original.dokuman_id);


                            }
                        );
                        $("#tree").on("move_node.jstree", function (e, data) {
                            var InfoKlasorGuncelleme = { DOKUMAN_KLASOR_ID: data.node.id, UST_DOKUMAN_KLASOR_ID: data.node.parent, ADI: data.node.text };
                            $scope.DokumanKlasorEkleGuncelle(InfoKlasorGuncelleme, null);
                        });

                        
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Doküman klasor yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.AramaKriterOnIzleme = {
                DOKUMAN_ID: ''
                
            };

            $scope.DokumanOnIzleme = function (dokumanid) {
                $scope.AramaKriterOnIzleme.DOKUMAN_ID = dokumanid;
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokuman.DokumanYayinOnIzleme($scope.AramaKriterOnIzleme);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false && dokumanid !== null) {
                        mesajGoster('Dikkat', 'Doküman ön izleme bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman ön izleme bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoDokumanYayinlar = gelen.data;
                        //document.getElementById('onizleme').innerHTML = gelen.data.DOKUMAN_ON_IZLEME;
                        if ($scope.DOKUMAN_CINSI_GOSTER == true && $scope.DOKUMAN_CINSI_ID == $scope.dokumanCinsi.klasor) {
                            $scope.InfoDokumanYayinlar.DOKUMAN_ON_IZLEME = null;
                        }

                        else if ($scope.DOKUMAN_CINSI_GOSTER == true && $scope.DOKUMAN_CINSI_ID == $scope.dokumanCinsi.emfadokuman) {

                            $scope.DOKUMAN_ON_IZLEME = gelen.data.DOKUMAN_ON_IZLEME;
                        }
                        else if ($scope.DOKUMAN_CINSI_GOSTER == true && $scope.DOKUMAN_CINSI_ID != $scope.dokumanCinsi.emfadokuman && $scope.DOKUMAN_CINSI_ID != $scope.dokumanCinsi.klasor) {
                            document.getElementById('pdf').src = gelen.data.DOKUMAN_ON_IZLEME;
                        }
                        else {
                            document.getElementById('imgpdf').src = gelen.data.DOKUMAN_ON_IZLEME; //path yolu gelecek.
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman ön izleme bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.DokumanYayinWordIndir = function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display:none";
                a.href = "api/Dokuman/DokumanYayinWordIndir?t=" + $rootScope.$storage.TOKEN.toString().split('=').join('_') + "&id=" + $scope.DOKUMAN_ID;
                a.click();
                window.URL.revokeObjectURL(urll);

            }
            $scope.WordOlarakIndir2 = function () {
                var doc = {
                    ID: $scope.DOKUMAN_ID,
                    TYPE: "docx",
                };

                var promise = srvDokuman.DokumanIndir(doc);

                promise.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman ön izleme bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman ön izleme bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                        return;
                    }

                    // var content = headers["content-type"] || "application/octet-stream";
                    var url = window.URL || window.webKitURL || window.mozURL || window.msURL;
                    var b = gelen.data.GeriDonusDeger;

                    if (url) {
                        var blob = new Blob([b]);
                        var urll = url.createObjectURL(blob);
                        var a = document.createElement("a");
                        document.body.appendChild(a);
                        a.style = "display:none";
                        a.href = urll;
                        a.download = gelen.headers["DOSYA_ADI"];
                        a.click();
                        window.URL.revokeObjectURL(urll);
                    }

                }, function (errorPI) {


                });
            }

            $scope.tinymceOptions = {

                language: 'tr_TR',
                theme: 'modern',
                plugins: 'print fullpage noneditable',

                noneditable_leave_contenteditable: true,
                menubar: "file",
                toolbar: false,

                removed_menuitems: 'newdocument',
                content_css: [
                    '../css/tinymce/fontgoogleapisLato300300i400400i.css',
                    '../css/tinymce/codeopen.css'
                ],
                height: '842',

                setup: function (editor) {

                    editor.on("init", function () {
                        $('.mce-edit-area').css({ "width": "21cm", "margin": "auto", "background-color": "gray" });
                    });
                    editor.on("focus", function () {
                        tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                    });
                }
            };
           

            $scope.DokumanIndirGetData = function (dokumanId) {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display:none";
                a.href = "api/Dokuman/DokumanYayinIndir?t=" + $rootScope.$storage.TOKEN.toString().split('=').join('_') + "&DOKUMAN_ID=" + dokumanId;
                a.click();
                window.URL.revokeObjectURL(urll);
            }
        }]);

