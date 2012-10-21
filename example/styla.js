define({
  register: function(name, source){
    var node = document.createElement('style');
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(node);
    node.appendChild(document.createTextNode(source));
  }
});