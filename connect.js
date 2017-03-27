/**
 * Created by kakawu on 2017/3/25.
 */
var http = require('http');
var parseUrl = require('url').parse;
var NEWS = {
	1: '这里是第一篇新闻内容',
	2: '这里是第二篇新闻内容',
	3: '这里是第三篇新闻内容'
};
function getNews(id){
	return NEWS[id] || '文章不存在';
}

var server = http.createServer(function(req,res){
	function send(html){
		res.writeHead(200,{
			'context-type': 'text/html;charset=utf-8'
		});
		res.end(html);
	}
	var info = parseUrl(req.url,true);
	req.pathname = info.pathname;
	req.query = info.query;

	if(req.url === '/'){
		send('<url>'+
			'<li><a href="/news?id=1">新闻一</a></li>'+
			'<li><a href="/news?id=2">新闻二</a></li>'+
			'<li><a href="/news?id=3">新闻三</a></li>'+
			'<url>');
	}else if (req.pathname ==='/news' && req.query.type ==='1') {
		send (getNews(req.query.id));
	}/*
	else if(req.url === '/news?id=1'){
		send(getNews(1));
	}else if(req.url === '/news?id=2'){
		send(getNews(2));
	}else if(req.url === '/news?id=3'){
		send(getNews(3));
	}*/
	else{
		send('<h1>文章不存在！</h1>');
	}


});
server.listen(3002);
