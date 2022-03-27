let {read, reject, write} = require("../util");

function GET(req,res){
    let game = read("game")
    if(game.length < 2) return reject("Not enough players")
    let info = read("info")
    info.turn = game[0].playerId
    info.gameStatus = true
    write("info",info)
    res.json({
        ok: true,
        message: "Game started"
    })
}
module.exports = {
    GET
}