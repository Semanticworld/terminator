var t = {};
t.play = false;
t.home = localStorage.getItem('tr-home');
t.version = localStorage.getItem('tr-ver');
t.loadjs = function (type, url, fn = false) {
    switch (type) {
        case "css":
            var s = document.createElement("link");
            s.rel = 'stylesheet';
            s.href = url + ".css";
            s.type = 'text/css';
            s.media = 'all';
            s.onload = function () {
                if (fn) t[fn]();
            };
            break;
        case "js":
            var s = document.createElement("SCRIPT");
            s.src = url + ".js";
            s.type = 'text/javascript';
            s.onload = function () {
                if (fn) t[fn]();
            };
            break;
    }
    document.getElementsByTagName("head")[0].appendChild(s);
}
t.loadjs("js", "https://code.jquery.com/jquery-3.3.1.min", "run");
t.repl = function (str, f, r) {
    var regex = new RegExp(f, "g");
    var l = str.replace(regex, r);
    return l.split("*").join("");
}
t.messages = function (o) {
    var $m = $(o);
    var h = $(o).html();
    if (h != undefined) {
        if (h.includes("VID:[")) {
            var b = h.match(/[^[\]]+(?=])/g);
            if (b != null) {
                var link = atob(b);
                var vid = link.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
                if (vid != null) {
                    if (typeof (jQuery().PopupWindow) == "function") {
                        $(t.player).PopupWindow("open");
                        if (!t.play) {
                            $('<iframe>', {
                                'id': 'trfrplay',
                                'frameborder': '0',
                                'scrolling': 'no',
                                'marginheight': '0',
                                'marginwidth': '0',
                                'width': '362',
                                'height': '280',
                                'type': 'text/html',
                                'style': 'display: block;width:100%;height:100%;',
                                'src': 'https://www.youtube.com/embed/' + vid[1] + '?autoplay=1',
                                'allow': 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                            }).appendTo("#trplayer");
                            t.play = true;
                        } else {
                            $('#trfrplay').src = 'https://www.youtube.com/embed/' + vid[1] + '?autoplay=1';
                        }
                    }
                }
            }
        }




        var a = h.match(/\*...\*/g);
        if (a != null) {
            a.forEach(function (a) {
                var ext = 'gif';
                if (a[1] == "6") {
                    ext = 'png';
                }
                if (a[1] == "8") {
                    var l = '<img data-face="8-' + a[2] + a[3] + '" class="tr-smilex" src="' + t.home + 'smiles/s8/aa.png">';
                    if ((localStorage.getItem('tr-sound') == "1") ? "1" : "0" == "1") {
                        t.playSound(a[2] + a[3]);
                    }
                } else {
                    var l = '<img data-face="' + a[1] + "-" + a[2] + a[3] + '" class="tr-smilex" src="' + t.home + 'smiles/s' + a[1] + '/' + a[2] + a[3] + '.' + ext + '">';
                }
                if (a[1] == "7") {
                    t.showfx(a[2] + a[3]);
                }
                h = t.repl(h, a.split("*").join("/*"), l);
            });
            $($m).html(h);
        }
    }
}

t.playSound = function (url) {
    if ($("#traudio").length) {
        $("#traudio").remove();
    }
    if (!$("#traudio").length) {
        var sound = document.createElement('audio');
        sound.id = 'traudio';
        sound.controls = 'controls';
        sound.src = t.home + 'sound/' + url + '.mp3';
        sound.type = 'audio/mpeg';
        sound.autobuffer = true;
        sound.controls = true;
        sound.style.position = 'fixed';
        sound.style.top = '1px';
        sound.style.zIndex = "999999";
        sound.addEventListener("play", function () {}, false);
        sound.addEventListener("ended", function () {
            sound.style.visibility = 'hidden';
        }, false);
        document.body.appendChild(sound);
        //sound.play();
        const playPromise = sound.play();
        if (playPromise !== null) {
            playPromise.catch(() => {
                //    sound.play();
            })
        }
    }

}

t.showfx = function (name) {
    if (typeof $(document).snowfall != "function" || ((localStorage.getItem('tr-snow') == "1") ? "1" : "0") == "0") {
        return false;
    }
    $(document).snowfall();
    $(document).snowfall('clear');
    switch (name) {
        case "aa":
            $(document).snowfall({
                image: t.home + 'smiles/s7/aa.gif',
                minSize: 10,
                maxSize: 32
            });
            break;
        case "ab":
            $(document).snowfall({
                image: t.home + 'smiles/s7/ab.gif',
                minSize: 10,
                maxSize: 32
            });
            break;
        case "ac":
            $(document).snowfall({
                image: t.home + 'smiles/s7/ac.gif',
                minSize: 10,
                maxSize: 32
            });
            break;
        case "ca":
            $(document).snowfall({
                image: t.home + 'smiles/s7/ca.gif',
                minSize: 10,
                maxSize: 32
            });
            break;
        case "cb":
            $(document).snowfall({
                image: t.home + 'smiles/s7/cb.gif',
                minSize: 10,
                maxSize: 32
            });
            break;
        case "cc":
            $(document).snowfall({
                image: t.home + 'smiles/s7/cc.gif',
                minSize: 10,
                maxSize: 32
            });
            break;
        case "сd":
            $(document).snowfall({
                image: t.home + 'smiles/s7/сd.gif',
                minSize: 10,
                maxSize: 20,
                flakeCount: 150
            });
            break;
    }
    setTimeout(function () {
        $(document).snowfall('clear')
    }, 20000);
}

t.createInput = function (cmd, id, title) {
    var f1 = (localStorage.getItem('tr-' + cmd) == "1") ? "1" : "0";
    var s = '<div class="tr-pt10">';
    s += '<input value="' + f1 + '" data-cmd="' + cmd + '" type="checkbox" class="ios8-switch tr-config" id="tr-' + id + '"' + (f1 == "1" ? " checked" : "") + '>';
    s += '<label for="tr-' + id + '">' + title + '</label>';
    s += '</div>';
    return s;
}

t.wininit = function () {
    $('<div />').appendTo('body').attr('id', 'trwin');
    $('<div class="trbody"></div>').appendTo('#trwin');

    $('<div />')
        .appendTo('body')
        .attr('id', 'trplayer')
        .css({
            'height': '95%'
        });
    $('<div class="trframe"></div>').appendTo('#trplayer');

    $('<div />').appendTo('body').attr('id', 'trwinmedia');
    $('<div id="trmediabody"></div>')
        .append('<div>Видео ссылка:</div><div><input id="evlink" class ="tr-w100" type="text" autocomplete="off" maxlength="1000"></div><div><button data-btn="vlink" class="sendbtn tr-pull-right" type="button">Отправить</button></div>')
        .appendTo('#trwinmedia');

    $(document).on('click', '.sendbtn', function () {
        switch ($(this).data("btn")) {
            case "vlink":
                $("input.chatSendText").val("VID:[" + btoa($("#evlink").val()) + "]");
                $("input.chatSendButton").click();
                break;
        }
    });

    function wait() {
        if (typeof (jQuery().PopupWindow) == "function") {
            $("#trwin").PopupWindow({
                statusBar: true,
                autoOpen: false,
                modal: false,
                buttons: {
                    close: true,
                    maximize: false,
                    collapse: true,
                    minimize: true
                },
                buttonsTexts: {
                    close: "Закрыть",
                    unmaximize: "Восстановить",
                    minimize: "Минимизировать",
                    unminimize: "Показать",
                    collapse: "Скрыть",
                    uncollapse: "Раскрыть"
                },
                title: "Терминатор",
                height: 280,
                width: 362,
                keepInViewport: true
            });
            $("#trwinmedia").PopupWindow({
                statusBar: false,
                autoOpen: false,
                modal: false,
                buttons: {
                    close: true,
                    maximize: false,
                    collapse: true,
                    minimize: true
                },
                buttonsTexts: {
                    close: "Закрыть",
                    unmaximize: "Восстановить",
                    minimize: "Минимизировать",
                    unminimize: "Показать",
                    collapse: "Скрыть",
                    uncollapse: "Раскрыть"
                },
                title: "Вставка медиа контента",
                height: 280,
                width: 362,
                keepInViewport: true
            });
            t.player = $("#trplayer");
            $(t.player).PopupWindow({
                statusBar: false,
                autoOpen: false,
                modal: false,
                buttons: {
                    close: true,
                    maximize: false,
                    collapse: true,
                    minimize: true
                },
                buttonsTexts: {
                    close: "Закрыть",
                    unmaximize: "Восстановить",
                    minimize: "Минимизировать",
                    unminimize: "Показать",
                    collapse: "Скрыть",
                    uncollapse: "Раскрыть"
                },
                title: "Видеоплеер",
                height: 280,
                width: 362,
                keepInViewport: true
            });


            $('<a href="#" class="tr-smiles"><span>Шмайлы</span></a>')
                .insertBefore($(".chatLinkSmiles"))
                .on('click', function (e) {
                    e.preventDefault()
                    $("#trwin").PopupWindow("open");
                    lazyload();
                });

            $('<a href="#" class="tr-media chatLinkImage"><span>Медиа</span></a>')
                .insertBefore($(".chatLinkSmiles"))
                .on('click', function (e) {
                    e.preventDefault()
                    $("#trwinmedia").PopupWindow("open");
                    lazyload();
                });

            var i = 0,
                h1 = h2 = '';
            while (i < 10) {
                h1 += '<input class="trmu" id="trt' + i + '" type="radio" name="tabs"' + (i == 0 ? " checked" : "") + '><label class="trlab" for="trt' + i + '"><img src="' + t.home + 'ico/' + i + '.png"></img></label>';
                h2 += '<div class="trsec" id="trc' + i + '"></div>';
                i++;
            }
            $('<div class="trcon">' + h1 + h2 + '</div>').appendTo('.trbody');
            t.loadjs("js", t.home + "js/smpack");

            $('body').on('mouseenter', 'img.tr-smile', function (e) {
                $("#trwin").PopupWindow("statusbar", $(this).data("title"));
            });
            $('body').on('mouseleave', 'img.tr-smile', function (e) {
                $("#trwin").PopupWindow("statusbar", '');
            });

            s = t.createInput('snow', 'ch1', 'Падающие эффекты');
            s += t.createInput('sound', 'ch2', 'Звуковые эффекты');
            s += t.createInput('anticaps', 'ch3', 'Антикапс');
            s += t.createInput('antimat', 'ch4', 'Антимат');
            // s += t.createInput('template', 'ch5', 'Стиль страницы');
            // s += '<div class="tr-pt10"><select id="tr-t-select" data-cmd="template-name" class="form-control tr-select"><option value="aa">Стиль 1</option><option value="ab">Стиль 2</option><option value="ac">Стиль 3</option></select></div>';
            s += '<div class="tr-pt10 tr-pr">Ver:' + t.version + '</div>';
            $("#trc9").append(s);
        } else {
            setTimeout(wait, 100);
        }
    }
    setTimeout(wait, 100);
}

t.run = function () {
    t.loadjs("css", t.home + "templates/chatovod/aa");
    t.loadjs("css", t.home + "plugins/popup/popupwindow");
    t.loadjs("js", t.home + "plugins/lazy/lazy");
    t.loadjs("js", t.home + "plugins/fx/fx");
    t.loadjs("js", t.home + "plugins/popup/popupwindow", "wininit");
    $(document).ready(function () {
        $('div.chatMessage').each(function () {
            t.messages(this);
        })
        $(document).on('DOMNodeInserted', "div.chatMessage", function () {
            t.messages(this);
        });


        $('body').on('click', 'img.tr-smile', function (e) {
            e.preventDefault();
            var sm = $(this).data("face");
            $("input.chatSendText").val($("input.chatSendText").val() + '*' + sm + '* ');
        });
        $('body').on('click', '.tr-smilex', function (e) {
            e.preventDefault();
            var sm = $(this).data("face");
            sm = sm.split("-").join("");
            $("input.chatSendText").val($("input.chatSendText").val() + '*' + sm + '* ');
            if (sm[0] == "8") {
                t.playSound(sm[1] + sm[2]);
            }
        });
        $('body').on("click", ".tr-config", function (e) {
            var s = ($(this).val() == "1") ? "0" : "1";
            localStorage.setItem('tr-' + $(this).data("cmd"), s);
            $(this).val((localStorage.getItem('tr-' + $(this).data("cmd")) == "1") ? "1" : "0");
            return true;
        });
    });
}