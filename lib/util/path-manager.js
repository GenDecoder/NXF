var fs = require('fs');
/**
 * 
 */
function PathManager() {}
/**
 * 
 */
PathManager.prototype.getPathMap = function(nxDir, absoluteDir, pathMap) {
    var me = this;
    var files = fs.readdirSync(absoluteDir);

    pathMap = pathMap || {};

    files.forEach(function iterator(fileName) {        
        var extension = fileName.split(".")[1];
        var absolutePath = absoluteDir + fileName;
        var nxPath = nxDir + "." + fileName.split(".")[0];

        if (fs.statSync(absolutePath).isDirectory()) {
            me.getPathMap(nxPath, absolutePath + '/', pathMap);
        } else {
            if (!pathMap[extension])
                pathMap[extension] = {
                    nxPathList: [],
                    absolutePathList: []                    
                };
            pathMap[extension].nxPathList.push(nxPath);
            pathMap[extension].absolutePathList.push(absolutePath);
        }
    });

    return pathMap;
};

module.exports = new PathManager();