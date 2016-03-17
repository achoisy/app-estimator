Meteor.methods({
  //Add new reponse to database
  ajouteReponse : function (numQuestion, ajoutReponse){
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (Reponses.find({user_Id: Meteor.userId()}).count() === 0) {
      Reponses.insert({user_Id: Meteor.userId(), reponse: [], total: 0, email:''});
    }
  var reponseTotal = Reponses.find({user_Id: Meteor.userId()}).fetch()[0].reponse;
  //console.log(reponseTotal);
  reponseTotal[numQuestion] = ajoutReponse;
  
  Reponses.update(
    {user_Id: Meteor.userId()}, 
    {
      $set : {
        reponse: reponseTotal,
      }
    })
  
   },
  
  calculMontant: function() {
    var montant = 0;
    var reponseFinal = '';
    var repArray = [];
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    reponseFinal = Reponses.find({
      user_Id: Meteor.userId()
    });

    if (reponseFinal.count() > 0) {
      repArray = reponseFinal.fetch()[0].reponse;

      for (i = 0; i < repArray.length; i++) {
        montant = montant + repArray[i].montant;
      }
      
      Reponses.update(
        {user_Id: Meteor.userId()}, 
        {
          $set: {
            total: montant,
          }
        })
    }

  },
  
  ajouteEmail: function(emailUtilisateur) {
    check([emailUtilisateur],[String]);
    
    Reponses.update({
        user_Id: Meteor.userId()
      }, {
        $set: {
          email: emailUtilisateur,
        }
      });
  },
  
});