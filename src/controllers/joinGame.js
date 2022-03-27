const { read, write, reject} = require("../util")
function POST(req,res){
    try{
        const game = read("game")
        game.push(req.user)
        write("game",game)
        res.json({
            ok: true,
            message:"You successfully joined the game"
        })
    }
    catch (e){
        return reject(res)
    }
}
module.exports = { POST }