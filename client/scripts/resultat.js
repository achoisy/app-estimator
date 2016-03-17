Template.resultat.viewmodel({
  montant: function() {
    return Reponses.find({user_Id: Meteor.userId()}).fetch()[0].total;
  },
  demandeDevis: function() {
    swal({
      title: "Nous contacter",
      text: "Veuillez entrer votre email:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "mon@adresse.com"
    }, function(inputValue) {
      if (inputValue === false) return false;
      if (inputValue === "") {
        swal.showInputError("Vous devez taper votre email!");
        return false
      }
      var emailSetup = Meteor.call('ajouteEmail',inputValue);
      var message = Reponses.find({user_Id: Meteor.userId()}).fetch()[0];
      var messageFinal= "user_ID: " + message.user_Id + "\n pseudo : " + Meteor.user().profile.pseudo +"\n email: " + message.email + "\n total: " + message.total +"\n";
      
      message.reponse.forEach((m) => {
        messageFinal = messageFinal +  "Question: " + m.question + " Reponse: "+ m.reponse +"\n";
      });
      
      console.log(messageFinal);
       Meteor.call('sendEmail',
             'alexandre.choisy@gmail.com',
             'alexandre.choisy@overblock.io',
             'Nouveau contact!',
             messageFinal);
      swal("Merci!", "Nous vous contacterons sur votre email: " + inputValue, "success");
    }); 
  },
});