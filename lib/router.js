Router.configure({
  loadingTemplate: 'loadingTemplate',
  layoutTemplate: 'mainLayout',
  //loadingTemplate: 'loading'
});

Router.route('/', function(){
  this.render('loginMe');
});

Router.route('/question', function(){
  this.render('question');
});

Router.route('/resultat', function(){
  this.render('resultat');
});