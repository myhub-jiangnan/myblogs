

## url取参

```javascript
function getQueryVariable(variable){
       let query = window.location.search.substring(1);
       let vars = query.split("&");
       for (let i=0;i<vars.length;i++) {
               let pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

调用方法：

let 参数1 = getQueryVariable("参数名1");

```
