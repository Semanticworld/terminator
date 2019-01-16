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
            //    const playPromise = sound.play();
            //    if (playPromise !== null) {
            //        playPromise.catch(() => {
            //            sound.play();
            //        })
            // }
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
            "jl": "Я тебе сейчас лицо обглодаю!",
            "ka": "Лучшее - детям...",
            "kb": "Армия не просто...",
            "kc": "Будешь ты, Федя...",
            "kd": "В человеке всё...",
            "ke": "Видишь суслика?",
            "kf": "Я здесь, я там...",
            "kg": "Есть разные люди...",
            "kh": "Есть такое слово...",
            "ki": "Жизнь без армии...",
            "kj": "Мама, я не хочу...",
            "kk": "Но потом...",
            "kl": "Надо ему указательный...",
            "km": "Иначе всё у нас пойдёт...",
            "kn": "...военный - это не профессия.",
            "ko": "А к тёте Вере ходи...",
            "kp": "Повторим? Гавно вопрос!",
            "kq": "Дело в самом пришивании...",
            "kr": "Тётя, а «Наука и Жизнь»...",
            "ks": "Товарищ дембель, а когда...",
            "kt": "Надо понимать всю глубину...",
            "ku": "Тому, кто это придумал...",
            "kv": "Ты маму любишь?",
            "kw": "Ты, дух, правильный...",
            "kx": "Что будем кушать...",
            "ky": "Что, солдат, ссымся?!",
            "kz": "Это вам не это!",
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
            "bo": "Я требую продолжения банкета!",
            "Будильники": "",
            "ca": "Жириновский: Хватит спать пора вставать ты нужен стране! Подъем!",
            "cb": "Рота подъем! Форма одежды номер 2 и бегом на работу!",
            "Ульянов": "",
            "cd": "А вы батюшка на 600 мерседесе не в тот...",
            "Поцелуи": "",
            "ce": "Поцелуй",
            "cf": "Поцелуй мужчины",
            "cg": "Поцелуй",
            "Операция Ы": "",
            "da": "А где бабуля?",
            "db": "А компот?",
            "dc": "А... Влип очкарик?",
            "dd": "Ах ты зрячий!?",
            "de": "Бить будете?",
            "df": "...в то время, как наши...",
            "dg": "Всё уже украдено до нас",
            "dh": "Вы не скажете, где здесь...",
            "di": "Где этот чёртов инвалид?!",
            "dj": "Если я встану, ты у меня...",
            "dk": "Как пройти в библиотеку?",
            "dl": "Кто не работает, тот ест!",
            "dm": "Надо, Федя… Надо!",
            "dn": "Парижской!.. Бога матери…",
            "do": "Кто хочет сегодня поработать?",
            "dp": "Огласите весь список...",
            "dq": "А я готовлюсь стать отцом!..",
            "dr": "Операция Ы!",
            "ds": "...сейчас к людям надо помягше",
            "dt": "...у вас несчастные случаи...",
            "du": "Разбить. Пол-литра?",
            "dv": "Руки... мыли?!",
            "dw": "...в твоём доме будет играть..",
            "dx": "Стой!!! Убью, студент!",
            "dy": "Тренируйся лучше… на кошках!",
            "dz": "Это же не наш метод!",
            "ea": "Это не серьезно!",
            "Собачье сердце": "",
            "eb": "Бить будете папаша..",
            "ec": "Вчера котов душили-душили...",
            "ed": "Я ещё водочки выпью?",
            "ee": "Не читайте до обеда...",
            "ef": "Господа все в Париже",
            "eg": "Где же я буду харчеваться?",
            "eh": "Мы к вам, профессор...",
            "ei": "Да не согласен я.",
            "ej": "Неприличными словами...",
            "ek": "В очередь, сукины дети!",
            "el": "Земля налетит на небесную ось.",
            "em": "Отлезь, гнида...",
            "en": "Дай папиросочку...",
            "eo": "Пивная! Ещё парочку!..",
            "ep": "Взять всё, да и поделить!",
            "eq": "Вы его напрасно прелестным...",
            "er": "Я тяжко раненый при операции",
            "es": "Следовательно, разруха...",
            "et": "Чисто как в трамвае",
            "eu": "Я тебе покажу твою мать!",
            "ev": "Что-то Вы меня больно...",
            "ew": "Я... водочки выпью?..",
            "ex": "Желаю, чтобы все!..",
            "ey": "Абрвал...",
            "Особенности национальной охоты": "",
            "ez": "Пьёте, да? И пьёте...",
            "ga": "Рашн элефант из...",
            "gb": "Семёнов - водку пить будешь?",
            "gc": "Та-ак!.. Кто это сделал?!",
            "gd": "Теперь ты можешь впадать...",
            "ge": "Тост на охоте должен быть...",
            "gf": "Цыц! Вы ещё подеритесь...",
            "gg": "Что это было?",
            "fa": "А ну колись где Серега...?",
            "fb": "Водку берет",
            "fc": "Вот что мне нравится в тебе...",
            "fd": "Вы арестованы!",
            "fe": "Где эта сволочь?",
            "ff": "Да... Жить захочешь...",
            "fg": "Ё-моё! А я за что...",
            "fh": "Завтра ж на охоту...",
            "fi": "... и тогда или вот это...",
            "fj": "Какая сволочь стреляла?!",
            "fk": "Ну, все что знал, рассказал",
            "fl": "Ну - за братство!",
            "fm": "Ну - за встречу!",
            "fn": "Ну - за дружбу!",
            "fo": "Ну - за искусство...",
            "fp": "Ну - за красоту!",
            "fq": "Ну - за рыбалку!",
            "fr": "Ну - за справедливость!",
            "fs": "Ну - теперь вся утка наша...",
            "ft": "Ну Вы блин даете...",
            "fu": "Ну и сколько можно ждать..",
            "fv": "Он его выжрал, гад!",
            "fw": "Оставь его - пусть отдыхает!..",
            "fx": "Пгостите - мне пгаво не удобно беспокоить Вас...",
            "fy": "Повторяю: если машины нет...",
            "fz": "Погоди, погоди... Потеряна...",
            "Бриллиантовая рука": "",
            "gh": "А у нас управдом друг человека!",
            "gi": "Куй железо не отходя от кассы",
            "gj": "Легким движением руки...",
            "gk": "Семен Семенович...",
            "gl": "Усигда готов!",
            "gm": "Чёрт побери... Чёрт побери...",
            "gn": "Шоб ты издох! Шоб я видел тебя...",
            "Кавказская пленница": "",
            "gq": "У меня будет к вам небольшое..",
            "gs": "Это... как его... волюнтаризм!",
            "gt": "Это студентка, комсомолка...",
            "gu": "Эээ-нее... Торопиться не надо.",
            "gr": "Чей туфля?... А! Моё!",
            "ha": "...а тост без вина...",
            "hb": "Аполитично рассуждаешь...",
            "hc": "Бамбарбия! Кергуду!",
            "hd": "Будь проклят тот день...",
            "he": "Ви не оправдали...",
            "hf": "Вы же просили в 3х экземплярах?",
            "hg": "Да здравствует наш суд...",
            "hh": "Да отсохнет его карбюратор...",
            "hi": "...плохо мы ещё воспитываем...",
            "hj": "Жить, как говорится, хорошо!",
            "hk": "Это бесплатная путевка.. в Сибирь..",
            "hl": "...и вот когда вся стая...",
            "hm": "Простите... часовню... тоже я",
            "hn": "Имею желание купить дом...",
            "ho": "...иначе - memento more!",
            "hp": "Короче..Склифасофский...",
            "hq": "Мой машина зверь..Слушай..",
            "hr": "Будьте добры, помедленнее!..",
            "hs": "Мне теперь из этого дома...",
            "ht": "Алкоголики - это наш профиль",
            "hu": "А я пью? Что тут пить?!",
            "hv": "Нэ беспокойся. В морге тебя...",
            "hw": "Будем ждать... Сдавай.",
            "hx": "Прекратим эту бесполезную...",
            "hy": "Птичку... жалко...",
            "hz": "Так выпьем же за кибернетикэ!",
            "Крылья, ноги и хвосты": "",
            "gv": "Ноги, крылья... Главное - хвост!!!",
            "gw": "Эй, ты, птичка, летим со мной...",
            "gx": "Крылья, крылья... Ноги!",
            "gy": "Эй, я же сказал полетели...",
            "gz": "Лучше день потерять...",
            "Джентльмены удачи": "",
            "ia": "А в тюрьме щас ужин...",
            "ib": "А ну, канай отсюда!",
            "ic": "Как что, так сразу Косой...",
            "id": "Ты - вор! Джентельмен удачи...",
            "ie": "Вот у меня один знакомый...",
            "if": "Всё. Кина не будет...",
            "ig": "Прямо насмерть?..",
            "ih": "Девушка, а девушка...",
            "ii": "Деточка! А вам не кажется...",
            "ij": "Такой хороший женщин...",
            "ik": "Женский туфли хочу...",
            "il": "Нет, это не мы!",
            "im": "Йес, йес, ОБХСС!",
            "in": "Какая отвратительная рожа!",
            "io": "Канай отсюда! Рога поотшибаю..",
            "ip": "Иди, иди, Вась...",
            "iq": "Садитесь жрать, пожалуйста!",
            "ir": "Лошадью ходи.",
            "is": "Моргалы выколю!",
            "it": "Нехороший ты человек, Косой.",
            "iu": "Ну вы будете жрать или нет?!",
            "iv": "Кто ж его посадит?! Он же...",
            "iw": "Явился. Нехороший человек...",
            "ix": "Давай червонец, пожалуйста...",
            "iy": "Сдаёмсу!..",
            "iz": "Слушай, Доцент. Ты был...",
            "ja": "Слушай, Доцент... Я говорил...",
            "jb": "Слушайте... Заткнитесь...",
            "jc": "Тут помню, тут... ничего...",
            "jd": "У тебя какой срок был?",
            "je": "Филонишь, гад!",
            "jf": "Чем больше сдадим - тем...",
            "jg": "Что это у тебя? Надо!",
            "jh": "Шакал я паршивый...",
            "ji": "Эй, гражданина!",
            "jj": "Это тебе не мелочь...",
            "jk": "Этот Василий Алибабаевич...",
            "Покровские ворота": "",
            "la": "Аркадий, алес гемахт!",
            "lb": "Полный алес капут!..",
            "lc": "Данке шон, Маргарита Павловна!",
            "ld": "От тебя один дискомфорт!",
            "le": "Я как утром встал, сразу за дрель!..",
            "lf": "Ну кой чёрт занёс Вас на эти галеры?!",
            "lg": "Да - искусство в большом долгу...",
            "lh": "Это мой крест!!! И нести его мне!..",
            "li": "Кулинар!",
            "lj": "Тогда - в кусты!",
            "lk": "Хоботов, это мелко!..",
            "ll": "Я служу Мосэстраде!",
            "lm": "Натюрлих, Маргарита Павловна!",
            "ln": "Хоботов, я всё оценила!",
            "lo": "...Ваша сложность идет Вам как Соеву пенсне...",
            "lp": "Заметьте, не я это предложил...",
            "lq": "Я вся такая несуразная...",
            "lr": "Я вся такая внезапная, такая..",
            "ls": "Резать к чёртовой матери...",
            "lt": "В прах разметал домашний очаг!..",
            "lu": "Одно дело шпицштихель...",
            "lv": "Но как вы спелись!..",
            "lw": "Кого Вы разбили под Аустерлицем?!",
            "lx": "...однажды Ваш Костик Вас удивит!",
            "ly": "Хоботов, это упадничество!",
            "lz": "Догнать Савранского - это утопия!",
            "ma": "Это кричит твой вакуум!..",
            "mb": "Вы её!.. Вожделели!!!",
            "mc": "Высокие... выс-сокие отношения!..",
            "md": "У больных большая взаимовыручка...",
            "me": "Яволь, Маргарита Павловна!",
            "mf": "Зер гут, Маргарита Павловна!",
            "Кин-Дза-Дза": "",
            "mg": "Когда у общества нет...",
            "mh": "Ну и зараза же ты, родной...",
            "mi": "Дикари!",
            "mj": "Подсаки.. Почему не в намордниках?",
            "mk": "Скрипач не нужен...",
            "ml": "У тебя в голове мозги или тю...",
            "mm": "Уэф, ты когда-нибудь...",
            "mn": "Что они хотят?",
            "mo": "Астронавты...",
            "mp": "Вот потому...",
            "mq": "Как же это вы без гравицаппы..",
            "mr": "КУ",
            "ms": "Люсенька...",
            "mt": "Небо не видело...",
            "Винни-пух": "",
            "na": "А не пойти ли нам в гости...",
            "nb": "А не пора ли нам подкрепиться?",
            "nc": "А что подумал кролик...",
            "nd": "Входит! И выходит...",
            "ne": "а если ты не выстрелишь, тогда испорчусь я...",
            "nf": "Если я чешу в затылке...",
            "ng": "И где интересно знать... Мой воздушный шарик",
            "nh": "Кажется дождь собирается..",
            "ni": "Кто ходит в гости по утрам...",
            "nj": "Куда идем мы с пятачком...",
            "nk": "Мед это уж очень хитрый предмет...",
            "nl": "Поздравляю с днем рождения..",
            "nm": "Сова.. Открывай! Медведь пришел!",
            "nn": "а кролик это подходящая компания!",
            "no": "Хорошо живет на свете Вини пух...",
            "np": "Я тучка.. Тучка..Тучка..",
            "nq": "потому что кто то слишком много ест!",
            "nr": "... не правильные пчёлы...",
            "Малыш и Карлсон": "",
            "oa": "А мы тут, знаете...",
            "ob": "А я сошла с ума...",
            "oc": "Ведь я - умный, красивый...",
            "od": "Ку-ку мой мальчик!",
            "oe": "Надеюсь, Фрекен Бок...",
            "of": "Не надо... Я вас боюсь.",
            "og": "Ну я так не играю...",
            "oh": "Ну, мама-мама...",
            "oi": "Опять розыгрыш. Шалунишка!..",
            "oj": "Отдай клюшку!",
            "ok": "По телевизору показывают...",
            "ol": "Простите, у вас можно...",
            "om": "Скажи мне, милый ребёнок...",
            "on": "Спокойствие! Только...",
            "oo": "Что ты орешь?",
            "op": "Я мужчина хоть куда!",
            "Следствие ведут колобки": "",
            "oq": "и дайте мне большой справка...",
            "or": "Ничё не понимаю!",
            "os": "Ой, шеф! А я вас вижу!",
            "ot": "Или что-то случилось...",
            "ou": "Ой, шеф! А я вас не вижу!",
            "ov": "Ой, шеф! А я вас слышу!",
            "ow": "при звуках флейты... теряет...",
            "ox": "Покупайте наших слонов!",
            "oy": "Слон полосатый, большой...",
            "Падал прошлогодний снег": "",
            "oz": "Уж послала, так послала...",
            "pa": "Вот это мой размерчик",
            "pb": "...на что мне эта худая жена?!",
            "pc": "Знатный зверюга!",
            "pd": "Кто тут, к примеру, в цари ...",
            "pe": "Маловата, понимаешь...",
            "pf": "Маловато будет!!!",
            "pg": "Мы, бояре, народ работящий!",
            "ph": "Ничего не понимаю!..",
            "pi": "..как я очень это богатство...",
            "pj": "Ой, какой хороший половичок!",
            "pk": "Ох уж эти сказочки!",
            "pl": "Я волшебное слово знаю..."

        };



        smilespack.forEach(function (a, b) {
            var s = '';
            if (b == "8") {
                for (var u in a) {
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