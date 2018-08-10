import { Component, OnInit } from '@angular/core';
import { UtilityService }  from '../services/utility.service';
import {Router , ActivatedRoute}from '@angular/router';
import{ClassModelComponentComponent} from '../class-model-component/class-model-component.component';
declare var cmeManager;

@Component({
  selector: 'app-class-model-dashboard',
  templateUrl: './class-model-dashboard.component.html',
  styleUrls: ['./class-model-dashboard.component.scss']
})
export class ClassModelDashboardComponent implements OnInit {

  constructor(public utilityService: UtilityService , private router: Router, private activeRoute: ActivatedRoute,private classModelComponentComponent:ClassModelComponentComponent) { }



  classObjectList: any = [];
  currentClassObject: any;
  activeTabId: string;
  fileName: any;
  actionFlag: boolean;
  recentFileId: string;
  recentFileFlag: boolean;
  errorMessage: string;
  statusCode: string;
  jsonobj: JSON;
  recentActEle:any;
  jsonstring: any;
  className: String;
  classname: string;
  ngOnInit() {
      this.classObjectList = this.utilityService.classObjectList;
       this.recentFileFlag = false;
       this.actionFlag=false;
      this.utilityService.classObjectList.forEach(element => {
       if (element.id == this.utilityService.curentFileName) {
         //console.log(element.id);
         this.utilityService.currentClassObject = element;
         this.currentClassObject =element;
         this.utilityService.currentHeadTab = 'tab1';
         return;
       }
     });
       this.activeTabId = this.currentClassObject.id;
      this.router.navigate(['classTemplate'], { relativeTo: this.activeRoute , skipLocationChange: true});
  }

  isActiveTab(id) {
     if (this.activeTabId == id) {
       return 'main-tabs-a active';
     }
      return 'main-tabs-a';
  }



  navigateTo(id) {
   this.utilityService.classObjectList.forEach(element => {
       if (element.id == id) {
        // console.log(element.id);
         let currentFileEditFlag=localStorage.getItem(id);
         if(currentFileEditFlag==='true'){
              this.utilityService.editflag=true;
         }else{
              this.utilityService.editflag=false;
         }
         
         this.utilityService.currentClassObject = element;
         this.utilityService.currentHeadTab = 'tab1';
         return;
       }
     });


     this.router.navigate(['classTemplate'], { relativeTo: this.activeRoute , skipLocationChange: true});
     this.router.navigateByUrl('/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class)', {skipLocationChange: true});

  }

  goBack() {
    this.router.navigateByUrl("/dashboard/classModel", { skipLocationChange: true });
}

 popupClose() {
   
  document.getElementById('properties-popup').style.display = 'none';
  document.getElementById("lastTab").classList.remove("active");
 //document.getElementById('properties-popup').innerHTML = obj.innerHTML;
 // this.classModelComponentComponent.goto('/dashboard/classModelDashboard');
return false;
  
}
 
 popupOpen() {

  document.getElementById('properties-popup').style.display = 'block';
  document.getElementById("lastTab").classList.remove("active");
  document.getElementById(this.recentActEle).classList.remove("file-name-active");
  this.fileName="";
//console.log("In PopOpen function");
}
// selectXMLFile(){
//  this.classModelComponentComponent.selectXMLFile();
// }
selectXMLFile() {
  //document.getElementById("fileInput").nodeValue="";
  //  document.getElementById("fileInput").nodeValue=this.fileName;
     this.fileName = cmeManager.selectFile();
    this.loadXMLasJSON();
  }

  loadXMLasJSON() {
    document.getElementById("browseEdit").className += " btn-success";
    document.getElementById("browseView").className += " btn-success";
    //document.getElementById("errorMessage").innerHTML="";
    //this.errorMessage="above";
    this.jsonstring = cmeManager.readFile(this.fileName);
   // this.errorMessage="Can't get the jsonString";
    if(this.jsonstring==null)
    {
        console.log("Invalid File......!");
      return;
    }
    else
    {
    let jsonObject = JSON.parse(this.jsonstring);
    /**
     *jsonobj variable is used for parsing jsonstring into JsonObject 
     */
    this.jsonobj = JSON.parse(this.jsonstring);
    this.errorMessage = this.jsonobj["statusMessage"];
    this.statusCode = this.jsonobj["statusCode"];
   
    if (this.statusCode == "-1") 
    {
        this.actionFlag = false;
        document.getElementById("errorMessage").innerText=this.errorMessage;
        this.classname="alert alert-danger alert-dismissible";
        document.getElementById("browseEdit").className += "btn-failure";
        document.getElementById("browseView").className += "btn-failure";
    }
    else 
    {
        this.actionFlag = true;
     // this.errorMessage = "";
        document.getElementById("errorMessage").innerHTML="";
        jsonObject["id"] = this.fileName;
        jsonObject["newTab"]=false;
        
        let flag = -1;
        if (this.utilityService.classObjectList != undefined && (this.utilityService.classObjectList).length > 0) 
        {
           flag = this.utilityService.classObjectList.findIndex(obj => obj.id == this.fileName);
        }
        
        if (flag == -1) 
        {
          if(this.utilityService.classObjectList instanceof Array){
              this.utilityService.classObjectList.push(jsonObject.responseData);
            }else{
                    this.utilityService.classObjectList=[];
                    this.utilityService.classObjectList.push(jsonObject.responseData);
                  }
            this.utilityService.curentFileName = this.fileName;
        } else {
                console.log("File already exists");
                this.utilityService.showToastMsg("File already exists", 1);
        }

        this.utilityService.currentClassObject = jsonObject.responseData;
        localStorage.setItem(this.fileName, JSON.stringify(jsonObject.responseData));
        this.utilityService.updateFileInStorge();
        
        //console.log("**"+this.errorMessage);
     // document.getElementById("fileInput").innerHTML=this.fileName;
    }
  }
}

deleteFile(fileId){
  this.utilityService.deleteFile(fileId);

 // console.log("delete file id---"+JSON.stringify(this.utilityService.classObjectList));
  this.classObjectList=this.utilityService.classObjectList;
  if(this.utilityService.classObjectList!=undefined && (this.utilityService.classObjectList).length>0){
      if(this.utilityService.isFileAvailableOnDashboard()){
        this.currentClassObject = this.utilityService.classObjectList[0];
        this.utilityService.curentFileName=this.currentClassObject.id;
        this.activeTabId = this.currentClassObject.id;

         this.utilityService.currentHeadTab = 'tab1';
         this.utilityService.isActiveTab("tab1");
         this.utilityService.fileDeleteStatus.emit('true');
         //this.goto('/dashboard/classModelDashboard');
      }else{
           this.utilityService.curentFileName="";
           this.utilityService.currentClassObject=undefined;
           document.getElementById("tab1").innerHTML="Currently file is not avilable to show content";
      }
  }else{
    //console.log("else delete file id---"+fileId+"----"+document.getElementById("myTabContent"));
    this.utilityService.curentFileName="";
    this.utilityService.currentClassObject=undefined;
    document.getElementById("tab1").innerHTML="Currently file is not avilable to show content";
  //  this.goto('');
  }
  //this.router.navigate(['classTemplate'], { relativeTo: this.activeRoute , skipLocationChange: true});
  this.navigateTo(this.currentClassObject.id);
}
gotoClassModeldashboar(editFlag) {
    //  console.log("edit flag---"+editFlag);
    //this.utilityService.editflag = editFlag;
    localStorage.setItem(this.utilityService.curentFileName,editFlag);
    let CurrentJsonObj=this.utilityService.currentClassObject;
   // this.currentClassObject=this.utilityService.currentClassObject;
    CurrentJsonObj["newTab"]=true;
    this.utilityService.updateClassMasterObject();
    this.goto('/dashboard/classModelDashboard');
    this.utilityService.fileDeleteStatus.emit("true");
    // this.utilityService.parseXMLObject();
    this.utilityService.isObjectAvailable.subscribe((isAvailable) => {
      if (isAvailable === true) {
           this.goto('/dashboard/classModelDashboard');
       }
    });
     this.navigateTo(this.utilityService.curentFileName);
     this.popupClose();
     this.activeTabId = CurrentJsonObj.id;
    // document.getElementById("file_"+this.utilityService.curentFileName).className="main-tabs-a active";

  }
  goto(url: string) {
    this.router.navigateByUrl(url, { skipLocationChange: true });
  }
  recentFileSelect(fileId, $event) {
    
   // console.log("recentFileSelect------pop");
    if(this.recentActEle!=undefined && this.recentActEle!==""){
       document.getElementById(this.recentActEle).className=''
    }
    //console.log("$event.target.id---"+$event.target.id);
    this.recentFileFlag = true;
    this.fileName = fileId;
   // this.loadXMLasJSON();
    document.getElementById(($event.target.id)).className='file-name-active';
    this.recentFileId = fileId;
    this.recentActEle=$event.target.id;

    document.getElementById("recentEdit").className += " btn-success";
    document.getElementById("recentView").className += " btn-success";
    this.utilityService.getFile(fileId);
    this.utilityService.curentFileName=this.fileName;
  }
  trimFileName(fileName){
    if(fileName!=null)
    {
    var fname=fileName;
    fname=fname.replace(/^.*(\\|\/|\:)/, '');
    var endpoint =fname.lastIndexOf(".");
    var className =fname.substr(0,endpoint);  
    //console.log("className--"+className);
    return className;
  }
  }
}
