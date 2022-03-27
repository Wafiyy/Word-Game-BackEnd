const { read, write, reject} = require("../util")
function POST(req,res){
    try{

        const game = read("game")
        req.user.playerId = game.at(-1)?.playerId + 1 || 1
        game.push(req.user)
        write("game",game)
        res.json({
            ok: true,
            message:"You successfully joined the game"
        })
    }
    catch (e){
        return reject(res,e.message)
    }
}
module.exports = { POST }