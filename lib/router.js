Router.configure({
  loadingTemplate: 'loadingTemplate',
  layoutTemplate: 'mainLayout',
	
  waitOn: function() {
    var user = Meteor.user()
    if (!user || !user.profile)
      return false
    if (user.profile.guest)
      return Meteor.subscribe('chatBubbles', Meteor.userId())
  },
  onAfterAction: function() {
    var admin = Roles.userIsInRole(Meteor.userId(), 'admin')
    if (!Meteor.user() || admin)
      return false

    // Create new chat
    if (!ChatBubblesCollection.findOne({
        authorId: Meteor.userId(),
        archived: {
          $in: [null, false]
        }
      })) {
      var user = Meteor.user()
      if (!user || !user.profile)
        return false
      var guest = user.profile.guest
      if (!admin && guest) {
        ChatBubblesCollection.insert({
          authorId: Meteor.userId(),
          messages: [],
          createdAt: new Date()
        })
      }
    }
  },
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

Router.route('/admin', function(){
	this.layout('adminLayout');
  this.render('admin');
});

Router.route('/chatBubbles', {
	subscriptions: function() {
		return [Meteor.subscribe('chatBubbles', Meteor.userId()),
			Meteor.subscribe('users')]
	},
	action: function() {
		this.layout('adminLayout');
		if (this.ready()) {
			this.render('chatBubbles');
		} else {
			this.render('Loading');
		}
	}
})