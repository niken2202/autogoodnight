var moment = require('moment-timezone');
var message= [
"Hmmm... {time} rồi, đi ngủ thôi. Ngủ ngon nhé ! ;) ",
"Bây giờ là {time}, đến giờ đi ngủ rồi cậu ơi, ngủ ngon nhé ;)",
"Khuya rồi đấy, {time} rồi, đi ngủ thôi ;)",
'Nếu bạn ngủ bây giờ lúc {time}, thì sáng mai bạn sẽ dậy lúc 7:00 mà vẫn ko mệt ;) ngủ ngon nhé ;)',
'Lại đến giờ đi ngủ rồi, ngủ ngon nhé ;)',
'Mỗi tối giờ này {time}, lại được chúc ngủ ngon <3',
'Thấy bảo thức khuya mau già, {time} rồi đấy, ngủ đi cậu ơi. ;)',
'Trăng lên đỉnh núi trăng tà \r\nThấy tin nhắn tớ, là đến giờ đi ngủ 😂',
'Bây giờ là {time}, đi ngủ cho đời bớt nhạt nào...<3',
'Ngủ ngon nhé ;), hẹn gặp vào ngày mai <3',
'Cậu có thấy {time} là muộn rồi ko ? nếu có thì đi ngủ thôi nhỉ ...',
'E hèm, Thắng đây, đi ngủ thôi,{time} rồi! <3',
'Hmmm... Ngủ ngon.. tớ lại sẽ chúc ngủ ngon vào giờ này {time} ngày mai :D'
];

module.exports ={
    ids: [


        100002792229405
        ,
        
        100003604218095
        ,
        
        100004084606664
        ,
        
        100004093957947
        
        
        100004641033025
        ,
        
        100005124067761
        ,
        
        100005249413387
        ,
        
        100005299982979
        ,
        
        100005712708600
        ,
        
        100005851783704
        ,
        
        100005915289249
        ,
        
        100005962411708
        ,
        
        100005987747643
        ,
        
        100007437002440
        ,
        
        100007544979845
        ,
        
        100007574402195
        ,
        
        100007726201254
        ,
        
        100007898178740
        ,
        
        100008024957517
        ,
        
        100008429741332
        ,
        
        100008461279109
        ,
        
        100008703528249
        ,
        
        100008809720872
        ,
        
        100008962062885
        ,
        
        100008973167586
        ,
        
        100009053391532
        ,
        
        
        100010856615735
        ,
        
        100011056934021
        ,
        
        100011444015314
        ,
        
        100012522429700,
        100013173130341,
        100013283652609,
        100014673376700,
        100014934463389,
        100018393947315,
        100018394757373
        ,
        100018532007970
        ,
        100021621785179
        ,
        100022169553957
        ,
        100023029777840
        ,
        100025120510654
        ,
        100025172011791
        ,
        100025771506638
        ,
        100026621236378
        ,
        100026766220389
        ,
        100027620956013
        ,
        100027875588410
        ,
        100028176860964
        ,
        100028233190695
        ,
        100028322028910
        ,
        100029636344131
        ,
        100030398709156
        ,
        
        100030649745108
        ,
        
        100033114706234
        ,
        
        100034625802080
        ,
        
        100035740841422
        ,
        
        100036052564287
        
    ],
    getMessage: function(){
        var offset = '+7'
        var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));
    var time = nd.getHours()+ ':'+ nd.getMinutes()+':'+nd.getSeconds();
        return message[Math.floor(Math.random() * message.length)].replace('{time}',time);
    }
}
