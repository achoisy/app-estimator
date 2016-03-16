Router.configure({
  layoutTemplate: 'mainLayout',
  //loadingTemplate: 'loading'
});

Router.route('/', function(){
  this.render('login');
});

Router.route('/question', function(){
  this.render('question');
});