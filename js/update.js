var jpdbBaseURL= 'http://api.login2explore.com:5577';
var jpdbIRL ='/api/irl';
var jpdbIML ='/api/iml';
var UserDBName = 'User';
var UserRelName = 'UserRel';
var connToken ="90937859|-31949277169153358|90949244";

(function UpdateData(){
   let obj=localStorage.getItem("UpdateObj");
     obj=JSON.parse(obj)
    console.log(obj)
//     return Object.keys(obj)
//     .map(element=>{
//         let p="#"+element;
//         console.log(element);
//         `
//         ${$(p).val(obj[element])}
//         `
// }).join("")
// console.log(object['fulln'])
     $("#Full-Name").val(obj['fulln']);
     $("#email").val(obj['email']);
     $("#dob").val(obj['dob']);
     $("#gen").val(obj['gen']);
     $("#hobby").val(obj['hobby']);
     $("#country").val(obj['country']);
     $("#state").val(obj['state']);
     $("#city").val(obj['city']);

   })();

function validate(){
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

   function UpdateDataNow(){
        var req=validate();
        let rec=localStorage.getItem("rec_no")
        var res=createUPDATERecordRequest(connToken,req,UserDBName,UserRelName,rec);
        console.log(res);
        jQuery.ajaxSetup({async:false});
        var resJsonObj= executeCommandAtGivenBaseUrl(res, jpdbBaseURL,jpdbIML);
        jQuery.ajaxSetup({async: true});
        console.log(resJsonObj);
        if(resJsonObj['status']===200){
            location.href="./index.html";
        }
        else{
            alert("Some Error Occured try Again");
        }
   }