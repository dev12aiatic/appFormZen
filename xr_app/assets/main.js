
var client = ZAFClient.init();

$(function() {
  console.log('starting!!!!!!!!!!!');
  // window.onclick = function(event) {
  //   console.log('asdasdsadsahhh');
  //   if (!event.target.matches('.dropdown-toggle')) {
  //     var dropdowns = document.getElementsByClassName("dropdown-menus");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('is_visible')) {
  //         openDropdown.classList.remove('is_visible');
  //       }
  //     }
  //   }
  // }

  var monitor = setInterval(function(){
    var elem = document.activeElement;
    if(elem && elem.tagName == 'iframe_app_view_wrapper'){
        clearInterval(monitor);
        console.log('clicked!');
        alert('clicked!');
    }
}, 100);
  console.log(client);
  client.invoke('resize', { width: '100%', height: '100%' });

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

  client.on("api_notification.form_list", function(data) {
    var recieved_data = {
      'forms' : data.body
      
    }


    console.log('HE RECIBIDO ALGO!');
    console.log(data.body);
    console.log(data.body.forms_by_organization);
    console.log(data.sender);
   // var organizations=data.body.forms_by_organization
  //  var leng=Object.keys(data.body.forms_by_organization).length
   // console.log(leng);
    var obj=data.body.forms_by_organization
    localStorage.setItem('orglist', JSON.stringify(obj));
  //  localStorage['orglist'] = obj; // only strings
   
   // var btnbutton = document.createElement('button');
  //  button.innerHTML = 'click me';
    // button.onclick = function(){
    //   // alert('here be dragons');return false;
    //   console.log('boton presionado');

    // };

    // where do we want to have the button to appear?
    // you can append it to another element just by doing something like
    // document.getElementById('foobutton').appendChild(button);
   // document.body.appendChild(button);
    // var btn = document.createElement("a");
    // btn.innerHTML="click";
    //     var t = btn.setAttribute("href","https://www.google.com");
    // btn.setAttribute("target","_blank");
    //     document.body.appendChild(btn);

    // btn.onclick=function(e){
    // alert('You have clicked me..');
    // }
    // document.body.appendChild(btn); // Append <button> to <body>
   

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
// var items = document.querySelectorAll('.list-class li');
// item.addEventListener('click', function(){}


function call_forms() {
  //var client = ZAFClient.init();
  console.log('im calling forms');
  client.get('ticket.brand.name').then(
    function(data) {
      var brand_name = data['ticket.brand.name'];
      console.log('brand_name: ');
      console.log(brand_name);
      //var obj = localStorage['orglist'];
     // var obj = localStorage.getItem('orglist');
      var obj = JSON.parse(localStorage.getItem('orglist'));
      console.log('-------------------------');
      console.log(obj);
      console.log('-------------------------');
      // var selectElement = document.getElementById("id_select");
      //   while (selectElement.length > 0) {
      //     selectElement.remove(0);
      //   }
          
      var is_visible = document.getElementById("ulist");
      is_visible.classList.toggle("is_visible");
      for (const [ key, value ] of Object.entries(obj)) {
        // do something with `key` and `value`
       // console.log(value);
        var length_form=value.length
        var newobj=value
        var i=0
        if (brand_name==key)
          {
        ulist = document.getElementById("ulist");
        console.log(ulist);
        document.querySelectorAll('.li').forEach(function(a){
          a.remove()
          })}
        for (const [ key1, value1 ] of Object.entries(newobj)) {
          
          console.log('*************');
            if (brand_name==key)
          {
            
            var list = document.createElement('li');
            list.setAttribute("class","li")
            var link_a = document.createElement('a');
            link_a.innerHTML=value1.name
            link_a.setAttribute("href","https://www.google.com")
            link_a.setAttribute("target","_blank");
            list.appendChild(link_a)
            ulist.appendChild(list)
          }
        
        }
        
        
    }
      
      
    }
    );
}


