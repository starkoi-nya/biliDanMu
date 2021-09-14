
var http = require('http');
var url = require('url');
var roomId = '';

// 创建服务器
http.createServer(function (request, response) {

   //设置跨域标头
   response.setHeader("Access-Control-Allow-Origin", "*");
   response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
   response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
   response.setHeader("X-Powered-By", ' 3.2.1')
   response.setHeader("Content-Type", "application/json;charset=utf-8");

   // 设置 HTTP 头部 
   // HTTP 状态值: 200 : OK
   // 内容类型: application/json
   response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

   // 解析响应参数roomid
   roomIds = url.parse(request.url, true).query;
   roomId = roomIds.roomid;
   console.log('GET roomid=' + roomIds.roomid);

   // 构建地址
   var options = {
      host: 'api.live.bilibili.com',
      port: '80',
      path: '/xlive/web-room/v1/dM/gethistory?roomid=' + roomId + ''
   };

   //向屑站API获取json
   try {
      var request = http.request(options, function (response2) {
         // 不断更新数据
         response2.on('data', function (data) {
            //dataGet += data;
            response.write(data);
         });

         response2.on('end', function () {
            // 数据接收完成
            console.log('dataGet √');
            //完成发送
            response.end();
            console.log('dataSend √');
            console.log('--------------------');
         });
      });
      //完成请求
   request.end();
   } catch (error) {
      console.log('error');
      response.write('{"error":1}');
      response.end();
   }
   
   //监听8514端口
}).listen(8514);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8514/');
