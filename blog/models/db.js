/**
 * Created by HuangZhiLong on 2015/1/31.
 *连接数据库对象
 */

//逗号分割参数，分号分割语句
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

//导出数据库连接对象
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {safe: true});