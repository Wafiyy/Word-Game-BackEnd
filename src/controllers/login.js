const {read, reject} = require("../util");

function POST(req,res){
    let {username,password} = req.body

    let users = read("users")
    if(!username || !(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username))){
        return reject(res,"Invalid username")
    }
    if(!password || !(/^(?=.*[a-zA-Z0-9]).{6,20}$/.test(password))){
        return  reject(res,"Invalid password")
    }

    let user = users.find(user => user.username.toLowerCase() === username.toLowerCase() && user.password === password)
    if(!user){
        return reject(res,"Username or password is incorrect")
    }
    let info = read("info")
    user.avatar = "/avatar/"+user.avatar
    delete user.password

    res.json({
        ok:true,
        message:"ok",
        gameStatus: info.gameStatus,
        data: user
    })


}


module.exports = {
    POST
}