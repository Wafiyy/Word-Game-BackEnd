const path = require("path")
const fs = require("fs")

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
module.exports = {
    imageFilter,
    read,
    write
}