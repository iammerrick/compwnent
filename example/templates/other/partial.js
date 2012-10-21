define(["handlebars","styla"], function(Handlebars, Styla) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['example.templates.other.partial'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "";


  return buffer;});
  Handlebars.registerPartial('example.templates.other.partial', templates['example.templates.other.partial']);
  
  return templates['example.templates.other.partial'];
});