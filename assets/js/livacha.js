function Terminator() {
    this.version = "0.0.0.1";
    this.home = "https://raw.githubusercontent.com/Semanticworld/terminator/master/assets/";
}
Terminator.prototype.run = function () {
    console.log(this.version);
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
$( document ).ready(function() {
    var Terminator = new Terminator();
    Terminator.run();
});


