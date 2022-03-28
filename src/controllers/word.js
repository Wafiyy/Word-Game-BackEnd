const {read, reject, write} = require("../util");

function POST(req,res){
    let {id, word } = req.body
    let words = read("words")
    word = word?.trim()
    id = +id
    let lastLetter = words.at(-1)?.slice(-1)
    
    if( !word &&word === "") return reject(res, "please enter the word")
    if(lastLetter && lastLetter !== word.charAt(0)) {
        let game = read("game")
        game = game.filter(el => el.id !== id)
        write("game",game)
        return reject(res,"Invalid word")
    }
    words.push(word)
    write("words",words)
    let info = read("info")
    info.turn = info.turn+1
    res.json({
        ok: true,
        message: "Word added"
    })
}
module.exports = {
    POST
}