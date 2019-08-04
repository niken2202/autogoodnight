
var querystring = require('querystring');
var request = require('request');

const cookies = "sb=HaUyXQ0lPZtZmxADkydoTHhH; datr=HaUyXYVsxKsVSJn90X4kS6yn; locale=vi_VN; c_user=100030379368683; xs=17%3A2k81BAbQJoKySg%3A2%3A1564936253%3A2847%3A6307; fr=1lIuqY0XvdTB2RzYt.AWW6aO_a_tV7KAtyQoPA_-ymyVw.BdMqUd.vN.AAA.0.0.BdRwg9.AWXgqkBP; spin=r.1001017953_b.trunk_t.1564936254_s.1_v.2_;";

var header = {
    'Cookie': cookies,
    'Content-Type': 'application/x-www-form-urlencoded',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
};
var dtsg = 'AQHf6TI94Op8:AQHj73BJWw_V';
function doRequest(url,type,data) {
    return new Promise(function (resolve, reject) {
      request({
        headers: header,
        uri: url,
        method: type
    },function(req,res){
        dtsg = res.body.match('"token":"(.*?)"')[1];
        console.log(dtsg);
        resolve(dtsg);

    });
    });
  }
module.exports = {
    sendMessage: function (revceiveID, message) {

        var form = {
            body: message,
            fb_dtsg: dtsg,
            'ids[0]': revceiveID,
            waterfall_source: 'message',

        };
        var formData = querystring.stringify(form);
        //var contentLength = formData.length;

        return request({
            headers: header,
            uri: 'https://m.facebook.com/messages/send/?icm=1&refid=12',
            body: formData,
            method: 'POST'
        }, function (req, res) {
          
           console.log(res.statusCode);
           // console.log(`sent message : ${message} to id: ${revceiveID} successfully !`);
        });

    },

    getDTSG: async function () {
       return  doRequest('https://www.facebook.com/','GET','');
        
      /*   return await request({
            headers: header,
            uri: 'https://m.facebook.com',
            method: 'GET'
        }, function (req, res) {
            dtsg = res.body.match('<input type=\"hidden\" name=\"fb_dtsg\" value=\"(.*?)\" autocomplete=\"off\" \\/>')[1];
            console.log(dtsg);
        }); */

    }

}
