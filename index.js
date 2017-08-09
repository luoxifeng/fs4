


var path = require("path");
var fs = require("fs");



module.exports = fs4;

function fs4(curpath = "./", exclude = []){
    var absPath = path.resolve(curpath);
    console.log(11)
    var result = loop(absPath, exclude);
    console.log(result)
    return {
        toJsonFile(target = "files.json", filter = null, indent = 0){
            if (!/\.json/.test(target)) {
                target += ".json" 
            }
            target = path.resolve(target)
            var str = JSON.stringify(result, filter, indent);
            fs.writeFileSync(target, str);
        }
    }

}

function loop(curPath, exclude = []) {
    var res = [];
    var dirs = fs.readdirSync(curPath);
    var hasDir = dirs.find(dir => {
        if (exclude.includes(dir)) return false;
        var nextPath = path.resolve(`${curPath}/${dir}`);
        var st = fs.statSync(nextPath);
        return st.isDirectory()
    })
    if (hasDir) {
        res = {}
    }

    dirs.forEach(dir => {
        if (exclude.includes(dir)) return;
        var nextPath = path.resolve(`${curPath}/${dir}`);
        var st = fs.statSync(nextPath);
        if (st.isDirectory()) {
            res[dir] = loop(nextPath, exclude)
        } else if (st.isFile()) {
            if(hasDir) {
                if(!res["files"]) {
                    res["files"] = [];
                }
                res["files"].push(dir);
            } else {
                res.push(dir)
            }
        }

    })
    return res;
}


