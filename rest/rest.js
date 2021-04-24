var unirest = require('unirest');
unirest
  .post('http://mockbin.com/request')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send({ "parameter": 23, "foo": "bar" })
  .then((response) => {
    console.log(response.body)
  })