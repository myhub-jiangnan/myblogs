
> ## markdown

```
  {
	"Print to `gre": {
		"prefix": "`gre",
		"body": [
			" **<font color='#42B983' size=3.5 >$2 </font>** ",
		]
	},
	"Print to `red": {
		"prefix": "`red",
		"body": [
			" **<font color='#B71A1A' size=3.5 >$2 </font>** ",
		]
	},
	"Print to clg": {
		"prefix": "clg",
		"body": [
			"console.log($1)",
		]
	},
	"Print to fun": {
		"prefix": "fun",
		"body": [
			"function $1(){",
			"}",
		]
	},
	"Print to code": {
		"prefix": "code",
		"body": [
			"```",
			"  $1",
			"```",
		]
	},
	"Print to big": {
		"prefix": "big",
		"body": [
			" **<font color='#42B983' size=4.5 >$2 </font>** ",
		]
	},
	"Print to b": {
		"prefix": "b",
		"body": [
			" **<font size=4.5>$2</font>** ",
		]
	},
	"Print to JS": {
		"prefix": "JS",
		"body": [
			"JavaScript",
		]
	},
}



```

> ## JavaScript

```
  {
	"Print to js class": {
		"prefix": "todo",
		"body": [
			"/*",
			" *@Description: $0",
			" *@Author:JiangNan",
			" *@Date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
			"*/"
		],
	},
	"Print to fun": {
		"prefix": "fun",
		"body": [
			"function $1(){",
			"}",
		]
	},
}

```

> ## HTML

```
  {
        "h5 template": {
                "prefix": "vh", // 对应的是使用这个模板的快捷键
                "body": [
                        "<!DOCTYPE html>",
                        "<html lang=\"en\">",
                        "<head>",
                        "\t<meta charset=\"UTF-8\">",
                        "\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
                        "\t<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
                        "\t<title>Document</title>",
                        "</head>\n",
                        "<body>",
                        "</body>\n",
                        "</html>"
                ],
                "description": "HT-H5" // 模板的描述
        },
        "Print to fun": {
                "prefix": "fun",
                "body": [
                        "function $1(){",
                        "}",
                ]
        },
}
```

> ## Vue

```
  "Print to console": {
		"prefix": "vue",
		"body": [
			"<template>",
			"<div></div>",
			"</template>",
			"",
			"<script>",
			"export default {",
			"data() {",
			"return {",
			"",
			"}",
			"},",
			"created() {",
			"",
			"},",
			"mounted() {",
			"",
			"},",
			"methods: {",
			"}",
			"}",
			"</script>",
			"<style lang= 'scss' scoped>",
			"$4",
			"</style>"
		],
		"description": "Log output to console"
	}
```