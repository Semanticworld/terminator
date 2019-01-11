$(document).ready(function () {
    function Terminator() {
        this.version = "0.0.0.1";
        this.home = "https://raw.githubusercontent.com/Semanticworld/terminator/master/assets/";
    }
    Terminator.prototype.run = function () {
        console.log(this.version);
        this.loadcss(this.home + "plugins/semantic/semantic.min.css");
        this.loadjs(this.home + "plugins/semantic/semantic.min.js");
    };
    Terminator.prototype.loadjs = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.text = xhr.responseText;
                    document.body.appendChild(script);
                }
            }
        };
        xhr.send(null);
    }
    Terminator.prototype.loadcss = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    var style = document.createElement("style");
                    style.type = 'text/css';
                    style.text = xhr.responseText;
                    //  document.body.appendChild(script);
                    document.getElementsByTagName('head')[0].appendChild(style);
                }
            }
        };
        xhr.send(null);
    }
    var Terminator = new Terminator();
    Terminator.run();
});