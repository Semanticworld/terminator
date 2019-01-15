$(document).ready(function () {
    function Terminator() {
        this.version = "0.0.0.2";
        this.home = "https://raw.githubusercontent.com/Semanticworld/terminator/beta/assets/";
    }
    Terminator.prototype.run = function () {
        console.log(this.version);
        var waitPanel = setInterval(function () {
            if ($("i.em-smiley").length) {
                clearInterval(waitPanel);
                Terminator.initSmailes();
            }
        }, 2000);
    };

    Terminator.prototype.initSmailes = function () {
        $("i.em-smiley").parent().parent().before('<div class="col text-left"><span id="tr-smbtn" class="toggler cursor-pointer smiles mr-3"><i class="em em-nerd_face"></i></span></div>');
        Terminator.load("css", this.home + "css/main.css?r=" + Math.random());
        Terminator.load("js", this.home + "js/functions.js?r=" + Math.random(), function () {
            Terminator.createSmilesBox();
        });

    }

    Terminator.prototype.load = function (type, url, cb) {
        var xhr = new XMLHttpRequest(),
            f = false;
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    switch (type) {
                        case "css":
                            head = document.head || document.getElementsByTagName('head')[0],
                                style = document.createElement('style');
                            style.type = 'text/css';
                            if (style.styleSheet) {
                                style.styleSheet.cssText = xhr.responseText;
                            } else {
                                style.appendChild(document.createTextNode(xhr.responseText));
                            }
                            head.appendChild(style);
                            break;
                        case "js":
                            f = document.createElement("script");
                            f.type = "text/javascript";
                            f.text = xhr.responseText;
                            document.body.appendChild(f);
                            break;
                    }
                    if (typeof cb === "function") {
                        cb();
                    }
                }
            }
        };
        xhr.send(null);
    }

    Terminator.prototype.playSound = function (url) {
        if ($("#traudio").length) {
            $("#traudio").remove();
        }
        if (!$("#traudio").length) {
            var sound = document.createElement('audio');
            sound.id = 'traudio';
            sound.controls = 'controls';
            sound.src = url;
            sound.type = 'audio/mpeg';
            sound.autobuffer = true;
            sound.controls = true;
            sound.style.position = 'fixed';
            sound.style.bottom = '30px';
            sound.addEventListener("play", function () {}, false);
            sound.addEventListener("ended", function () {
                sound.style.visibility = 'hidden';
            }, false);
            document.body.appendChild(sound);
            sound.play();
        }

    }


    Terminator.prototype.createSmilesBox = function () {
        $("#page").append($("<div/>").addClass("tr-window").prepend($("<div/>").addClass("tr-title").prepend('<span>Смайлы</span><span class="tr-close"></span>')));
        $($("<div/>").addClass("tr-tabs")).insertAfter($(".tr-title"));
        for (var i = 8; i >= 0; i--) {
            $(".tr-window .tr-tabs").prepend($("<div/>").addClass("tr-tab-content tr-sm" + i + "-block"));
        }
        $(".tr-sm0-block").addClass("active");
        $(".tr-tabs")
            .prepend('<ul class="tr-tab-caption"><li class="active"><img src="' + this.home + 'ico/0.png"></li><li><img src="' + this.home + 'ico/1.png"></li><li>2</li><li><img src="' + this.home + 'ico/3.png"></li><li><img src="' + this.home + 'ico/4.png"></li><li><img src="' + this.home + 'ico/5.png"></li><li><img src="' + this.home + 'ico/6.png"></li><li><img src="' + this.home + 'ico/7.png"></li><li><img src="' + this.home + 'ico/8.png"></li></ul>');
        $('.tr-window').tr_drags({
            handle: ".tr-title"
        });
        $(".tr-close").on("click", function (e) {
            e.preventDefault();
            localStorage.setItem('tr-win-y', $(".tr-window").offset().top);
            localStorage.setItem('tr-win-x', $(".tr-window").offset().left);
            $(".tr-window").css("visibility", "hidden");
        });

        $('ul.tr-tab-caption').on('click', 'li:not(.active)', function () {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tr-tabs').find('div.tr-tab-content').removeClass('active').eq($(this).index()).addClass('active');
        });
        var smilespack = [];
        smilespack["1"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
            "ea", "eb", "ec", "ed", "ef", "eg",
            "fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr", "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
            "ga", "gb", "gc", "gd", "ge", "gf", "gi", "gj", "gk", "gl", "gm", "gn",
            "ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj", "hk", "hl", "hm", "hn", "ho", "hp", "hq", "hr", "hs", "ht", "hu", "hv", "hw", "hx", "hy", "hz",
            "ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ii", "ij", "ik", "il", "im", "in", "io", "ip", "iq", "ir", "is", "iu", "iv", "iw", "ix", "iy", "iz",
            "ja", "jb", "jc", "jd", "je", "jf", "jg", "ji", "jj", "jk", "jl",
            "xa", "xb", "xc", "xd", "xe", "xf", "xg"
        ];
        smilespack["4"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr"
        ];
        smilespack["2"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "ar", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb"
        ];
        smilespack["3"] = [
            "aa", "ab", "ac", "ad", "ae",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "dg", "dh", "di", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
            "za"
        ];
        smilespack["5"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
            "ea", "eb", "ec", "ed", "ee", "ef", "eg", "eh", "ei", "ej", "ek", "el", "em", "en", "eo", "ep", "eq", "er", "es", "et", "eu", "ev", "ew", "ex", "ey", "ez",
            "fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr", "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
            "ga", "gb", "gc", "gd", "ge", "gf", "gg", "gh", "gi", "gj", "gk", "gl", "gm", "gn", "go", "gp", "gq", "gr", "gs", "gt", "gu", "gv", "gw", "gx", "gy", "gz",
            "ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj", "hk", "hl", "hm", "hn", "ho", "hp", "hq", "hr", "hs", "ht", "hu", "hv", "hw", "hx", "hy", "hz",
            "ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ii", "ij", "ik", "il", "im", "in", "io", "ip", "iq", "ir", "is", "it", "iu", "iv", "iw", "ix", "iy", "iz",
            "ja", "jb", "jc", "jd", "je", "jf", "jg"
        ];
        smilespack["6"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
            "ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ii", "ij", "ik", "il", "im", "in", "io", "ip", "iq", "ir", "is", "it", "iu", "iv", "iw", "ix", "iy", "iz",
            "fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr", "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
            "ga", "gb", "gc", "gd", "ge", "gf", "gg", "gh", "gi", "gj", "gk", "gl", "gm", "gn", "go", "gp", "gq", "gr", "gs", "gt", "gu", "gv", "gw", "gx", "gy", "gz",
            "ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj", "hk", "hl", "hm", "hn", "ho", "hp", "hq", "hr", "hs", "ht", "hu", "hv", "hw", "hx", "hy", "hz"
        ];
        smilespack["7"] = ["aa", "ab", "ac", "ca", "cb", "cc", "сd"];

        smilespack["8"] = {
            "ДМБ": "",
            "aa": "Видишь суслика? И я не вижу, а он есть!",
            "ab": "Может бахнем? Обязательно бахнем! Весь мир в труху! Но потом.",
            "ac": "Жизнь без армии это все равно что любовь в резеинке, движение есть а прогресса нет.",
            "Иван Васильевич меняет профессию": "",
            "ba": "Вот что крест животворящий делает",
            "bb": "Житие мое",
            "bc": "Демоны! Демоны!",
            "bd": "Ключница водку делала",
            "be": "Замуровали! Замуровали демоны!",
            "bf": "Ляпота",
            "bh": "Оставь меня старушка я в печали.",
            "bi": "Танцуют все!",
            "bj": "Царем будешь! Ни-за-что!!!",
            "bk": "Ты на что царская морда намекаешь.",
            "bl": "Ты по што боярыню обидел смерд ?",
            "bm": "Тьфу на вас! Тьфу на вас еще раз!",
            "bn": "Человек...Человек...Оффициант..Почки один раз царице...",
            "bo": "Я требую продолжения банкета!"
        };



        smilespack.forEach(function (a, b) {
            var s = '';
            if (b == "8") {
                for (var u in a) {
                    console.log(u);
                    if (u.length > 2) {
                        s += '<hr><center>' + u + '</center>';
                    } else {
                        s += '<img title="' + a[u] + '" src="' + Terminator.home + 'ico/ld.gif" class="tr-smile lazyload" data-face="' + b + u + '" data-src="' + Terminator.home + 'smiles/s8/aa.png">';
                    }
                }
            } else {
                var ext = 'gif';
                a.forEach(function (a) {
                    if (b == "6") {
                        ext = 'png';
                    }
                    s += '<img title="test" src="' + Terminator.home + 'ico/ld.gif" class="tr-smile lazyload" data-face="' + b + a + '" data-src="' + Terminator.home + 'smiles/' + 's' + b + '/' + a + '.' + ext + '">';
                });
            }
            $(".tr-sm" + b + "-block").append(s);
        });



        $(document).on("click", ".tr-smilex", function (e) {
            e.preventDefault();
            var sm = $(this).data("face");
            sm = sm.split("-").join("");
            $(".chat-layout-container .textarea-wrapper textarea").val($(".chat-layout-container .textarea-wrapper textarea").val() + ' *' + sm + '* ');
        });

        $(document).on("click", ".tr-smile", function (e) {
            e.preventDefault();
            var sm = $(this).data("face");
            var index = lovesmiles.indexOf(sm);
            if (index > -1) {
                lovesmiles.splice(index, 1);
            } else {
                var ext = 'gif';
                if (sm[0] == "6") {
                    ext = 'png';
                }
                console.log(sm[0]);
                if (sm[0] != "8") {
                    $(".tr-tab-content.tr-sm0-block")
                        .prepend('<img src="' + Terminator.home + 'smiles/' + 's' + sm[0] + '/' + sm[1] + sm[2] + '.' + ext + '" class="tr-smile" data-face="' + sm + '">');
                }
            }
            lovesmiles.push(sm);
            if (lovesmiles.length > 50) {
                lovesmiles.shift();
                $('.tr-tab-content.tr-sm0-block img').last().remove();
            };
            localStorage.setItem('tr-love-smiles', JSON.stringify(lovesmiles));
            $(".chat-layout-container .textarea-wrapper textarea").val($(".chat-layout-container .textarea-wrapper textarea").val() + ' *' + sm + '* ');
        });

        var lovesmiles = [];
        var t = localStorage.getItem("tr-love-smiles");
        if (undefined != t) {
            lovesmiles = JSON.parse(t);
        }
        var s = '';
        if (lovesmiles) {
            lovesmiles.reverse().forEach(function (a) {
                var ext = 'gif';
                if (a[0] == "6") {
                    ext = 'png';
                }
                s += '<img src="' + Terminator.home + 'ico/ld.gif" class="tr-smile lazyload" data-face="' + a + '" data-src="' + Terminator.home + 'smiles/' + 's' + a[0] + '/' + a[1] + a[2] + '.' + ext + '">';
            });
        }
        $(".tr-sm0-block").append(s);
        $("#tr-smbtn").on("click", function (e) {
            $(".tr-window").css("visibility", "visible");
            var x = (localStorage.getItem("tr-win-x") != undefined) ? localStorage.getItem("tr-win-x") : 300;
            var y = (localStorage.getItem("tr-win-y") != undefined) ? localStorage.getItem("tr-win-y") : 300;
            $(".tr-window").offset({
                top: y,
                left: x
            });
        });
        lazyload();
    }

    Terminator.prototype.chat = function () {
        function repl(str, f, r) {
            var regex = new RegExp(f, "g");
            var l = str.replace(regex, r);
            return l.split("*").join("");
        }


        $("div.app-chat").bind('DOMNodeInserted', "div.mess-row", function (e) {
            function showfx(name) {
                $(document).snowfall();
                $(document).snowfall('clear');
                switch (name) {
                    case "aa":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/aa.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "ab":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/ab.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "ac":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/ac.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "ca":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/ca.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "cb":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/cb.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "cc":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/cc.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "сd":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/сd.gif',
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

            var element = e.target;
            var $mms = $(element).find("div.chat-text-content");
            var t = $(element).find("div.chat-text-content").html();
            if (t != undefined) {
                var a = t.match(/\*...\*/g);
                if (a != null) {
                    a.forEach(function (a) {
                        var z = a.split("*").join("/*"),
                            ext = 'gif';
                        if (a[1] == "6") {
                            ext = 'png';
                        }
                        if (a[1] == "8") {
                            console.log("play:" + a);
                            var l = '<img data-face="8-' + a[2] + a[3] + '" class="tr-smilex" src="' + Terminator.home + 'smiles/s8/aa.png">';
                            Terminator.playSound(Terminator.home + 'sound/' + a[2] + a[3] + ".mp3");
                        } else {
                            var l = '<img data-face="' + a[1] + "-" + a[2] + a[3] + '" class="tr-smilex" src="' + Terminator.home + 'smiles/s' + a[1] + '/' + a[2] + a[3] + '.' + ext + '">';
                        }
                        t = repl(t, z, l);
                        if (a[1] == "7") {
                            showfx(a[2] + a[3]);
                        }
                    });
                    $($mms).html(t);
                }
            }

        });
    }
    var Terminator = new Terminator();
    Terminator.run();
    Terminator.chat();
});