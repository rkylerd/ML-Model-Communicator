let express = require('express')
let request = require("request");
let cors = require('cors');
let bodyParser = require('body-parser')

let port = process.env.PORT || 3000;
let app = express();

app.use( bodyParser.json() ); 
app.use(cors());
app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}));
});

app.post('/donations', function (req, res) {
    console.log('request body', req.body);

    let data = {
        "Inputs": {
          "input1": {
            "ColumnNames": [
              "auto_fb_post_mode",
              "category",
              "currencycode",
              "standard_goal",
              "title",
              "description",
              "has_beneficiary",
              "visible_in_search",
              "country_code",
              "is_charity",
              "charity_name",
              "average_donation"
            ],
            "Values": [
              [
                req.body.auto_fb_post_mode,
                req.body.category,
                req.body.currencycode,
                req.body.standard_goal,
                req.body.title,
                req.body.description,
                req.body.has_beneficiary,
                req.body.visible_in_search,
                req.body.country_code,
                req.body.is_charity,
                req.body.charity_name,
                "0"
              ]
            ]
          }
        },
        "GlobalParameters": {}
      }

    var options = {
        'method': 'POST',
        'url': 'https://ussouthcentral.services.azureml.net/workspaces/b92834cfb7574597a60a7f87d4f8a2a1/services/e2ff5412a5fa4ccab2ad28463eec4d32/execute?api-version=2.0&details=true',
        'headers': {
        'Authorization': 'Bearer /nf3DsBN2sVTv3VjmOaVLiT3FyIatG/6XcjSwMrANfPLlHKZrgrunIPDwiFrSB4Ma2g4F2gBZgwz4Li8ysf3YQ==',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    request(options).pipe(res);

})

app.post('/donators', function (req, res) {
    console.log('DONATOR request body', req.body);
    let data = {
        "Inputs": {
          "input1": {
            "ColumnNames": [
              "auto_fb_post_mode",
              "category",
              "currencycode",
              "standard_goal",
              "donators",
              "title",
              "description",
              "has_beneficiary",
              "visible_in_search",
              "country_code",
              "is_charity",
              "charity_name"
            ],
            "Values": [
              [
                req.body.auto_fb_post_mode,
                req.body.category,
                req.body.currencycode,
                req.body.standard_goal,
                "0",
                req.body.title,
                req.body.description,
                req.body.has_beneficiary,
                req.body.visible_in_search,
                req.body.country_code,
                req.body.is_charity,
                req.body.charity_name,
              ]
            ]
          }
        },
        "GlobalParameters": {}
      }
      let donatorsAPIKey = 'XZLgh8Ya7WxGASBK70xnV/Vd8k9VxSIJedOiNT/5g8LXxIktDjuqb+Esy9jJNbw/TY2elSZnwUbnZPscQvkCAA==';
    let donatorsURL = 'https://ussouthcentral.services.azureml.net/workspaces/b92834cfb7574597a60a7f87d4f8a2a1/services/35b9f80f853f4775bd501bd2fa3553f2/execute?api-version=2.0&details=true';

    var options = {
        'method': 'POST',
        'url': donatorsURL,
        'headers': {
        'Authorization': 'Bearer ' + donatorsAPIKey,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    request(options).pipe(res);

})

app.listen(port, function () {
 console.log(`Example app listening on port ${port}!`);
});