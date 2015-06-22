// Don't use var keyword for global variables. This will allow us to reference
// and manipulate the collection throughout all of our project's files.
PlayersList = new Mongo.Collection('players');

console.log("Hello world!!");

if(Meteor.isClient) {
  // this code only runs on the client
  Template.leaderboard.helpers({
    // helper functions go here
    'player': function(){
      var currentUserId = Meteor.userId();
      // By passing through a value of -1 we can sort in descending order
      // Highest score first
      // Then they will be sorted by name alphabetically. Score first, then name.
      return PlayersList.find({createdBy: currentUserId}, {sort: {score: -1, name: 1}});
    },
    'otherHelperFunction': function(){
      return "Some other function"
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      // return class selected to element
      if(playerId == selectedPlayer) {
        return "selected"
      }
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(){
      // prevent default behavior
      // prevent browser from refreshing when submit button hit.
      event.preventDefault();
      // event object grabs html element with name attribute set to playerName
      var playerNameVar = event.target.playerName.value;
      var currentUserId = Meteor.userId();
      // insert data into PlayerList Collection/Table
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    }
  });

  Template.leaderboard.events({
    // events go here
    'click .player': function(){
      // code goes here
      // Not really understanding this.
      // Setting and passing player id on click??
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5}});
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5}});
    },
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    }
  });
}

if(Meteor.isServer) {
  // this code only runs on the server
  console.log("Hello server");
}
