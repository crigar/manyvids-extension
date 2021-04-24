// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
    
    
    //POST

    for (var i = 1; i < 2; i++) {
      console.log(i)
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://www.manyvids.com/Feed/api/follow/fetch/followers?userId=214657&filter=-1&sort=-1&page="+i+"&limit=30&apikey=CrPL%2BqA90l8JZGlzcfg9aoOQxEcbE3U2%2FsneXupkAL6U77TSJJQBC4cWfBgthnxX", true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          // JSON.parse does not evaluate the attacker's scripts.
          var resp = JSON.parse(xhr.responseText);
          console.log("get")
          console.log(resp.data.length)
          for (var i = 1; i < resp.data.length; i++) {
            var xhr1 = new XMLHttpRequest();
            var element = resp.data[i];
            console.log(element)
            var formData = new FormData();

            formData.append("followerId", 1004647801);
            formData.append("leaderId", element.user.id);
            formData.append("apikey", "CrPL+qA90l8JZGlzcfg9aoOQxEcbE3U2/sneXupkAL6U77TSJJQBC4cWfBgthnxX");
            formData.append("mvtoken", "6080a89ed1961960034458"); 
            
            xhr1.open("POST", "https://www.manyvids.com/Feed/api/follow");

            
            xhr1.send(formData);
          }


          
          
        }
      }
      xhr.send();
      
    }


    
}