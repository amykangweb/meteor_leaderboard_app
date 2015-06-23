// Server Side Code

if(Meteor.isServer) {
  // this code only runs on the server
  console.log("Hello server");
  Meteor.publish('thePlayers', function(){
    // find id of currently logged in user
    var currentUserId = this.userId;
    // this code duplicates functionality of autopublish
    return PlayersList.find({createdBy: currentUserId});
  });

  Meteor.methods({
    'insertPlayerData': function(playerNameVar){
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function(selectedPlayer){
      var currentUserId = Meteor.userId();
      // This will ensure only data from current user can be removed.
      PlayersList.remove({_id: selectedPlayer,
      createdBy: currentUserId});
    },
    'modifyPlayerScore': function(selectedPlayer, scoreValue){
      var currentUserId = Meteor.userId();
      PlayersList.update({_id: selectedPlayer,
        createdBy: currentUserId}, {$inc: {score: scoreValue}});
    }
  });
}
