# elementz-fbgraph
A Facebook authentication module in elementz using fbgraph


# Function

**authenticate**
* token - facebook token
* fieldsArr - customized array of fields


**Example usage**

```javascript

var fb = require('elementz-fbgraph')
var token = 'fb-token-here';

fb.authenticate(token,['first_name','email'])
.then(function(result){
  console.log(result);
})


```
