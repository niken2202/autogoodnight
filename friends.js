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
    ids: [100003579241464,
        100030379368683
    ],
    getMessage: function(){
        var time =moment().utcOffset('+7:00').format('HH:mm:ss');
        return message[Math.floor(Math.random() * message.length)].replace('{time}',time);
    }
}
