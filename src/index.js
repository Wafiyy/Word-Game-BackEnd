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
const startGame = require("./controllers/startGame")
const word = require('./controllers/word')
const info = require('./controllers/data')

//middlewares
const { checkGame, isCorrectId, isAdmin } = require("./middleware")
console.log(checkGame)

app.use(express.json())

app.post("/register", register.POST)
app.post("/login",login.POST)
app.post("/join",checkGame,isCorrectId,joinGame.POST)
app.get("/start",checkGame,isAdmin,startGame.GET)
app.post("/word",word.POST)
app.get("/info",info.GET)
app.use("/avatar",express.static(path.join(process.cwd(),"src","avatars")))

app.listen(PORT, () => console.log("http://localhost:"+PORT))
