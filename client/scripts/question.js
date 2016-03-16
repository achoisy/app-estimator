Template.question.viewmodel({
  questions:'',
  boutonSwitch: false,
  
  onCreated: function() {
    var questObjet = Questions.find({ordre: 1}).fetch();
    this.questions(questObjet[0]);
  },
  
  typeChoix: function() {
     var quest = this.questions();
     console.log(quest);
     switch (quest.type){
       case 1:
         return ("Choix unique:")
         break;
       case 2:
         return("Choix multiple:")
         break;
     }
   },
  
  questionSuivante: function() {
    // Decide si la question est la derniere
    //affiche le bouton suivant ou fin
    var questSuiv  = this.questions().ordre + 1;
    var questObjet = Questions.find({ordre: questSuiv}).fetch();
    this.questions(questObjet[0]);
    this.boutonSwitch(questObjet[0].lastQuestion);
    if (questObjet[0].lastQuestion) {
      
    } else {
      
    }
  },
  
  dernierQuestion: function() {
    
  },
  
});

Template.displayQuestion.viewmodel({

});