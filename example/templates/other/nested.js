define(["handlebars","styla","example/other/partial"], function(Handlebars, Styla) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['example.templates.other.nested'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "Hello nested ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "!\n\n";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['example.other.partial'], 'example.other.partial', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;});
  
  
  return templates['example.templates.other.nested'];
});