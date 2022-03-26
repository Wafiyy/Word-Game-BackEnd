const { PORT } = require("../config")
const express = require("express")
const multer = require('multer');
const path = require("path");
const {imageFilter, read, write} = require("./util");
const app = express()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(process.cwd(), "src", "avatars"));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.use(express.static("avatars"))

app.post("/register",async (req, res) => {
    let upload = multer({storage: storage, fileFilter: imageFilter}).single('avatar');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err.message)
            return res.status(400).send(err.message);
        } else if (err) {
            console.log(err.message)
            return res.send(err.message);
        }
        try{
        let {username,password} = req.body
        username = username?.trim()
        if(!username || !(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username))){
            return res.status(400).json({
                ok: false,
                message: "Invalid username"
            })
        }
        if(!password || !(/^(?=.*[a-zA-Z0-9]).{6,20}$/.test(password))){
            return res.status(400).json({
                ok: false,
                message: "Invalid password"
            })
        }

        const users = read("users")
        let user = users.find(user => user.username === username)

        if(user){
            return res.status(400).json({
                ok: false,
                message: "This username is already taken"
            })
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
            message:  newUser.username+"successfully added",
            id: newUser.id
        })
        }
        catch (e){
            res.status(400).json({
                ok:false,
                message: "Error"
            })
        }
        // Display uploaded image for user validation
    });
})

app.listen(PORT, () => console.log("http://localhost:"+PORT))
