var jpdbBaseURL= 'http://api.login2explore.com:5577';
var jpdbIRL ='/api/irl';
var jpdbIML ='/api/iml';
var UserDBName = 'User';
var UserRelName = 'UserRel';
var connToken ="90937859|-31949277169153358|90949244";




function validation() {
   
    var fulln = $("#Full-Name").val();
    var email = $("#email").val();
    var dob = $("#dob").val();
    var gen = $("#gen").val();
    var hobby = $("#hobby").val();
    var country = $("#country").val();
    var state = $("#state").val();
    var city = $("#city").val();

 
     var jsonStrObj ={
         fulln:fulln,
        email:email,
        dob:dob,
        gen:gen,
        hobby:hobby,
        country:country,
        state:state,
        city:city
     };
     return JSON.stringify(jsonStrObj);
   }



   function saveData(){
    var jsonStrObj = validation();
    // console.log(jsonStrObj);
    if(jsonStrObj===''){
        return '';
    }
    var putRequest= createPUTRequest(connToken, jsonStrObj, UserDBName, UserRelName );
    jQuery.ajaxSetup({async:false});
    var resJsonObj= executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    if(resJsonObj==""){
        alert("Data not inserted");
    }
    else{
        alert("Data Inserted Success")
        location.href = "./index.html";
    }
    
   }


