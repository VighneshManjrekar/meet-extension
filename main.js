const getToday = () => {
    let date = new Date()
    let day = `0${date.getDate()}`.slice(-2);
    let month = `0${date.getMonth() + 1}`.slice(-2);
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
chrome.runtime.onMessage.addListener((msg, sender, res) => {
    if (msg.command == "run-script") {
        document.querySelector('button[aria-label="Show everyone"]').click();
        const scrollBtn = document.querySelector("#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.R3Gmyc.qwU8Me > div.WUFI9b > div.hWX4r > div.ggUFBf.Ze1Fpc");
        if (scrollBtn) {
            scrollBtn.scrollTop = scrollBtn.scrollHeight;
        }
        const nl = document.querySelectorAll('[role="listitem"]');
        const nlArray = Array.from(nl)
        const attendanceArr = []
        const jsonArray = []
        nlArray.forEach(n => {
            const date = getToday();
            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const name = n.innerText.split('\n')[0];
            const eachObj = {
                date,
                time,
                name: name
            }

            attendanceArr.push(name)
            jsonArray.push(eachObj)

        })
        const attendanceJSON = JSON.stringify(jsonArray)
        console.log(attendanceJSON);
        console.log(attendanceArr);

        chrome.runtime.sendMessage({ command: 'run-complete', data: attendanceArr, jsonData: attendanceJSON })
    }
})
