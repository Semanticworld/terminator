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
    $("#trwin").PopupWindow({
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
        width: 400,
        keepInViewport: true
    });
    console.log("++")
}

t.run = function () {
    t.loadjs("css", t.home + "plugins/popup/popupwindow");
    $('<div />').appendTo('body').attr('id', 'trwin');
    $('<div class="trbody">Проверка</div>').appendTo('#trwin');
    t.loadjs("js", t.home + "plugins/popup/popupwindow", "wininit");
    $(document).ready(function () {
        $('div.chatMessage').each(function () {
            t.messages(this);
        })
        $(document).on('DOMNodeInserted', "div.chatMessage", function () {
            t.messages(this);
        });
        $('<a href="#" class="tr-smiles"><span>смайлы</span></a>')
            .insertBefore($(".chatLinkSmiles"))
            .on('click', function () {
                $("#trwin").PopupWindow("open");
            });
        console.log("run21")
    });
}