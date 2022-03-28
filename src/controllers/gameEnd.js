const {write, reject} = require("../util");


function POST(req,res){
    try{
        write("game",[])
        write("info",{gameStatus: false})
        write("words",[])
        res.json({
            ok:true,
            message: "Game End"
        })
    }
    catch (e){
        return reject(res.e.message)
    }
}
module.exports = {
    POST
}