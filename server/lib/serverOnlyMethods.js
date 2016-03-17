Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
      
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },
  
  	cleanChats: function() {
		// Remove empty and offline
		var onlineGuests = Meteor.users.find({$or: [{'status.online': true}, {'status.idle': true}]}).fetch()
		var onlineIds = [];
		_.each(onlineGuests, function(user, i){
			onlineIds.push(user._id)
		})

		ChatBubblesCollection.remove({
			authorId: {$nin: onlineIds}, // is not online
			messages: {$size: 0}, // no chat is present
		})

		// Archive offline and old
		var old = ChatBubblesGet('hoursOld')
		var oldDate = moment().subtract(old, 'hours').toDate();
		var a = ChatBubblesCollection.update({
			authorId: {$nin: onlineIds}, // is not online
			createdAt: {$lt: oldDate}, // older than ..
			archived: {$in: [null, false]}
		}, {$set: {archived: true}}, {multi:true})
	},
});