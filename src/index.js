const { PORT } = require("../config")
const express = require("express")
const multer = require('multer');
const path = require("path");
const {imageFilter} = require("./util");
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
        if (req.fileValidationError) {
            console.log(res.fileValidationError)
            return res.send(req.fileValidationError);
        }
        else if(!req.file){
            return res.status(400).send(err.message)
        }
        else if (err instanceof multer.MulterError) {
            console.log(err.message)
            return res.status(400).send(err.message);
        } else if (err) {
            console.log(err.message)
            return res.send(err.message);
        }
        // Display uploaded image for user validation
        console.log(req.body)
        res.send(`You have uploaded this image`);
    });
})

app.listen(PORT, () => console.log("http://localhost:"+PORT))
