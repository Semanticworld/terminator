var t = {};
t.home = localStorage.getItem('tr-home');
t.loadjs = function (url) {
    var script = document.createElement("SCRIPT");
    script.src = url;
    script.type = 'text/javascript';
    script.onload = function () {
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
                var ext = 'gif';
                var l = '<img data-face="' + a[1] + "-" + a[2] + a[3] + '" class="tr-smilex" src="' + t.home + 'smiles/s' + a[1] + '/' + a[2] + a[3] + '.' + ext + '">';
                h = t.repl(h, a.split("*").join("/*"), l);
            });
            $($m).html(h);
        }
    }
}
t.run = function () {
    $(document).ready(function () {
        $('div.chatMessage').each(function () {
            t.messages(this);
        })
        $(document).on('DOMNodeInserted', "div.chatMessage", function () {
            t.messages(this);
        });
        $('<a href="#" class="chatLinkSmiles"><span>смайлы</span></a>').insertBefore($(".chatLinkSmiles"));
    });
}