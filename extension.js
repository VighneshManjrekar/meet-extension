chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0]
    document.querySelector("#startScript").addEventListener('click', () => {
        chrome.tabs.sendMessage(activeTab.id, { command: "run-script" });
    })
})

chrome.runtime.onMessage.addListener((msg, sender, res) => {
    if (msg.command == 'run-complete') {
        document.querySelector("#attendance-list").innerHTML = '';
        document.querySelector("#attendance-list").style.display = "block";
        document.querySelector("#copyJson").style.display = "block";
        msg.data.forEach(m => {
            console.log(m);
            const p = document.createElement('p');
            const pText = document.createTextNode(m);
            p.setAttribute('class', 'student')
            p.appendChild(pText)
            document.querySelector("#attendance-list").appendChild(p);
        })
        console.log(msg.jsonData)
        navigator.clipboard.writeText(msg.jsonData)
    }
})