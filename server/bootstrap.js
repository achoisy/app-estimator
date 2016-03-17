Meteor.startup(function () {
  process.env.MAIL_URL = Meteor.settings.private.MAIL_URL_INFO;
  //Auto users login without password
  AccountsGuest.anonymous = true;
  
  if (Questions.find().count() === 0) {
    let questions = [
      {
        ordre: 1,
        text: 'Sur quel platforme fonctionne votre application ?',
        type: 2,
        reponse: [{
          ordre:1,
          text:'Apple iOS',
          montant: 0
        },
        {
          ordre:1,
          text:'Android',
          montant: 0
        },
        {
          ordre:1,
          text:'Navigateur WEB',
          montant: 0
        }
        ],
        montant: 2450,
        lastQuestion: false,
      }
    ];
    
    questions.forEach((m) => {
      Questions.insert(m);
    });
  }
  
  
  
});