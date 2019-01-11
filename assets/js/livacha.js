$(document).ready(function () {
    function Terminator() {
        this.version = "0.0.0.2";
        this.home = "https://raw.githubusercontent.com/Semanticworld/terminator/master/assets/";
    }
    Terminator.prototype.run = function () {
        console.log(this.version);
        var waitPanel = setInterval(function() {
            console.log("wait");
            if ($("i.em-smiley").length){
                clearInterval(waitPanel);
                Terminator.initSmailes();
            }
          }, 2000);

        
    };

    Terminator.prototype.initSmailes = function () {
var m='<div class="row"><div class="col-6 col-sm-3">.col-6 .col-sm-3</div>';
        $("i.em-smiley").parent().parent().before('<div class="col text-left"><span data-trigger="click" data-container="body" data-toggle="popover" data-placement="left" data-content="'+m+'" class="toggler cursor-pointer smiles mr-3"><i class="em em-nerd_face"></i></span></div>');

        $('[data-toggle="popover"]').popover();
    }
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