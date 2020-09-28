
var client = ZAFClient.init();

$(function() {
  console.log('starting!!!!!!!!!!!');
  
  console.log(client);
  client.invoke('resize', { width: '100%', height: '120px' });

// client.get('ticket.requester.id').then(
  client.get('ticket.brand.id').then(
    function(data) {
      

      var user_id = data['ticket.brand.id'];
      requestUserInfo(client, user_id);
    }
  );


  client.on("api_notification.brand_notification", function(data) {
    var recieved_data = {
      'forms' : data.body
      
    }
    console.log('HE RECIBIDO ALGO!');
    console.log(data.body);
    console.log(data.body.forms);
    console.log(data.sender);
    //console.log(data.body, data.sender);
  
  });

  client.on("api_notification.event_name", function(data) {
    var recieved_data = {
      'forms' : data.body
      
    }
    console.log('HE RECIBIDO ALGO!');
    console.log(data.body);
    console.log(data.body.forms);
    console.log(data.sender);
    //console.log(data.body, data.sender);
  
  });



});






function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/brands/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };

  client.request(settings).then(
    function(data) {
      console.log('data');
      console.log(data);
      
      showInfo(data);
    },
    function(response) {
      console.log('response');
      console.log(response);
      showError(response);
    }
  );
}


function showInfo(data) {
  var requester_data = {
    'name': data.brand.name,
    'tags': data.brand.subdomain,
    'created_at': formatDate(data.brand.created_at),
    'last_login_at': formatDate(data.brand.last_login_at)
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}


function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}


function formatDate(date) {
  var cdate = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  date = cdate.toLocaleDateString("en-us", options);
  return date;
}
function requestzendesk_brand_id(brand_id){
  var settings = {
    url: '/api/v2/brands/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };

}

function call_forms() {
  //var client = ZAFClient.init();
  console.log('im calling forms');
  client.get('ticket.brand.name').then(
    function(data) {
      var brand_name = data['ticket.brand.name'];
      console.log('brand_name: ');
      console.log(brand_name);
      
    }
    );
}

