const multer = require('multer');

const multerConfigMemoryStorage = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:1024*1024*2
    },
    filefilter: function(req, file, cb){
        if(file.mimetype ==="image/jpeg" || file.mimetype ==="image/png" || file.mimetype ==="image/jpg"){
            cb(null, true)
        }
        else{
            var newError = new Error('File type is not supported');
            cb(newError, false)
        }
}
})

const upload = multer(multerConfigMemoryStorage)

module.exports = upload