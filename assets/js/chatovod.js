var t = {};
t.home = localStorage.getItem('tr-home');
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
        var a = h.match(/\*...\*/g);
        if (a != null) {
            a.forEach(function (a) {
                var ext = 'gif';
                var l = '<img data-face="' + a[1] + "-" + a[2] + a[3] + '" class="tr-smilex" src="' + t.home + 'smiles/s' + a[1] + '/' + a[2] + a[3] + '.' + ext + '">';
                h = t.repl(h, a.split("*").join("/*"), l);
            });
            $($m).html(h);
        }
    }
}
t.wininit = function () {
    $('<div />').appendTo('body').attr('id', 'trwin');
    $('<div class="trbody"></div>').appendTo('#trwin');

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
                height: 200,
                width: 362,
                keepInViewport: true
            });
            $('<a href="#" class="tr-smiles"><span>Шмайлы</span></a>')
                .insertBefore($(".chatLinkSmiles"))
                .on('click', function (e) {
                    e.preventDefault()
                    $("#trwin").PopupWindow("open");
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
          //  $(".tr-smile").hover(function () {
                //  $( this ).fadeOut( 100 );
                //  $( this ).fadeIn( 500 );
          //      console.log($(this).attr('title'));
          //      $("#trwin").PopupWindow("statusbar", $(this).attr('title'));
          //  });
       //   $( ".tr-smile" ).bind( "mouseenter mouseleave", function() {
           // console.log(1);
         // });







           $('body').on('mouseenter mouseleave', 'img.tr-smile', function(e){
            e.preventDefault();
            $("#trwin").PopupWindow("statusbar", $(this).data("title"));
          });





        } else {
            setTimeout(wait, 100);
        }
    }
    setTimeout(wait, 100);
}

t.run = function () {
    t.loadjs("css", t.home + "templates/chatovod/aa");
    t.loadjs("css", t.home + "plugins/popup/popupwindow");
    t.loadjs("js", t.home + "plugins/popup/popupwindow", "wininit");
    $(document).ready(function () {
        $('div.chatMessage').each(function () {
            t.messages(this);
        })
        $(document).on('DOMNodeInserted', "div.chatMessage", function () {
            t.messages(this);
        });
        console.log("run45")
    });
}