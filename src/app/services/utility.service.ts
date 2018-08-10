import { Injectable, OnInit, EventEmitter } from '@angular/core';

import { throwError as observableThrowError, Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
// declare var cmeManager;
declare var cmeManager;

@Injectable({
  providedIn: 'root'
})
export class UtilityService implements OnInit {

  public TOAST_TIMEOUT: any;
  public currentClassObject: any;
  public classObjectList: any = [];
  public curentFileName;
  editflag:boolean;
  fileDeleteStatus = new EventEmitter<string>();
 
  

  // To disable Close button on dashboard component
 // closeButtonEventFlag = new EventEmitter<any>();
  closeButtonDisableFlag=false;

  public headTabs = [
    { id: 'tab1', name: 'Class' },
    { id: 'tab2', name: 'Class Dependancies' },
    { id: 'tab3', name: 'Class Attribute' },
    //  { id: 'tab4', name: 'Class Attribute Properties' },
    { id: 'tab5', name: 'Class Trigger Action' },
    //  { id: 'tab6', name: 'Class Trigger Action Properties'},
    { id: 'tab7', name: 'Class Relation' },
    //  { id: 'tab8', name: 'Class Relation Properties' }
  ];

  public currentHeadTab = 'tab1';
  isObjectAvailable = new EventEmitter<boolean>();

  constructor(private http: Http, private localstorageService: LocalstorageService) {
  }


  ngOnInit(): void {

  }

  getXMLAsObject(): Observable<JSON> {
    return this.http.get('assets/json/class.json').pipe(map(response => response.json())).pipe(catchError(this.handleError));
  }

  parseXMLObject() {
    this.isObjectAvailable.emit(true);

    // console.log("inside parse xml obj"+this.cuurentFileName);
    //  console.log("inside parse xml obj"+JSON.stringify(this.currentClassObject));
    this.getXMLAsObject().subscribe((data) => {
      this.classObjectList = data;
      this.currentClassObject = data[0];
      this.localstorageService.setClassMasterObject(this.classObjectList);

    }
    );
  }

  private handleError(error: Response | any) {
    console.error('error HttpService ' + error.status);
    return observableThrowError(error);
  }


  getUpdatedClassModelObject() {
    this.classObjectList = this.localstorageService.getClassMasterObject();
    if (this.classObjectList != undefined && this.classObjectList.length > 0) {
      this.currentClassObject = this.classObjectList[0];
      this.curentFileName = this.classObjectList[0].id;
    }
  }

  updateClassMasterObject() {
    if (this.classObjectList == undefined) {
      return;
    }
    let len = this.classObjectList.length;
    let currentIndex = 0;
    for (let i = 0; i < len; i++) {

      if (this.classObjectList[i].id == this.currentClassObject.id) {
        this.classObjectList[i] = this.currentClassObject;
        currentIndex = i;

        this.currentClassObject = this.classObjectList[currentIndex];
        break;
      }

    }
  }
  updateDataInStorage() {
    if (this.classObjectList == undefined) {
      return;
    }
    //console.log("this.currentClassObject.id----"+this.currentClassObject.id);
    let len = this.classObjectList.length;
    let currentIndex = 0;
    for (let i = 0; i < len; i++) {

      if (this.classObjectList[i].id == this.currentClassObject.id) {
        this.classObjectList[i] = this.currentClassObject;
        currentIndex = i;
        //  update to local storage
        this.localstorageService.setClassMasterObject(this.classObjectList);
        this.classObjectList = this.localstorageService.getClassMasterObject();
        this.currentClassObject = this.classObjectList[currentIndex];
        this.curentFileName = this.currentClassObject.id;
      //  console.log("JSON.stringify(this.currentClassObject)----"+JSON.stringify(this.currentClassObject));
        cmeManager.saveFile(JSON.stringify(this.currentClassObject));
        break;
      }

    }

  }
  public showToastMsg(messageTxt: string, flag: number) {
    var x = document.getElementById("toast");
    x.innerHTML = messageTxt;

    if (flag == 1) {
      x.className = "toastSuccess show";
    }
    else {
      x.className = "toastError show";
    }
    // x.className += " show";
    if (this.TOAST_TIMEOUT != undefined) {
      window.clearTimeout(this.TOAST_TIMEOUT);
    }
    this.TOAST_TIMEOUT = setTimeout(function () { x.className = "" }, 3000);
  }
  public deleteFile(fileId) {
    let tempObjList=[];
    let len = this.classObjectList.length;
  //  console.log("inside del utiltity"+len);
    let deleteIndex;
    for (let i = 0; i < len; i++) {
      console.log("indivisaual id--"+this.classObjectList[i].id);
      if (this.classObjectList[i].id != fileId) {
        tempObjList.push(this.classObjectList[i]);
      }
    }
   this.classObjectList=tempObjList;
   this.currentClassObject=this.classObjectList[0];
   //console.log("class obj list---"+JSON.stringify(this.classObjectList));
    this.localstorageService.setClassMasterObject(this.classObjectList)

  }

  removeAllBasketRef(dragulaService){
     const bag1: any = dragulaService.find('bag-task1');
    if (bag1 !== undefined ){
      dragulaService.destroy('bag-task1');
    } 
     const bag2: any = dragulaService.find('bag-task2');
    if (bag2 !== undefined ){
      dragulaService.destroy('bag-task2');
    }
    const popupbag2: any = dragulaService.find('popup-bag-task2');
    if (popupbag2 !== undefined ){
      dragulaService.destroy('popup-bag-task2');
    }
     const bag3: any =dragulaService.find('bag-task3');
    if (bag3 !== undefined ){
    dragulaService.destroy('bag-task3');
    }
     const bag4: any =dragulaService.find('bag-task4');
    if (bag4 !== undefined ){
      dragulaService.destroy('bag-task4');
    }
    const popupBag4: any =dragulaService.find('popup-bag-task4');
    if (popupBag4 !== undefined ){
      dragulaService.destroy('popup-bag-task4');
    }
     const bag5: any =dragulaService.find('bag-task5'); 
    if (bag5 !== undefined ){
      dragulaService.destroy('bag-task5');
    }
    const popupBag5: any =dragulaService.find('popup-bag-task5');
    if (popupBag5 !== undefined ){
      dragulaService.destroy('popup-bag-task5');
    }
  }
  reOrderElementsInArray(tmpProperties,sourceIndex,target){
   // console.log("target id is:"+target.id);
  let targetIndex;
  if(target!=null){
    let targetId=target.id;
              if(targetId>sourceIndex){
                      targetIndex=(target.id)-1;
              }else{
                targetIndex=targetId;
              }
          }else{
            if(tmpProperties!=null && tmpProperties!=undefined){
              targetIndex=(tmpProperties.length)-1;
            }
            
  }
  if(!isNaN(targetIndex)){
  if(targetIndex!=undefined && sourceIndex!=undefined){        
      let draggedEle=tmpProperties[sourceIndex];
      tmpProperties[sourceIndex]=tmpProperties[targetIndex];
      tmpProperties[targetIndex]=draggedEle;
  }   
  }
  return tmpProperties;
} 

isFileAvailableOnDashboard(){
  let fileAvailableFlag=false;
  let cureentObjList=this.classObjectList;
  if(cureentObjList!=undefined && cureentObjList.length>0){
    for(let i=0;i<cureentObjList.length;i++){
      if(cureentObjList[i]["newTab"]!=undefined){
          fileAvailableFlag=true;
          break;
      }
    }
  }
  return fileAvailableFlag;
}
isActiveTab(tab){
   if (this.currentHeadTab == tab) {
        return 'nav-link active';
      }
    return 'nav-link';
}
  updateFileInStorge(){
    if(this.classObjectList!=undefined && this.classObjectList.length>0){
     this.localstorageService.setClassMasterObject(this.classObjectList);
    }
  }
  public getFile(fileId) {
  //  let tempObjList=[];
    let len = this.classObjectList.length;
  //  console.log("inside del utiltity"+len);
    let deleteIndex;
    for (let i = 0; i < len; i++) {
     // console.log("indivisaual id--"+this.classObjectList[i].id);
      if (this.classObjectList[i].id == fileId) {
      //  console.log("inside match----");
         this.currentClassObject=this.classObjectList[i];
          break;
      }
    }
  }

}
