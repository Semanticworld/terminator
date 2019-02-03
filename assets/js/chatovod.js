var t = {};
t.loadjs = function (url) {
    t.home = 'https://semanticworld.github.io/terminator/assets/';
    var script = document.createElement("SCRIPT");
    script.src = url;
    script.type = 'text/javascript';
    script.onload = function () {
        var $ = window.jQuery;
        t.run();
    };
    document.getElementsByTagName("head")[0].appendChild(script);
}
t.loadjs("https://code.jquery.com/jquery-3.3.1.min.js");

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
                var z = a.split("*").join("/*");
                var ext = 'gif';
                var l = '<img data-face="' + a[1] + "-" + a[2] + a[3] + '" class="tr-smilex" src="' + t.home + 'smiles/s' + a[1] + '/' + a[2] + a[3] + '.' + ext + '">';
                h = t.repl(h, z, l);
            });
            $($m).html(h);
        }
    }
}

t.start = function () {
    $(document).ready(function () {
        $('div.chatMessage').each(function (i, ele) {
            console.log(i + ': ' + $(ele).html());
            // 0: <div id="outer"><div id="inner"></div></div>
            // 1: <div id="inner"></div>
        })

    });
}

t.run = function () {
    t.start();
    $(document).ready(function () {
        $(document).on('DOMNodeInserted', "div.chatMessages", function (e) {
            console.log(this);
        });
        $(document).on('DOMNodeInserted', "div.chatMessage", function (e) {
            t.messages(this);
        });
    });
}