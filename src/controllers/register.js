const multer = require("multer");
const {imageFilter, read, write, reject, gameStatus} = require("../util");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(process.cwd(), "src", "avatars"));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

async function POST(req,res){
    let upload = multer({storage: storage, fileFilter: imageFilter}).single('avatar');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return  reject(res,err.message);
        } else if (err) {
            return reject(res,err.message);
        }
        try{
            let {username,password} = req.body
            username = username?.trim()
            if(!username || !(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username))){
                return reject(res,"Invalid username")
            }
            if(!password || !(/^(?=.*[a-zA-Z0-9]).{6,20}$/.test(password))){
                return  reject(res,"Invalid password")
            }

            const users = read("users")
            let user = users.find(user => user.username === username)

            if(user){
                return reject(res,"This username is already taken")
            }

            let avatar = req.file ? path.basename(req.file.path) : "default.png"

            let newUser = {
                id: users.at(-1)?.id+1 || 1,
                username,
                password,
                avatar
            }
            users.push(newUser)

            write("users",users)
            res.json({
                ok:true,
                message:  newUser.username+" successfully added",
                id: newUser.id,
                gameStatus
            })
        }
        catch (e){
            reject(res)
        }
        // Display uploaded image for user validation
    });
}
module.exports = {
    POST
}
