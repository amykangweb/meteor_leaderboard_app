// Don't use var keyword for global variables. This will allow us to reference
// and manipulate the collection throughout all of our project's files.
PlayersList = new Mongo.Collection('players');

console.log("Hello world!!");

// Look in client folder for client side code
// Look in server folder for server side code

// Files stored in "private" folder are only accessible to the server
// Files stored in "public" folder are served to visitors
// Files stored in "lib" folder are loaded before other files
