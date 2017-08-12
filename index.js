


var path = require("path");
var fs = require("fs");



module.exports = fs4;

function fs4(curpath = "./", exclude = []){
    exclude = transExclude(exclude);
    var absPath = path.resolve(curpath);
    var result = loop(absPath, exclude);

    return { toJsonFile , json}

    function toJsonFile(target = "files.json", filter = null, indent = 0){
        if (!/\.json/.test(target)) {
            target += ".json" 
        }
        target = path.resolve(target)
        var str = JSON.stringify(result, filter, indent);
        fs.writeFileSync(target, str);
        return this;
    }

    function json(filter = null){
        var str = JSON.stringify(result, filter);
        var res = JSON.parse(str)
        res.__proto__ = Object.create({toFile: toJsonFile})
        return res;
    }


}

function transExclude(exclude){
    if(isArr(exclude)){
        return function(dir){
            return exclude.includes(dir);
        }
    } else if (isFun(exclude)){
        return exclude;
    } else {
        console.error("fs4 require a array or function as second argment")
        return function (){
            return false;
        }
    }

}

function loop(curPath, exclude) {
    var res = [];
    var dirs = fs.readdirSync(curPath);
    var hasDir = dirs.find(dir => {
        var nextPath = path.resolve(`${curPath}/${dir}`);
        var st = fs.statSync(nextPath);
        if(exclude(dir, st)) return false;
        return st.isDirectory()
    })
    if (hasDir) {
        res = {}
    }

    dirs.forEach(dir => {
        var nextPath = path.resolve(`${curPath}/${dir}`);
        var st = fs.statSync(nextPath);
        if(exclude(dir, st)) return;
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

function isArr(arr){
    if (Array.isArray) {
        return Array.isArray(arr)
    }
    return Object.prototype.toString.call(arr) === "[object Array]";
}

function isFun(fun){
    return typeof fun === "function";
}

