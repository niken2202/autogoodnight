
var puppeteer = require('puppeteer');
var querystring = require('querystring');
var request = require('request');
//const cookies = "sb=HaUyXQ0lPZtZmxADkydoTHhH; datr=HaUyXYVsxKsVSJn90X4kS6yn; m_pixel_ratio=1; locale=en_US; c_user=100030379368683; xs=13%3AbWiVHr4FuO8aVw%3A2%3A1565455294%3A2847%3A6307; spin=r.1001044525_b.trunk_t.1565455295_s.1_v.2_; x-referer=eyJyIjoiL2hvbWUucGhwIiwiaCI6Ii9ob21lLnBocCIsInMiOiJtIn0%3D; fr=1lIuqY0XvdTB2RzYt.AWVvxINGD1Q1FutpbrfOQORxEwY.BdMqUd.vN.AAA.0.0.BdT-Iw.AWUjad6g;";


var header = {
    //   'Cookie': cookies,
    'Content-Type': 'application/x-www-form-urlencoded',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
};

var page;
var dtsg = '';
var browser;
async function init(type){
    switch(type){
        case 1:  
            await setCookies();
        break;
        case 0: if (browser != null) {
            await browser.close();
            console.log("close browser");
        }
        break;
    }
}
async function setCookies() {
    console.log("Launching browser...");
    browser = await puppeteer.launch();
    const url = 'https://www.facebook.com';
    page = await browser.newPage();
    await page.goto(url);
    var domain = 'https://m.facebook.com'
    const cookies = [{
        'url': domain,
        'name': 'sb',
        'value': 'HaUyXQ0lPZtZmxADkydoTHhH'
    }, {
        'url': domain,
        'name': 'datr',
        'value': 'HaUyXYVsxKsVSJn90X4kS6yn'
    }, {
        'url': domain,
        'name': 'c_user',
        'value': '100030379368683'
    }, {
        'url': domain,
        'name': 'xs',
        'value': '13%3AbWiVHr4FuO8aVw%3A2%3A1565455294%3A2847%3A6307'
    }, {
        'url': domain,
        'name': 'spin',
        'value': 'r.1001044928_b.trunk_t.1565588171_s.1_v.2_'
    }, {
        'url': domain,
        'name': 'fr',
        'value': '1lIuqY0XvdTB2RzYt.AWUR2BNAE4KtVTcqzthsNonh4Mw.BdMqUd.vN.AAA.0.0.BdUTc3.AWV9Mlou'
    }];
    await page.setCookie(...cookies);
    const cookiesSet = await page.cookies(url);

}
setCookies();

async function sendData(formData, type, url,next) {
    await page.setRequestInterception(true);
    page.on("request", interceptedRequest => {
        interceptedRequest.continue({
            method: type,
            postData: formData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
    });
    const response = await page.goto(url);
    const responseBody = await response.text();
    next(responseBody);
   // await page.setRequestInterception(false);
  //  console.log(responseBody);
}

function doRequest(url, type, data, next) {
    return new Promise(function (resolve, reject) {
        request({
            headers: header,
            uri: url,
            method: type
        }, function (req, res) {
            dtsg = res.body.match('"token":"(.*?)"')[1];
            console.log(dtsg);
            // next(dtsg);
            resolve(dtsg);

        });
    });
}
function sendRequest(head, formData, url, type, result) {
    return new Promise(function (resolve, reject) {
        request({
            headers: head,
            uri: url,
            method: type,
            body: formData
        }, function (req, res) {
            result(res.body);
            resolve(res);
        });
    });
}
module.exports = {
    sendMessage: async function (revceiveID, message) {
        await init(1);
        var form = {
            body: message,
            fb_dtsg: dtsg,
            'ids[0]': revceiveID,
            waterfall_source: 'message',
            jazoest: 22080,
            // sticker_id: '2041011569459650'

        };
        var formData = querystring.stringify(form);
        var url = 'https://m.facebook.com/messages/send/?icm=1&refid=12';
        await sendData(formData, 'POST', url,function(data){

            if(data.includes('<title>Error</title>')){
                console.log(data);
            }else{
                console.log(` ${revceiveID}`);
            }
        });
       await init(0);
    },

    getDTSG: async function (next) {
        
        const response = await page.goto('http://m.facebook.com');
        const responseBody = await response.text();
        dtsg = responseBody.match('"token":"(.*?)"')[1];
        console.log(dtsg);
        next(dtsg);
        
    },
    getWeather: async function (next) {
        var url = 'https://api.weather.com/v2/turbo/vt1dailyForecast';
        var form = {
            apiKey: 'd522aa97197fd864d36b418f39ebb323',
            format: 'json',
            geocode: '10.77,106.7',
            language: 'vi-VN',
            units: 'm',

        };
        var formData = querystring.stringify(form);
        return await sendRequest('', formData, url, 'GET', async function (result) {
            //  var cap = data.day.phrase[1];
            await next('Ngày mai ' + data);
        });
    },
    checkFriends: async function (id) {

        console.log('checking ' + id);
        return sendRequest(header, '', 'https://www.facebook.com/' + id, 'GET', function (result) {

            if (!result.includes('img sp_b5lOLcZ0oBP sx_a2da72"><u>Friend</u>')) {
                console.log(id + "unfriend xxxxx");
            }
        });
    }
}
