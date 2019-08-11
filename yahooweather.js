var OAuth = require('oauth');
var header = {
    "X-Yahoo-App-Id": "WQHZCn58"
};

var request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9ZUd1RHhuZHM5R0daJmQ9WVdrOVYxRklXa051TlRnbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWE5',
    '4fa3c83028ed268d22b313aa1f3053a42089b56c',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);
async function weather(location,next){
    return new Promise(function (resolve, reject) {
    request.get(
        `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${location}&format=json&lang=vi-vn&u=c`,
        null,
        null,
        function (err, data, result) {
            if (err) {
                console.log(err);
            } else {
                json = JSON.parse(data);
             
                var temp = Math.round((((json.forecasts[1].high + json.forecasts[1].low))/2)*10)/10;
               var str = `${json.location.city} có ${json.forecasts[1].text}, nhiệt độ TB: ${temp} ºC`;
               next(str);
               resolve(str);
            }
        }
    )})
}
module.exports = {
getWeather : async function (next) {

    var locations = ['hanoi,vn','hochiminh,vn','danang,vn'];
    var content = '----🌦Ngày mai🌦----\r\n';
    for(var i =0;i<locations.length;i++){
        await weather(locations[i],  function(data){
            content+=data+'\r\n';
        })
    }
     await next(content);
}
}