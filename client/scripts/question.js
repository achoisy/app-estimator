Template.question.viewmodel({
  reponse: '',
  questions:'',
  boutonSwitch: false,
  
  onCreated: function() {
    var questObjet = Questions.find({ordre: 1}).fetch();
    this.questions(questObjet[0]);
  },
  
 
  questionSuivante: function() {
    //Enregistrement de la selection de 'lutilisateur
    var ordreRep = this.reponse() - 1;
    
    var reponseQuest = {question: this.questions().text,
                        reponse: this.questions().reponse[ordreRep].text,
                        montant: this.questions().reponse[ordreRep].montant
                        }
    Meteor.call('ajouteReponse',ordreRep,reponseQuest);
    //Reset des choix de l'utilisateur
    this.reponse('');
    // Decide si la question est la derniere
    //affiche le bouton suivant ou fin
    var questSuiv  = this.questions().ordre + 1;
    var questObjet = Questions.find({ordre: questSuiv}).fetch();
    this.questions(questObjet[0]);
    this.boutonSwitch(questObjet[0].lastQuestion);
    
  },
  
  dernierQuestion: function() {
        //Enregistrement de la selection de 'lutilisateur
    var ordreRep = this.reponse() - 1;
    
    var reponseQuest = {question: this.questions().text,
                        reponse: this.questions().reponse[ordreRep].text,
                        montant: this.questions().reponse[ordreRep].montant
                        }
    Meteor.call('ajouteReponse',ordreRep,reponseQuest);
    var synCall = Meteor.call('calculMontant');
    Router.go('/resultat');
  },
  
  teste: function() {
    var ordreRep = this.reponse() - 1;
    console.log(this.questions().reponse[ordreRep]);
  }
});


Template.choixReponse.viewmodel({
  
  select: function () {
    this.parent().reponse(this.ordre());
  },
  isSelected: function() {
    return this.parent().reponse() === this.ordre();
  }
});










