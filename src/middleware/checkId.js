const {read, reject} = require("../util")

function isCorrectId(req,res,next){
    try{
        let {id} = req.body
        if(!id) return reject(res,"id is undefined")
        id = Number(id)
        const users = read('users')
        const game = read('game')
        let user = users.find(user => user.id === id)
        let userExists = game.find(el => el.id === id)

        if(!user) return reject(res,"User not found")
        if(userExists) return reject(res,"You are already joined the game")

        delete user.password
        req.user = user
        next()
    }
    catch {
        return reject(res)
    }
}

module.exports = { isCorrectId }