window.day = new Date();


JIJIEMAP = {
    chun: 'ying',
    xia: 'he',
    qiu: 'ju',
    dong: 'mei'
}


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function weekDays(current) {
    var week= new Array(); 
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() +1));
    for (var i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        ); 
        current.setDate(current.getDate() +1);
    }
    return week; 
}

function monDay(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff));
}

function weekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

function closeOther(ids, current) {
    ids.forEach(function (id) {

        if (id === current) {
            return
        }

        var x = document.getElementById(id);

        x.style.display = "none";
    })
}

function toggleWechat () {
    var x = document.getElementById("wx");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function useWechat () {
    var wechat = document.getElementById("wechat");
    var alipay = document.getElementById("alipay");
    var wechatImage = document.getElementById("wechat-qrcode-image");
    var alipayImage = document.getElementById("alipay-qrcode-image");

    wechat.classList.add("active")
    alipay.classList.remove("active")

    wechatImage.style.display = "block"
    alipayImage.style.display = "none"
} 

function useAlipay () {
    var wechat = document.getElementById("wechat");
    var alipay = document.getElementById("alipay");
    var wechatImage = document.getElementById("wechat-qrcode-image");
    var alipayImage = document.getElementById("alipay-qrcode-image");

    alipay.classList.add("active")
    wechat.classList.remove("active")

    wechatImage.style.display = "none"
    alipayImage.style.display = "block"
} 

function toggleById(ids, id) {
    closeOther(ids, id)

    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function next() {
    window.day.setDate(window.day.getDate() + 1);
    window.year = window.day.getFullYear()
    render(window.day)
}

function today() {
    var today = new Date()
    window.year = today.getFullYear()
    render(today);
}

function last() {
    window.day.setDate(window.day.getDate() - 1);
    window.year = window.day.getFullYear()
    render(window.day)
}

function setContentP (content) {
    if (content instanceof Array) {
        var ps = content
    } else {
        var ps = content.split('\n');
    }
    var root = document.getElementById("pcontent");

    root.innerHTML = '';

    for (var i in ps) {
        var p = ps[i]
        var element = document.createElement('p');
        var text = document.createTextNode(p);
        element.appendChild(text);
        root.appendChild(element);
    }
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.abs(Math.round((second-first)/(1000*60*60*24)));
}

function getJijie (today) {
    var year = today.getFullYear();
    var midYear = new Date(year, 05, 30)

    if (today > midYear) {
        var cf = new Date(year + 1, 02, calendar.getTerm(2019, 6));
        var dz = new Date(year, 11, calendar.getTerm(2019, 24));
    } else {
        var cf = new Date(year, 02, calendar.getTerm(2019, 6));
        var dz = new Date(year - 1, 11, calendar.getTerm(2019, 24));
    }

    var xz = new Date(year, 05, calendar.getTerm(2019, 12));
    var qf = new Date(year, 08, calendar.getTerm(2019, 18));

    var siJi = {
        cf: datediff(cf, today), 
        xz: datediff(xz, today), 
        qf: datediff(qf, today), 
        dz: datediff(dz, today)
    }

    var min = Math.min(siJi.cf, siJi.xz, siJi.qf, siJi.dz);

    if (min === siJi.cf) {
        return 'chun'
    } else if (min === siJi.xz) {
        return 'xia'
    } else if (min === siJi.qf) {
        return 'qiu'
    } else if (min === siJi.dz) {
        return 'dong'
    }
    return 'chun'
}

function getProgress (today) {
    var year = today.getFullYear();
    var firstDay = new Date(year, 0, 1)

    return datediff(today, firstDay) / 365 * 100;
}
