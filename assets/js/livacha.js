$(document).ready(function () {
    function Terminator() {
        this.version = "0.0.0.2";
        this.home = "https://raw.githubusercontent.com/Semanticworld/terminator/master/assets/";
    }
    Terminator.prototype.run = function () {
        console.log(this.version);
        this.loadcss(this.home + "plugins/jquery-ui/jquery-ui.css");
        this.loadcss(this.home + "plugins/jquery-ui/jquery-ui.theme.min.css");
        this.loadjs(this.home + "plugins/jquery-ui/jquery-ui.min.js");



        var waitPanel = setInterval(function () {
            console.log("wait");
            if ($("i.em-smiley").length) {
                clearInterval(waitPanel);
                Terminator.initSmailes();
            }
        }, 2000);


    };

    Terminator.prototype.initSmailes = function () {
        var m = "<div id='ter-smiles' class='ui-widget-content'>" +
            "<div id='accordion'>" +
            "<h3>Section 1</h3>" +
            "<div><p>Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.</p></div>" +
            "<h3>Section 2</h3>" +
            "<div><p>Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit, faucibus interdum tellus libero ac justo. Vivamus non quam. In suscipit faucibus urna. </p></div>" +
            "<h3>Section 3</h3>" +
            "<div><p>Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis. Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac libero ac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui. </p><ul><li>List item one</li>    <li>List item two</li>      <li>List item three</li>    </ul>  </div>" +
            "<h3>Section 4</h3>" +
            "<div><p>Cras dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean lacinia mauris vel est. </p><p>Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p></div>" +
            "</div>" +
            "</div>";


        var d = '<div id="dialog" title="Basic dialog"><p>This is an animated dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p></div>';



        $("i.em-smiley")
            .parent()
            .parent()
            .before('<div class="col text-left"><span id="tr-sm" class="toggler cursor-pointer smiles mr-3"><i class="em em-nerd_face"></i></span></div>');
            $("body").appendChild(d);


        
            $( "#dialog" ).dialog({
              autoOpen: true,
              show: {
                effect: "blind",
                duration: 500
              },
              hide: {
                effect: "explode",
                duration: 500
              }
            });
         
            $( "#tr-sm" ).on( "click", function() {
              $( "#dialog" ).dialog( "open" );
              console.log("1");
            });
        



        $("#accordion").accordion({
            heightStyle: "fill"
        });

        $("#ter-smiles").resizable({
            minHeight: 140,
            minWidth: 200,
            resize: function () {
                $("#accordion").accordion("refresh");
            }
        });

        


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