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
const killPlayer = require("./controllers/killPlayer")
const gameEnd = require("./controllers/gameEnd")

//middlewares
const { checkGame, isCorrectId, isAdmin } = require("./middleware")
console.log(checkGame)

app.use(express.json())

app.get("/info",info.GET)
app.post("/word",word.POST)
app.post("/login",login.POST)
app.post("/kill",killPlayer.POST)
app.post("/endGame",gameEnd.POST)
app.post("/register", register.POST)
app.get("/start",checkGame,isAdmin,startGame.GET)
app.post("/join",checkGame,isCorrectId,joinGame.POST)
app.use("/avatar",express.static(path.join(process.cwd(),"src","avatars")))

app.listen(PORT, () => console.log("http://localhost:"+PORT))
