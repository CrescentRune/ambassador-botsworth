var HTTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
    var request = JSON.parse(this.req.chunks[0]);
    var checkInCmd = /^\!check\-in$/;
    var checkOutCmd = /^\!check\-out/;

    if (request.text && checkInCmd.test(request.text)) {
        //HANDLE CHECK IN REQUEST
        this.res.writeHead(200);
        postMessage('Hello!');
        this.res.end();
        
    }
    else if (request.text && checkOutCmd.test(reques.text)) {
        //HANDLE CHECK OUT REQUEST
        this.res.writeHead(200);
        postMessage('Goodbye!');
        this.res.end();
    }
    else {
        console.log("Msg ignored!");
        this.res.writeHead(200);
        this.res.end();
    }
}

function postMessage(response) {
    var botResponse, options, body, botReq;
  
    botResponse = response;
  
    options = {
      hostname: 'api.groupme.com',
      path: '/v3/bots/post',
      method: 'POST'
    };
  
    body = {
      "bot_id" : botID,
      "text" : botResponse
    };
  
    console.log('sending ' + botResponse + ' to ' + botID);
  
    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
          //neat
        } else {
          console.log('rejecting bad status code ' + res.statusCode);
        }
    });
  
    botReq.on('error', function(err) {
      console.log('error posting message '  + JSON.stringify(err));
    });
    botReq.on('timeout', function(err) {
      console.log('timeout posting message '  + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}

exports.respond = respond;