define(["handlebars","styla"], function(Handlebars, Styla) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['example.templates.merrick'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>Hello ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "!</h1>";
  return buffer;});
  
  Styla.register('example/templates/merrick', '/* File: example/stylesheets/merrick.css */ h1 {   color: #afeaff; }');
  return templates['example.templates.merrick'];
});