# git 常用命令

## git clone -b branchName url
> 克隆远程指定分支代码到本地

## git add .
>
> git add . 用于修改，添加后，保存文件状态
## git add --a 
> git add --a  可以用于保存包括删除文件的操作，

## git  branch 
> 查看当前本地分支

## git branch -a 
> 查看所有分支，包括远程分支，远程分支为红色

 ## git branch branchName

> 在本地创建某个分支

## git push origin branchName:branchName
> 创建一个远程分支


 ## git checkout branchName
 > 切换到本地某个分支

 ## git checkout -b branchNamelocal origin/branchNameremote
 > 切换到远程某个分支(创建一个本地分支，再将远程分支拉取到该分支)

 ## git branch -d branchName

 > 删除某个分支，不能在该分支上删除自身，需要切换到别的分支再进行删除操作

## git checkout -b branchName
>  创建并切换到新的分支

## git merge branchName

> 将branchName 分支合并到当前分支上


## git pull
> 从仓库拉取最新代码

## git push origin
> 推送代码到远程仓库主分支

## git push branchName
> 推送代码到远程仓库某个分支

## Esc + ：wq +  enter
> 有时候merge 或者pull 的时候，会提示"Please enter a commit message to explain why this merge is necessary." 意思是解释一下为什么要合并代码，可以不用解释， 按ESC , 输入冒号：wq  回车就行。


## 合并代码到master 上 ,假如自己正在开发的分支为dev

```javascript
1. git checkout master

2. git pull

3. git merge dev

4. git add .

5. git commit -m "备注"

6. git pull origin  



```



https://www.cnblogs.com/mamingqian/p/9711975.html


