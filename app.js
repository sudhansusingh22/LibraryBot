var builder = require('botbuilder');

var bot = new builder.TextBot();
bot.add('/', [
    function (session,next) {
        session.send("Hi %s, what can I help you with?",session.userData.name);
    // session.send('Hello! I am your Library Bot!\nWhat is your name ?');
    session.beginDialog('/profile');
},
    // ask for age
    function (session, results) {
        
        session.send('%s, your age is %d',session.userData.name, session.userData.age);
}]);

// Check for the first run 
bot.use(function (session, next) {
    // if its first run set firstRun to true
    if(!session.userData.firstRun){
        session.userData.firstRun = true;
        session.beginDialog('/firstRun');
    }
    else{
        next();
    }
});

// add firstRun Dialog
bot.add('/firstRun', [
        function (session) {
            builder.Prompts.text(session, 'Hello! I am your Library Bot!\nWhat is your name?');
        },
        function (session,results) {
            session.userData.name = results.response;
            // go back to old dialog
            session.replaceDialog('/');
        }
    ]
);

bot.add('/profile',[
    function (session) {
        builder.Prompts.number(session,'Tell me your age!');
    },
    function(session,results){
        session.userData.age = results.response;
        session.replaceDialog('/');
    }
])
bot.listenStdin();