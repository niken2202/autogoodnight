
var querystring = require('querystring');
var request = require('request');

const cookies = "sb=HaUyXQ0lPZtZmxADkydoTHhH; datr=HaUyXYVsxKsVSJn90X4kS6yn; c_user=100030379368683; xs=36%3AhBGqRLm_7t2M_w%3A2%3A1564204471%3A2847%3A6307; spin=r.1001017703_b.trunk_t.1564816752_s.1_v.2_; fr=1lIuqY0XvdTB2RzYt.AWUTFXKzcerFDELyzAkuEL4suJ8.BdMqUd.vN.AAA.0.0.BdRTVy.AWUl_oc0;";

var header = {
    'Cookie': cookies,
    'Content-Type': 'application/x-www-form-urlencoded',
    'user-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.7.12) Gecko/20050915 Firefox/1.0.7'
};
var dtsg = '';
function doRequest(url,type,data) {
    return new Promise(function (resolve, reject) {
      request({
        headers: header,
        uri: url,
        method: type
    },function(req,res){
        dtsg = res.body.match('<input type=\"hidden\" name=\"fb_dtsg\" value=\"(.*?)\" autocomplete=\"off\" \\/>')[1];
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
           // console.log(res);
            console.log(`sent message : ${message} to id: ${revceiveID} successfully !`);
        });

    },

    getDTSG: async function () {
       return  doRequest('https://m.facebook.com','GET','');
        
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
