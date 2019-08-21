const epxress = require('express');
const { sendMessage, getDTSG, checkFriends, sendAudio } = require('./FBClient.js');
const { getWeather } = require('./yahooweather.js');
const { ids, getMessage } = require('./friends.js');
const app = epxress();
var timeStr = '23:30';
var date = new Date();
async function run() {
    await getDTSG(function (data) {
        console.log(data);
    });
    for (var i = 0; i < ids.length; i++) {
        var mess = await getMessage();
        await sendMessage(ids[i], mess);
        await sleep(5000);
    }
}

async function runSche() {
    while (true) {
        var now = date.getHours() + ':' + date.getMinutes();
        if (now == timeStr) {
            await run();
        }
        await sleep(30 * 1000);
    }

}
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

async function test() {
    await getDTSG(function (data) {
        console.log(data);
    });
    var mess = await getMessage();
    await sendMessage('100030379368683', mess);
}
async function check() {
    await getDTSG(function (data) {
        console.log(data);
    });
    for (var i = 0; i < ids.length; i++) {
        await checkFriends(ids[i]);
        await sleep(3000);
    }
    console.log("done");

}
runSche();
app.get('/time/', (req, res) => {
    var date = new Date();
    var current_hour = date.getHours();
    res.send(date.getHours() + ':' + date.getMinutes());
});
app.get('/run/', (req, res) => {
    run();
    res.send("Done!");
});
app.get('/', (req, res) => {
    res.send("Created by Thang with 💖 v2.1.2");
});
app.get('/dtsg', (req, res) => {
    getDTSG(function (next) {
        res.send(`dtsg : ${next}`);
    });

});
app.get('/weather', (req, res) => {
    getWeather(function (data) {
        res.send(` ${data}`);
    });
});
app.get('/test/', (req, res) => {
    test();
    res.send("OK");
});
app.get('/check/', (req, res) => {
    check();
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));