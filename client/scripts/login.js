Template.loginMe.viewmodel({
  pseudo:'',
  startNow: function() {
    
    //Ajoute le pseudo de l'utilisateur
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.pseudo": this.pseudo()}});
    
    Router.go('/question');
  },
});