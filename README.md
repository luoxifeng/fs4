# fs4
files path to map
## 说明
  * 用途：
  *
  *
  
## 使用（默认电脑上已经安装node环境）
  * 1.down下文件，放到你指定的目录
  * 2.新建一个jswen文件向下面这样书写代码，yourpath是上一步你指定的文件相对于本文件的相对路径，
  * 3.使用node执行上一步写好的文件，生成一个文件目录结构文件，大功告成
   tips:fs4()方法传入你想读取的文件目录,toJsonFile()方法里传入要把生成的文件放在哪里(相对路径)，如果不传任何参数，默认命名file.json
```javascript
var fs4 = require('yourpath');
fs4("./").toJsonFile("file.json");
```

## 效果（售后截图展示）
