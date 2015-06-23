// Client Side Code

if(Meteor.isClient) {
  Meteor.subscribe('thePlayers');
  // this code only runs on the client
  Template.leaderboard.helpers({
    // helper functions go here
    'player': function(){
      var currentUserId = Meteor.userId();
      // By passing through a value of -1 we can sort in descending order
      // Highest score first
      // Then they will be sorted by name alphabetically. Score first, then name.
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
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
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer);
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(){
      // prevent default behavior
      // prevent browser from refreshing when submit button hit.
      event.preventDefault();
      // event object grabs html element with name attribute set to playerName
      var playerNameVar = event.target.playerName.value;
      // insert data into PlayerList Collection/Table
      Meteor.call('insertPlayerData', playerNameVar);
    }
  });
}
