const {read, write, reject} = require("../util");

function POST(req,res){
    try{
        let { id } = req.body

        let game = read("game")

        game = game.filter(el => el.id !== id)
        write("game",game)

        res.json({
            ok:true,
            message: "Player successfully deleted!"
        })
    }
    catch (e) {
        return reject(res,e.message)
    }
}
module.exports = {
    POST
}