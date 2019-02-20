define(function(require) {　
    var $ = require('zepto');　
    var time = require('tool');
    var Votehandle = function() {　　};　

    Votehandle.prototype = {
        constructor: Votehandle,
        //读取数据
        getData: function() {
            var _this = this;
            var timed = time.getTimenyr();
            var url = './data/vote' + timed + '.json';

            return new Promise(function(resolve, reject) {               
                try {
                    $.getJSON(url + '?ran=' + new Date(), function(data) {
                        if (data) {                           
                            return resolve(data.data);
                        } else {                           
                            return reject("暂无数据");
                        }

                    });

                }catch(e){                   
                    return reject("获取数据出错，请联系管理员");
                }
            })

        },
        //存入数据
        writeData: function(obj) {
            var _this = this;
            var FileController = './php/writevotedata.php';
            return new Promise(function(resolve, reject) {
                if (obj) {
                    var timed = time.getTimenyr();
                    var url = 'vote' + timed + '.json';
                    obj.filename = url;
                    $.post(FileController, obj, function(data) {
                        var data = JSON.parse(data)
                            // process response
                        if (data) {
                            return resolve(data.data);
                        } else {
                            return reject("存入数据出错,请联系管理员");
                        }
                    })
                } else {
                    return reject("无发获取存入数据,请联系管理员");
                }

            });



        },
        getDataByOpenid: function(openid) {
            var _this = this;            
            var arrVoteId = [];
            return new Promise(function(resolve, reject) {
                if (openid) {
                    _this.getData().then(function(data) {
                        if (data) {
                            data.forEach(function(item, index) {
                                if (item.openid === openid) {
                                    arrVoteId.push(item)
                                }

                            })                            
                            resolve(arrVoteId);
                        } else {
                            reject("获取数据出错，请联系管理员");
                        }

                    }).catch(function(err) {
                         reject("获取数据出错，请联系管理员");

                    });

                } else {
                    return reject("Id值不存在，请联系管理员")
                }


            })

        },
        checkDataByopenid: function(openid, id) {
            var _this = this;
            var flag = false;
            var count = 0;
            return new Promise(function(resolve, reject) {
                var timed = time.getTimenyr();
                if (timed === "201755") {
                    return reject("活动结束");
                };
                if (!openid || !id) {
                    return reject("Id值不存在，请联系管理员");
                };
                _this.getData().then(function(data) {

                    if (data) {
                        data.forEach(function(item, index) {                           
                            if (item.openid === openid) {
                                count++;                               
                            }
                            if (item.openid === openid && item.loverid == id) {                              
                                flag = true;
                                return reject("已经点赞");
                            }

                        })
                        if (count > 3) {                           
                            return reject("今日点赞超过3次，请明日再来");
                        }
                        if (!flag) {                            
                            return resolve("点赞成功");
                        }

                    }


                }).catch(function(err) {
                   return resolve(err);

                });



            })


        }




    }　　　
    return function() {
        return new Votehandle();
    }　

    　
});
