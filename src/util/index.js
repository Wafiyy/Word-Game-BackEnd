const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        cb(null, false);
        return cb(new Error("Please upload a image"))
    }
    cb(null, true);
};
module.exports = {
    imageFilter
}