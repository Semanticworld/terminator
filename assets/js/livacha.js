function Terminator(){
    this.version = "0.0.0.1";
}
Terminator.prototype.run = function() {
    console.log(this.version);
  };
  var Terminator = new Terminator();
  Terminator.run();