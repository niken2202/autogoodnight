var moment = require('moment-timezone');
const { getWeather} = require('./yahooweather.js');

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
'Hmmm... Ngủ ngon.. tớ lại sẽ chúc ngủ ngon vào giờ này {time} ngày mai :D',
'Đến giờ nhận quà... Bây giờ là {time}.. đến giờ ngủ nhỉ :3',
'Có 1 sự thật là thời gian ngủ của mèo chiếm 2/3 cuộc đời của nó, đến giờ ngủ của cậu rồi, ngủ ngon <3',
'Trung bình 1 người mất 14 phút để đi vào giấc ngủ, cậu có vậy ko ? đến giờ đi ngủ rồi đấy ;)',
'Nếu cậu mất ngủ thì cậu biết cậu bị mắc chứng bệnh gì ko ? Bệnh tương tư đấy, thôi ngủ ngon nhé ;)',
'Bạn nghĩ những người mù bẩm sinh thì người ta sẽ mơ thấy gì ? Thôi bỏ qua đi, tớ đến chúc ngủ ngon thôi <3',
'Nghiên cứu cho thấy nếu cậu ngủ mà mơ về tớ thì cậu sẽ ngủ ngon hơn :P, ngủ ngon nhé!',
'Cậu có biết là từ 12h đến 2h là thời gian vàng để ngủ ko? Cậu đi ngủ đi, {time} rồi đấy ;)',
'Ngủ đi cậu ơi, cậu tương tư à ? {time} rồi đấy',
'Lại gặp nhau rồi, có duyên nhỉ ? đi ngủ thôi cậu, giờ là {time} rồi đấy ;)',
'Cậu có biết người ta chúc ngủ ngon một người dễ thương như thế nào ko, cậu đang đọc nó đấy ;) ngủ ngon nhé ',
'Thấy bảo đến giờ chúc bé ngủ ngon rồi, Goodnight ! <3',
'Lại gặp nhau rồi, đến giờ đi ngủ rồi dấy ;) ngủ ngon nhé',
'Ngủ sớm giữ gìn sức khoẻ cậu ơi... Goodnight ;)',
'Cậu đọc xong dòng này rồi đi ngủ được ko? Ngủ ngon nhé ;)',
'Hình như cậu quên điều gì ko ? đi ngủ đấy, ngủ ngoan mơ đẹp nhé ;)',
'ღ.ღ.ღ.ღ ♫♫ . . • . .\r\n. . • . . . I . . . • . .\r\n. . • . . . . ღ.ღ\r\n.❤♫♫ . • . Love . • ….\r\n. ☆ . ღ.ღ . • . . . .\r\n❤♫♫❤.. • .. ☆ .You .. .\r\n(¯`v´¯) <3 . .. .. .`•.¸.•´ * . • . . ¸.•... ´¸.•´¨) ¸.•*¨) . . . Giơ tay lên! Cướp đây! Leo lên giường! Nằm xuống! Nhắm mắt lại! Chúc  ngủ ngon nhé!',
'Thường thì người ta chúc ngủ ngon xong rồi hôn nhẹ 1 cái lên trán, nhưng tớ với cậu hơi xa nên tớ chỉ chúc ngủ ngon thôi, tiếc nhỉ, ngủ ngoan ;)',
'Ê nhóc, đi ngủ nào {time} rồi. ngủ ngoannnn ;)',
'Một nhà tiên tri người Hàn bảo gửi cái này cho cậu : 좋은 밤, 나의 연인, 오늘 밤 너에게 행복과 웃음으로 가득 찬 꿈을 바란다. ;)',
'Vũ. có "Đông kiếm em" còn tớ đến giờ ngủ lại đi kiếm câụ. ngủ ngon nhé ;)',
'Ngủ sớm nào cậu ơi. ngủ ngon nhé :3',
'Hmmmm.. cậu biết rồi đấy... đến giở đi ngủ... {time} rồi, good night <3',
'Đi ngủ nhỉ, cậu thích mơ về cái gì nào... Ngủ ngon nhé ;)',
'Luôn để tớ phải nhắc nhé.. đi ngủ thôi {time} rồi',
'Nếu bạn mất nhiều hơn 5 phút để ngủ, thì bạn đã mất ngủ đấy... Thôi ngủ ngon nhé ;) muộn rồi đấy',
'Giờ là {time} rồi, ngủ để đảm bảo sức khoẻ nhé, ngủ ngon <3',
'Thấy bảo có người chúc ngủ ngon thì sẽ dễ ngủ hơn, tớ đến để giúp cậu đây, ngủ ngon nhé ;)',
'Cậu ko phiền nếu tớ chúc ngủ ngon cậu mỗi tối chứ ? ngủ ngon nhé ;)',
'Lại đến giờ rồi, đi ngủ để giữ gìn nhan sắc cậu ơi. ;)',
'Hmm... lại đến giờ ngủ rồi... Hôm qua cậu mơ gì vậy, tối nay ngủ ngon mơ đẹp nhé <3',
'ngủ ngon mơ đẹp nhé',
'Chào cậu, đến giờ đi ngủ rồi đấy, good night',
'Cậu tối qua mơ gì, giờ đi ngủ để mơ tiếp nào :3',
'Cậu có phiền nếu tớ tiếp tục chúc cậu ngủ ngon ;), ngủ thôi nào',
'Đến cuối ngày chúng ta lại gặp nhau, đi ngủ cậu ơi <3',
'Tí nữa thì quên chúc ngủ ngon, cậu ngủ ngon nhé',
'Lại suýt quên chúc ngủ ngon, おやすみなさい <3',
'Thôi nghỉ đi nào, đi ngủ đảm bảo sức khởe, cậu ngủ ngon nhé ;)',
'Ngủ thôi cậu ơi.. hehe',
'Hi, ngủ ngon nhé <3',
'Lại là anh đây, ngủ ngon nhé ;)',
'Nào nào, đi ngủ thôi còn đợi gì nữa... <3',
'Đi ngủ thôi em ơi =)) ;)',
'Ngủ thôi nào, chúc ngủ ngon <3',
'Cuộc sống nếu chán quá thì đi ngủ nhé cậu, chúc ngủ ngon ;)',
'Nếu ko phiền tớ sẽ tiếp tục gửi tin nhắn cho cậu ;)',
'Hôm nay thế nào, đến giờ ngủ thôi <3',
'Thả lỏng cơ thể sẽ giúp cậu ngủ tốt hơn, ngủ ngon nhé :D',
'Ngủ ngon cậu ơi :D'
];
var weather ='';
   
 getWeather(function(content){
    weather=content;
    
        });
module.exports ={
    ids: [
"100004084606664",
"100004641033025",
"100005124067761",
"100005299982979",
"100005962411708",
"100005987747643",
"100007437002440",
"100007574402195",
"100007726201254",
"100007898178740",
"100008024957517",
"100008429741332",
"100005712708600",
"100008461279109",
"100008703528249",
"100008809720872",
"100008962062885",
"100010856615735",
"100009854851642",
"100011056934021",
"100011444015314",
"100012522429700",
"100013173130341",
"100013283652609",
"100006800648050",
"100014673376700",
"100014934463389",
"100018393947315",
"100018394757373",
"100018532007970",
"100021621785179",
"100023029777840",
"100025120510654",
"100025172011791",
"100025771506638",
"100026766220389",
"100027875588410",
"100028233190695",
"100028322028910",
"100029636344131",
"100034625802080",
"100008159195005", 
"100003604218095",
"100009414846439",
"100005249413387",
"100003689786391",
"100004093957947",
"100004166920758",
"100008313584756",
    ],
    getMessage: async function(){
        var offset = '+7'
        var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset

    var nd = new Date(utc + (3600000*offset));
    var time = nd.getHours()+ ':'+ nd.getMinutes()+':'+nd.getSeconds();
    var mess = message[Math.floor(Math.random() * message.length)].replace('{time}',time)+'\r\n'+weather;
    console.log(mess);
        return mess ;
    },

}
