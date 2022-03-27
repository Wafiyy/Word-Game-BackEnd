const { PORT } = require("../config")
const express = require("express")
const path = require("path");
const app = express()
const cors = require("cors")

app.use(cors())
// controllers
const register = require("./controllers/register")
const login = require("./controllers/login")
const joinGame = require("./controllers/joinGame")


//middlewares
const { checkGame } = require("./middleware/checkGame")
const { isCorrectId } = require("./middleware/checkId")

app.use(express.json())

app.post("/register", register.POST)
app.post("/login",login.POST)
app.post("/join",checkGame,isCorrectId,joinGame.POST)
app.use("/avatar",express.static(path.join(process.cwd(),"src","avatars")))

app.listen(PORT, () => console.log("http://localhost:"+PORT))
