const {gameStatus, reject} = require("../util")

function checkGame(req,res,next){
    if(gameStatus){
        return reject(res,"Game already start please wait")
    }
    next()
}
module.exports = { checkGame }