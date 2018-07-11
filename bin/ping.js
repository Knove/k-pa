const request = require('request');

module.exports = function ping(url,t) {
    t = t||5;
    console.log("try to connected to " + url + "/ "+ t +" times");
    let reNum = 0;
    pingTo(url,t, reNum, t||5);
    
}

function pingTo(url,t,reNum,allT){
    const nowTime = new Date(); // 计算时间
    request
  .get(url)
  .on('response', function(response) {
    reNum++;
    console.log("From "+ url + " | response: " + response.statusCode +". cost time " + (new Date() - nowTime) + "ms"); // 200
  })
  .on('error', function(err) {
    console.log("ERROR: " + err);
  })

  t>1 ? setTimeout(()=>{
    pingTo(url, --t, reNum,allT)
  },1000)
  :
  setTimeout(()=>{
    total(allT, reNum );
  },1100)
  
}
function total(t, reNum) {
    console.log("data package: send = " + t + ", reponse = "+reNum+ ", loss:" + (t-reNum) + "(" + ((reNum/t) * 100) +"%)");
    


}