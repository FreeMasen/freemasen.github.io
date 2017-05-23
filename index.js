(function() {
    var req = new XMLHttpRequest()
    req.onreadystatechange = function() {
        if (req.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText)
            let main = document.getElementById('main')
            for (i=0;i<json.length;i++) {
                var element = json[i]
                main.innerHTML += '<li><h3>'+element[name]+'</h3><br><span>'+element[description]+'</span></li>'
             }
         }
     }
     req.open('get', 'https://robertmasen.com/github', true)
     req.send()
})()
