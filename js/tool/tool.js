               define(function(require) {
                   function getLoacalUrl() {
                       url = "http://tp.flyfund7.com/motherday24/";
                       return url;
                   };

                   function getQueryString(name) {
                       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                       var r = window.location.search.substr(1).match(reg);
                       if (r != null) return unescape(r[2]);
                       return null;
                   };

                   function toReLoadWithNewToken() {
                       var lourl=getLoacalUrl();
                       var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf166b3a749aaf36f&redirect_uri="+lourl+"&response_type=code&scope=snsapi_base#wechat_redirect";
                       window.location.href = url;
                   }

                   function getTimeNYR() {
                       var data = new Date();
                       return data.getFullYear() + "" + (data.getMonth() + 1) + "" + data.getDate();
                   }

                   function sortDate(data) {
                      return  data.sort(function(a, b) {
                               var x = a['lover'];
                               var y = b['lover'];
                               return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                             })

                   }

                   return {
                       toreload: toReLoadWithNewToken,
                       getquerystring: getQueryString,
                       getTimenyr: getTimeNYR,
                       getLoacalUrl: getLoacalUrl,
                       sortDate: sortDate
                   };


               })
