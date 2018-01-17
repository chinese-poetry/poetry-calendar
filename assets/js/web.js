window.day = 0;

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
    var today = new Date();
    var nextDay = new Date();
    nextDay.setDate(today.getDate() + window.day + 7);
    window.day = window.day + 7
    render(nextDay)
}

function today() {
    render(new Date());
}

function last() {
    var today = new Date();
    var nextDay = new Date();
    nextDay.setDate(today.getDate() + window.day - 7);
    window.day = window.day - 7
    render(nextDay)
}
