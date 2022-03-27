const {read, reject} = require("../util");

function GET(req,res){
    try{
        let game = read("game")
        let info = read("info")
        let words = read("words")

        res.json({
            ok: true,
            message: "ok",
            players: game,
            turn: info.turn,
            lastWord: words.at(-1)
        })
    }
    catch {
        return reject(res)
    }
}
module.exports = {
    GET
}