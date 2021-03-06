const path = require("path")
const fs = require("fs")
const gameStatus = false
const turn = 0
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        cb(null, false);
        return cb(new Error("Please upload a image"))
    }
    cb(null, true);
};
/**
 *
 * @param fileName{string}
 * @returns {any|*[]}
 */
function read(fileName){
    try{
        const data = fs.readFileSync(path.join(process.cwd(),"src","db",fileName+".json"),"utf-8")
        return JSON.parse(data) || []
    }
    catch (err){
        throw err
    }
}

/**
 *
 * @param fileName{string}
 * @param data{Object}
 * @returns {boolean}
 */
function write(fileName,data){
    try {
        fs.writeFileSync(path.join(process.cwd(),"src", 'db', fileName + '.json'), JSON.stringify(data, null, 4))
        return true
    } catch(error) {
        throw error
    }
}

function reject(res,message="Error"){
    return res.status(400).json({
        ok: false,
        message,
    })
}
module.exports = {
    turn,
    read,
    write,
    reject,
    gameStatus,
    imageFilter
}