# 母亲节活动：

### 需求：
----
>##### 页面
* 列表页：母子照片列表 点赞、搜索
* 详情页面
* 参加活动页：上传照片4张，一段给母亲的话
* 排行榜
* 活动介绍页

>##### 微信功能
* 微信js-sdk 分享
* 微信页面授权用户信息：判断是否关注微信公众号导向关注页面或活动页面

### 使用的技术：
----
* html+css+js+php+json文件
* html+css 实现页面的架构
* js实现操作dom、json文件数据读取
* js：ajax配合php实现json文件的数据操作（增、改）
> css技术：媒体查询、宽度百分比、字体rem实现各个分辩率的移动端基本显示一致
> js技术：zepto、requirejs、promise

### 功能实现（及遇到的坑）：
----
##### 微信页面授权+js-sdk（js结合php实现） #####
* **实现：微信页面授权(经理的要求是关注微信公众号才可以玩这个游戏)**
通过：snsapi_base获取openid再通过openid获取获取用户信息,判断用户是否关注公众号从而决定导向关注二维码页面还是,还是活动页面
        **坑1：VM6597:1 Uncaught SyntaxError: Unexpected token < in JSON at position 0**
    内容：{"errcode":40163,"errmsg":"code been used, hints: [ req_id: Orf0601th22 ]"}
     解决：就是taken值无效或被使用了呗，再重新获取token值
* **坑2，js-sdk 实现微信分享**
    分享的url 不能是微信获取token的地址，只能是自己页面的地址不然它不会使用你定义的分享内容

>##### 数据存数：json文件 （ajax+php）

* **读取数据：**
ajax直接读取数据没啥问题
* **写入数据：（ajax 不能操作json数据的写，只能配合php）**
* **坑1：业务层数据操作，要注意数据输出，这会给后面操作带来很大的麻烦，代码不清晰，脑子会变浆糊**
* **坑2：file_put_contents独占式打开，在虚拟空间中，写文件后，再读取就卡住了**
 解决：进行写操作时，读出最新数据，使用变量存储
>
>
>##### 图片文件的操作（ajax+php）
* **流程：**
    图片上传到本地服务器，并把图片地址存储到json数据中
* **图片上传到本地服务器实现：**
    1.input[type=file]+js 展示图片、删除图片、并把图片信息file存入到数组
    2.提交form表单的时候：先把图片上传到本地，再把获取到的图片地址结合获取的参赛活动信息存入到json文件中

>##### 分页的实现
* 对json 数据分页的实现

>##### 安卓window.loacation 兼容问题

>
>window.location.href = 'http://' + location.hostname + '' + location.pathname + '?time=' + ((new Date()).getTime());


