const DataUri = require('datauri')
var dataUriChild = new DataUri()
const path = require('path')

module.exports = function(originalName, buffer){
    console.log(6, originalName)
   var extName = path.extname(originalName)
    return dataUriChild.format(extName, buffer).content
}
