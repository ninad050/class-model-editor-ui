import { MessageService } from './../services/MessageService';
import { Component, OnInit, ChangeDetectionStrategy, NgZone, ApplicationRef  } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import  {HttpService } from '../services/httpservice/http.service';
import {ChangeDetectorRef} from '@angular/core'
import { Observable } from 'rxjs';
declare var cmeManager;

@Component({
  
  selector: 'app-class-model-component',
  templateUrl: './class-model-component.component.html',
  styleUrls: ['./class-model-component.component.scss']
})
export class ClassModelComponentComponent implements OnInit  {
  mainComponent:boolean
  fileComponent:boolean
  text: string;
  jsonstring: any;
  fileName: any;
  actionFlag: boolean;
  recentFileId: string;
  recentFileFlag: boolean;
  errorMessage: string;
  statusCode: string;
  jsonobj: JSON;
  recentActEle:any;
  classname: string;
  constructor(private _messageService: MessageService,private httpService: HttpService,private router: Router, public utilityService: UtilityService) {
        this._messageService.listen().subscribe((m:any) => {
          if(m!= null){
            this.fileName = m
            this.mainComponent = false;
            this.fileComponent = true;
            this.loadXMLasJSON()
          }
       
           
});
    
     }
  subscription: any;
  ngOnInit() {
    this.mainComponent = false;
    this.fileComponent = true;
    this.actionFlag = false;
    this.recentFileId = "";
    this.recentFileFlag = false;
    this.utilityService.getUpdatedClassModelObject();
    this.utilityService.closeButtonDisableFlag=true;
   
    
  
   
  }

  goto(url: string) {
    this.router.navigateByUrl(url, { skipLocationChange: true });
  }

 

 


  gotoClassModeldashboar(editFlag) {
    //console.log("gotoClassModeldashboar----");
    localStorage.setItem(this.utilityService.curentFileName,editFlag);
    this.utilityService.editflag = editFlag;
    let CurrentJsonObj=this.utilityService.currentClassObject;
      //console.log("gotoClassModeldashboar----"+CurrentJsonObj.id);
  
    CurrentJsonObj["newTab"]=true;
    this.utilityService.updateClassMasterObject();
    this.goto('/dashboard/classModelDashboard');
    // this.utilityService.parseXMLObject();
    this.utilityService.isObjectAvailable.subscribe((isAvailable) => {
      if (isAvailable === true) {
           this.goto('/dashboard/classModelDashboard');
       }
    });
    this.utilityService.closeButtonDisableFlag=false;
  }
  
  selectXMLFile() {
    this.mainComponent = true;
    this.fileComponent = false;
    //this.fileName = "Ninad";
    // this.httpService.getFiles().subscribe((response)=>
    // //    //console.log(response[2].content)
    //     this.fileName = response[2].content
    // //    //this.fileName = response[2].content
    //  );

    //this.router.navigate([{ outlets: { fileselect: [ 'select-file' ] }}]); 
    //this.router.navigateByUrl('/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class-file-select)', {skipLocationChange: true});
      //this.goto('fileselect');// document.getElementById("errorMessage").innerHTML="in select filessssssss....";
   //this.fileName = cmeManager.selectFile();
   //this.fileName = "C:/\Users/\ranbhnin/\FCST_CURVE_SEGMENT.xml"
     //document.getElementById("errorMessage").innerHTML="filename---"+this.fileName;
   
   //this.loadXMLasJSON();
  }

  loadXMLasJSON() {
    document.getElementById("browseEdit").className += " btn-success";
    document.getElementById("browseView").className += " btn-success";
    this.jsonstring = cmeManager.readFile(this.fileName);
    //document.getElementById("checking").innerText="in load xml...."+this.jsonstring+"\nfile name---"+this.fileName;
    if(this.jsonstring==null)
    {
      // document.getElementById("checking").innerText="if jsonstring is null then ...."+this.jsonstring;
       console.log("Invalid File......!");
       return;
    }
    else
    {
    //document.getElementById("checking").innerText="else part...."+this.jsonstring;
 
    let jsonObject = JSON.parse(this.jsonstring);

    /**
     *jsonobj variable is used for parsing jsonstring into JsonObject 
     */
    this.jsonobj = JSON.parse(this.jsonstring);
    this.statusCode = this.jsonobj["statusCode"];
    this.errorMessage = this.jsonobj["statusMessage"];
    //document.getElementById("checking").innerText;
    if (this.statusCode == "-1") {
      //console.log("status code----="+this.statusCode);
      this.actionFlag = false;
      document.getElementById("errorMessage").innerText=this.errorMessage;
      this.classname="alert alert-danger alert-dismissible";
      document.getElementById("browseEdit").className += "btn-failure";
      document.getElementById("browseView").className += "btn-failure";
     // console.log("Invalid file");
    }
    else {
      this.actionFlag = true;
      document.getElementById("errorMessage").innerHTML="";
      this.classname="";
      jsonObject["id"] = this.fileName;
      jsonObject["newTab"]=false;
     
      let flag = -1;
      if (this.utilityService.classObjectList != undefined && (this.utilityService.classObjectList).length > 0) 
      {
          flag = this.utilityService.classObjectList.findIndex(obj => obj.id == this.fileName);
      }
    //console.log("jsonObject.responseData-----"+JSON.stringify(jsonObject.responseData));
    //console.log("getting responseData------");
    //console.log("flag"+flag);
    
    if (flag == -1) {
      //console.log("inside if"+JSON.stringify(this.utilityService.classObjectList));
      //console.log("JSON OBJECT----"+JSON.stringify(jsonObject.responseData));
      if(this.utilityService.classObjectList instanceof Array){
            this.utilityService.classObjectList.push(jsonObject.responseData);
          }else{
                  this.utilityService.classObjectList=[];
                this.utilityService.classObjectList.push(jsonObject.responseData);
              }
      this.utilityService.curentFileName = this.fileName;
    } 
    else {
              console.log("File already exists");
              this.utilityService.showToastMsg("File already exists", 1);
    }

    this.utilityService.currentClassObject = jsonObject.responseData;
    this.utilityService.updateFileInStorge();
    localStorage.setItem(this.fileName, JSON.stringify(jsonObject.responseData));
    }
  }   
  }
  recentFileSelect(fileId, $event) {
    if(this.recentActEle!=undefined && this.recentActEle!==""){
       document.getElementById(this.recentActEle).className=''
    }
   // console.log("$event.target.id---"+$event.target.id);
    this.recentFileFlag = true;
    this.fileName = fileId;
    //console.log("file id is--"+this.fileName);
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
     // console.log("file name--"+fname);
      return fname;
    }
    else{
      alert("fileName is empty..!");
    }
  }


}
