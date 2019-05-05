// game is passed from a user search field on client side
var game = "League of Legends";// Hardcoded name

// configuration for twitch api call
var config = {
    url: "https://api.twitch.tv/helix/games",
    method: "get",
    headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "accept-encoding": "gzip, deflate",
        Host: "api.twitch.tv",
        "Postman-Token": "48c59691-71ff-4f88-bd3e-fbc4da7d30b5,3d6a2e52-3883-4cc2-8ba2-e616c17e64b7",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "User-Agent": "PostmanRuntime/7.11.0",
        "Client-ID": "" // recieve this from twitch api keys
    },
    params: {
        name: game
    },
};

function findGame(){
    // Sequelize query call equivalent to 'SELECT * FROM appids WHERE name = game;'
    db.appids.findOne({ where: {name: game} }).then(function(dbAppids){  
        if(!dbAppids){ //If game is not in database, query the api
            console.log("Game does not exist in database, searching twitch...");
            axios(config) // api call, game name contained within
                .then(function (data) {
                    var newGames = data.data;
                    if(newGames.data.length > 0){ // Checks that response is not empty
                        db.appids.create({ // Insert api data into database
                            appid: newGames.data[0].id,
                            name: newGames.data[0].name,
                            image: newGames.data[0].box_art_url.replace(/-{width}x{height}/g, "")
                        }).then(function () {
                            findGame(); // Called again to send data to client, not important if you don't have a front end
                        });
                    }
                    else{ //add better error handling for invalid searches
                        console.log("Game does not exist on twitch");
                    }
                });
        }
        else{
            console.log("Found in database, twitch api not used!");
            res.json(dbAppids.dataValues); // Sends a json object of the data to client
        }
    });
}
