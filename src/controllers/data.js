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
            turn: info.turn || null,
            lastWord: words.at(-1),
            admin: game?.[0].id
        })
    }
    catch {
        return reject(res)
    }
}
module.exports = {
    GET
}