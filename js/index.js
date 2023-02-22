var jpdbBaseURL= 'http://api.login2explore.com:5577';
var jpdbIRL ='/api/irl';
var jpdbIML ='/api/iml';
var UserDBName = 'User';
var UserRelName = 'UserRel';
var connToken ="90937859|-31949277169153358|90949244";

function createGETALLSyncRecordRequest(token, dbName, relName) {
    var req = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"GETALL\",\n"
            + "\"rel\" : \""
            + relName
            + "\",\n"
            + "}";
    return req;
}
function createGET_BY_RECORDRequest(token, dbName, relName, reqId) {

    var req = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"GET_BY_RECORD\",\n"
            + "\"rel\" : \""
            + relName
            + "\",\n" + "\"record\":"
            + reqId
            + "\,"
            + "\n"
            + "}";
    return req;
}

function showData(obj,num){
    return (
        `
        <div class="card w-75">
        <div class="card-body">
            <strong><h5 class="card-title">${num}.${obj['fulln']==""?"not specified":obj["fulln"]}</h5></strong>
            <strong><span class="card-text">City:</span></strong><span>${obj['city']==""?"not specified":obj["city"]}</span>
           <strong> <span class="card-text">Country:</span></strong><span>${obj['country']==""?"not specified":obj["country"]}</span>
           <strong> <span class="card-text">DOB:</span> </strong><span>${obj['dob']==""?"not specified":obj["dob"]}</span>
           <p> <strong class="card-text">State:</strong> <span>${obj["state"]==""?"not specified":obj["state"]}</span>
          <strong class="card-text">Hobby:</strong><span>${obj["hobby"]==""?"not specified":obj["hobby"]}</span>
           <strong> <span class="card-text">Gender:</span> </strong> <span>${obj["gen"]==""?"not specified":obj["gen"]}</span></p>
           <p> <strong class="card-text">Email:</strong> </strong><span>${obj["email"]==""?"not specified":obj["email"]}</span>  </p>
           <p> <button onclick="UpdateRec(${num})" class="btn btn-primary">Update</button><button class="btn btn-primary" style="margin-left:2%" onclick="deleteRec(${num})">Delete</button></p>
        </div>
    </div>
        `
    )
}

function UpdateRec(num){
    // console.log(num)
    var ans=createGET_BY_RECORDRequest(connToken,UserDBName,UserRelName,num);
    jQuery.ajaxSetup({async:false});
       var res= executeCommandAtGivenBaseUrl(ans, jpdbBaseURL,jpdbIRL);
       jQuery.ajaxSetup({async: true});
       obj=JSON.parse(res.data)['record']
       console.log(JSON.stringify(obj))
       var l=JSON.stringify(obj)
       localStorage.setItem("UpdateObj",l);
       localStorage.setItem("rec_no",num);
       location.href="./update.html";
    //    UpdateData(l);
    // var req=createUPDATERecordRequest(connToken,jsonobj,UserDBName,UserRelName,num);
    // console.log(req)
}

function deleteRec(num){
        var req= createREMOVERecordRequest(connToken,UserDBName,UserRelName,num);
        // console.log(req)
        jQuery.ajaxSetup({async:false});
       var result= executeCommandAtGivenBaseUrl(req, jpdbBaseURL,jpdbIML);
       jQuery.ajaxSetup({async: true});
       location.reload();

}

(function getData(){
       var req= createGETALLSyncRecordRequest(connToken,UserDBName,UserRelName);
    //    console.log(req);
       jQuery.ajaxSetup({async:false});
       var result= executeCommandAtGivenBaseUrl(req, jpdbBaseURL,jpdbIRL);
       jQuery.ajaxSetup({async: true});
        // console.log(result)
       obj=JSON.parse(result.data)['json_records']
    //    console.log(obj)
    //    console.log( obj[0]['record']);
       for(let i=0;i<obj.length;i++){

        obj[i]['record']==null?console.log("not present"):document.getElementById("info").innerHTML+=showData(obj[i]['record'],obj[i]['rec_no'])

       }

})();
