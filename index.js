const epxress = require('express');
const { sendMessage,getDTSG } = require('./FBClient.js');
const { ids, getMessage } = require('./friends.js');
const app = epxress();

async function run() {
   await getDTSG();
    for (var i = 0; i < ids.length; i++) {
        await sendMessage(ids[i],getMessage());
        
        await sleep(5000);
    }
}
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
 app.get('/run/', (req, res) => {
    run();
    res.send("Done!");
});
app.get('/', (req, res) => {
    res.send("Created by Thang with 💖 ");
});
app.get('/dtsg', (req, res) => {
    getDTSG();
    res.send("DTSG");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));