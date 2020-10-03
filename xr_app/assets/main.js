
var client = ZAFClient.init();
var domain_
var petition_list=[]
function loadConfigFile() {
  $.getJSON('settings.json', function(jd) {
      //(jd.domain) //now available!;
      domain_=jd.domain

  });
 
};

$(function() {
  loadConfigFile()
  console.log('starting!!!!!!!!!!!');
  client.invoke('resize', { width: '300px', height: '500px' });

  client.on("api_notification.brand_notification", function(data) {
    var recieved_data = {
      'forms' : data.body
      
    }
    console.log('HE RECIBIDO ALGO!');
    //(data.body);
    //(data.body.forms);
    //(data.sender);  
  });
  client.on("api_notification.form_list", function(data) {
    var recieved_data = {
      'forms' : data.body
    }
    console.log('Recibiendo listado de forms y almacenandolo en cache');
    var obj=data.body.forms_by_organization
    localStorage.setItem('orglist', JSON.stringify(obj));

  });



});



function call_forms(){
  sessionStorage.clear();
  $.when( 
client.get('ticket.id').then(
  function(data) {
    var ticket = data['ticket.id'];
    //('ticket.id',ticket);
    sessionStorage.setItem('ticket.id', ticket);
   
  },function(response) {
    console.error('error');
  }
).then(client.get('ticket.requester.name').then(
  function(data) {
    var ticket =data['ticket.requester.name'];
    //('ticket_requester',ticket);
    sessionStorage.setItem('ticket.requester.name', ticket);
   
  },function(response) {
    console.error('error');
  }
)).then(client.get('ticket.assignee.user.name').then(
  function(data) {
    var ticket =data['ticket.assignee.user.name'];
    //('ticket.assignee.user.name',ticket);
    sessionStorage.setItem('ticket.assignee.user.name', ticket);
  },function(response) {
    console.error('error');
  })).then(client.get('ticket.status').then(
    function(data) {
      var ticket =data['ticket.status'];
      //('ticket.status',ticket);
      sessionStorage.setItem('ticket.status', ticket);
      //return makesomething()
    },function(response) {
      console.error('error');
    }))).then(client.get('ticket.title').then(
      function(data) {
        var ticket =data['ticket.title'];
        //('ticket.title',ticket);
        sessionStorage.setItem('ticket.title', ticket);
        //return makesomething()
      },function(response) {
        console.error('error');
      })).then(client.get('ticket.description').then(
        function(data) {
          var ticket =data['ticket.description'];
          //('ticket.description',ticket);
          sessionStorage.setItem('ticket.description', ticket);
          //return makesomething()
        },function(response) {
          console.error('error');
        })).then(client.get('ticket.priority').then(
          function(data) {
            var ticket =data['ticket.priority'];
            //('ticket.priority',ticket);
            sessionStorage.setItem('ticket.priority', ticket);
            //return makesomething()
          },function(response) {
            console.error('error');
          })).then(client.get('ticket.group.name').then(
            function(data) {
              var ticket =data['ticket.group.name'];
              //('ticket.group.name',ticket);
              sessionStorage.setItem('ticket.group.name', ticket);
              //return makesomething()
            },function(response) {
              console.error('error');
            })).then(client.get('ticket.brand.name').then(
              function(data) {
                var ticket =data['ticket.brand.name'];
                //('ticket.brand.name',ticket);
                sessionStorage.setItem('ticket.brand.name', ticket);
                //return makesomething()
              },function(response) {
                console.error('error');
              })).then(client.get('ticket.assignee.email').then(
                function(data) {
                  var ticket =data['ticket.assignee.email'];
                  //('ticket.assignee.email',ticket);
                  sessionStorage.setItem('ticket.assignee.email', ticket);
                  //return makesomething()
                },function(response) {
                  console.error('error');
                })).then(client.get('ticket.tags').then(
                  function(data) {
                    var ticket =data['ticket.tags'];
                    //('ticket.tags',ticket);
                    sessionStorage.setItem('ticket.tags', ticket);
                    //return makesomething()
                  },function(response) {
                    console.error('error');
                  })).then(client.get('ticket.satisfaction.current_rating').then(
                    function(data) {
                      var ticket =data['ticket.satisfaction.current_rating'];
                      //('ticket.satisfaction.current_rating',ticket);
                      sessionStorage.setItem('ticket.satisfaction.current_rating', ticket);
                      //return makesomething()
                    },function(response) {
                      console.error('error');
                    })).then(client.get('ticket.due_date').then(
                      function(data) {
                        var ticket =data['ticket.due_date'];
                        //('ticket.due_date',ticket);
                        sessionStorage.setItem('ticket.due_date', ticket);
                        //return makesomething()
                      },function(response) {
                        console.error('error');
                      })).then(client.get('ticket.via.channel').then(
                        function(data) {
                          var ticket =data['ticket.via.channel'];
                          //('ticket.via.channel',ticket);
                          sessionStorage.setItem('ticket.via.channel', ticket);
                          //return makesomething()
                        },function(response) {
                          console.error('error');
                        }))
          .then(function() {
      makesomething()
    });

    
}



function makesomething() {
 
  //('im calling forms');
  client.get('ticket.brand.name').then(
    function(data) {
      var brand_name = data['ticket.brand.name'];
      //('brand_name: ');
      console.log(brand_name);

      var obj = JSON.parse(localStorage.getItem('orglist'));
     
      
      content=document.getElementById("content")
      if (document.contains(document.getElementById("div_forms"))) {
        document.getElementById("div_forms").remove();
      }   
     
      result=search(brand_name,obj)

      if(result==false){
        
        var newDiv = document.createElement("div"); 
        newDiv.setAttribute("id","div_forms");
        var title = document.createElement("p"); 
        title.innerHTML=('Esta marca no se encuentra asociada con usame ')
        newDiv.appendChild(title);
        content.appendChild(newDiv);
      }

      for (const [ key, value ] of Object.entries(obj)) {
        // do something with `key` and `value`

        var length_form=value.length
        
        var newobj=value
        if (brand_name==key)
        {
          
         
        var current_brand=brand_name
        localStorage.setItem('current_brand', current_brand);

        var newDiv = document.createElement("div"); 
        newDiv.setAttribute("id","div_forms");
        var div2 = document.createElement("div"); 
        div2.setAttribute("id","div_tittle");
    
        var title = document.createElement("p"); 
        var pbrand = document.createElement("p"); 
        pbrand.setAttribute("class","pbrand")
        newDiv.appendChild(div2);
        newDiv.appendChild(title);
        newDiv.appendChild(pbrand)
        if (length_form > 0)
          {
            title.innerHTML=('Formularios asociados a la marca  ')
            pbrand.innerHTML=(key)
          }
          else
          {
            title.innerHTML=('Esta marca no posee formularios asociados ')
          }
        
        
       
        }
        for (const [ key1, value1 ] of Object.entries(newobj)) {
          var name=value1.name;
          var title=value1.title;
          var unique_id=value1.unique_id;
          var parameters_=value1.fields;
         
         // if(parameters_.length)
          
            
          if (brand_name==key)
        {
          //('title:',title);
          petition_list.length = 0;

          
          
         
          var subDiv = document.createElement("div"); 
          var btn = document.createElement("a");
          btn.innerHTML = value1.title ;
          var domain=domain_ +"fillform/"
          var url_form=name+'/'+unique_id
          var parameters=''
          var url=domain+url_form
         
          var strparameters=''
         
          if(parameters_.length>0){
            for (var i = 0; i < parameters_.length; i+=1) {
              var parameters = parameters_[i].split(',');
              var req0=parameters[0];
              var req1=parameters[1];
              var req=sessionStorage.getItem(req1);
              //(name,req,req1);
              if(i==0) {
                var newvar= '?'+req0+'='+req;
              }else
              {
                var newvar= '&'+req0+'='+req; 
              }
              
              strparameters+=newvar

            }
            //(strparameters);
            var idtick=sessionStorage.getItem('ticketid');
            var url_="\""+url+strparameters+"\""
          }
          else{
            var url_="\""+url+"\""
          }
          
          
          var brand_="\""+brand_name+"\""
          

          var t = btn.setAttribute("href","#");
          btn.setAttribute("class","btn btn-light cbutton");
          btn.setAttribute("onclick","verify_brand(" +url_+","+brand_+")");
          newDiv.appendChild(subDiv);
          newDiv.appendChild(btn);
         
        }
        }
        if (brand_name==key)
        {
          content.appendChild(newDiv);
        }
        
    }
      
      
    }
    );
}

function verify_brand( url_ , brand_ ) {
  client.get('ticket.brand.name').then(
    function(data) {
  var brand_name = data['ticket.brand.name'];
  var brand =localStorage.getItem('current_brand');
  var url =localStorage.getItem('url');
 
      if(brand==brand_name)
      {
        window.open(url_, '_blank');
      }
      else{
        call_forms()
      }

    });
}

function search(brand_name, obj){
  console.log(brand_name );
  //(obj );
  var status= false
  Object.keys(obj).forEach(function(key) {
    
    if (brand_name==key)
    {
      console.log('=' );
      status=true
      return status
    }
   
    
});
return status
  
}

function sync_forms(){
  var domain =domain_
  total_url=domain+'api/1/forms/signal/'
  console.log(total_url)
  var settings = {
    
    url:total_url,
    type:'GET',
    secure:false,
  };
  
  client.request(settings).then(
    function(data) { 
      console.log(data); 
    },
    function(response) {
      console.error(response.responseText);
    }
  );
}