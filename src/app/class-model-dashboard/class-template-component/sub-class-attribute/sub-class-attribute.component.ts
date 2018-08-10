import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../../../services/utility.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sub-class-attribute',
  templateUrl: './sub-class-attribute.component.html',
  styleUrls: ['./sub-class-attribute.component.scss'],
})
export class SubClassAttributeComponent implements OnInit,AfterViewInit,OnDestroy{
  attributeCnfg;
  isNaN: Function = Number.isNaN;
  checkFlag: boolean=false;
  showReference=false;
  showJoin=false;
  constructor(public utilityService: UtilityService,private dragulaService: DragulaService,public router: Router) {

  
  }
  dropInstance;
  public popoverTitle: string = 'Confirmation';
  public popoverDeleteMessage: string = 'Are you sure you want to delete?';
  public popoverClearMessage: string='Are you sure you want to Clear?';
  
  check: string;
  isKey: string;

  ischeck: boolean=true;
  
  ngAfterViewInit()
  {
    //console.log(" inside ngAfterViewInit of subClassAttributeComponent..");
    this.getIsKey();
  }

  ngAfterViewChecked(){
    //console.log(" inside ngOnChanges of subClassAttributeComponent..");
    this.getIsKey();
  }

  ngOnInit() {

   
   this.utilityService.removeAllBasketRef(this.dragulaService);
    let tempCurrentObj=this;
    let sibilingOj;
    let popupSibilingOj;
    this.dragulaService.setOptions('popup-bag-task2', {
      accepts: function(el, target, source, sibling) {
       popupSibilingOj=sibling;
       return true;
    }
    
      
  }); 
    this.dragulaService.setOptions('bag-task2', {
       accepts: function(el, target, source, sibling) {
        sibilingOj=sibling;
        return true;
      }
    }); 
 
    this.dropInstance= this.dragulaService.drop.subscribe((value) => {

      if(value[0] =='bag-task2'){
        this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classAttributeCnfg'].forEach(element => {
          document.getElementById('referance_' + element.attributeName).style.display = "none";
          document.getElementById('join_' + element.attributeName).style.display = "none";
  });
           
         let tmpProperties=tempCurrentObj.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"];
          tmpProperties= tempCurrentObj.utilityService.reOrderElementsInArray(tmpProperties,value[1].id,sibilingOj);
           tempCurrentObj.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"]=tmpProperties;     
           tempCurrentObj.utilityService.updateClassMasterObject();
             }
      else if(value[0]=='popup-bag-task2'){
            let tmpProperties=this.attributeCnfg;
            
            tmpProperties= tempCurrentObj.utilityService.reOrderElementsInArray(tmpProperties,value[1].id,popupSibilingOj);
            this.attributeCnfg=tmpProperties;     
            tempCurrentObj.utilityService.updateClassMasterObject();
      }
      // console.log("outside if else---"+JSON.stringify(this.attributeCnfg));
      console.log("outside if else---");
    });

  }
   
  goto(url: string) {
    this.router.navigateByUrl(url, { skipLocationChange: true });
  }

  
  addProperty(loadDataModel) {
    let newClassProp = {};
    newClassProp['attributeName'] = "";
    newClassProp['isKey'] = "";
    newClassProp['dataType'] = "";
    newClassProp['referenceType'] = "";
    newClassProp['referenceKey'] = "";
    newClassProp['referenceValue'] = "";
    newClassProp['dbMappingType'] = "";
    newClassProp['dbJoinTable'] = "";
    newClassProp['dbSqlSyntax'] = "";
    newClassProp['dbJoinWhere'] = "";


    if (this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"] instanceof Array) {

      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"].push(newClassProp);

    }
    else {

      let obj = this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"];

      //build new array
      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"] = [];

      // add object to array
      if (obj != undefined) {
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"].push(obj);
      }
      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"].push(newClassProp);
    }

    this.utilityService.updateClassMasterObject();
  }


  deleteProperty(item, index) {

    let tmpProperties = this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"];
    tmpProperties.splice(index, 1);
    this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"] = tmpProperties;
    this.utilityService.updateClassMasterObject();
  }

  getReferenceBtnClass(singleProp, btnFlag){
    if(btnFlag == 'ref'){
      if(singleProp.referenceType || singleProp.referenceKey || singleProp.referenceValue){
        return true;
      }
      else{
        return false;
      }
    }
    else if(btnFlag == 'join'){
      if(singleProp.dbJoinTable || singleProp.dbJoinWhere){
        return true;
      }
      else{
        return false;
      }
    }
   return false;
  }

  openReference(referenceId) {
    this.showReference= !this.showReference;
    if(this.showReference){
      document.getElementById('referance_' + referenceId).style.display = "table-row";
    } else{
      document.getElementById('referance_' + referenceId).style.display = "none";
    }
    // document.getElementById('join_' + referenceId).style.display = "none";
  }
  referanceClose(referenceId,singleProp) {
    singleProp.referenceType='';
    singleProp.referenceKey='';
    singleProp.referenceValue='';
    document.getElementById('referance_' + referenceId).style.display = 'none';
    //   document.getElementById('referance-btn').className = 'btn btn-secondary';
  }
  joinClose(referenceId,singleProp) {
    singleProp.dbJoinTable ='';
    singleProp.dbJoinWhere ='';
    document.getElementById('join_' + referenceId).style.display = 'none';
    //   document.getElementById('referance-btn').className = 'btn btn-secondary';
  }

  openJoin(joinId) {
    this.showJoin=!this.showJoin;
    if(this.showJoin){
      document.getElementById('join_' + joinId).style.display = "table-row";
    }
    else{
      document.getElementById('join_' + joinId).style.display = "none";
    }

    // document.getElementById('referance_' + joinId).style.display = "none";
  }
  openProperties(attributeId,localAttributeCnfg) {
    this.attributeCnfg=localAttributeCnfg;
    document.getElementById('attribute-properties-popup').style.display = "block";
   // console.log("attributeId----" + attributeId);
    document.getElementById('popupProp_' + attributeId).style.display = "block";
    document.getElementById('topbar_' + attributeId).style.display = "block";
    document.getElementById('bottom_' + attributeId).style.display = "block";
  }
  showAllProp() {
   
    document.getElementById('all-attribute-properties-popup').style.display = 'block';
   
  }
    allPopupClose(){
       document.getElementById('all-attribute-properties-popup').style.display = 'none';
  }
    
  popupClose(attributeId) {
    //console.log("close--" + attributeId);
    document.getElementById('attribute-properties-popup').style.display = 'none';
    document.getElementById('popupProp_' + attributeId).style.display = "none";
    document.getElementById('bottom_' + attributeId).style.display = "none";
    document.getElementById('topbar_' + attributeId).style.display = "none";
  }

  deleteSingleProperty() {
    let tmpProperties = this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"];
    this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"] = [];
    this.utilityService.updateClassMasterObject();
  }


  checkInstanceOfArray(data): boolean {

    if (data instanceof Array) {
      return true;
    }
    return false;

  }
  copyProperty(parentIndex) {

    let copyObject = this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"][parentIndex];
    this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"].push(copyObject);
    this.utilityService.updateClassMasterObject();
  }
  copySIngleProperty(parentIndex) {

    let copyObject = this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"];
    this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"] = [];

    this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"].push(copyObject);
    this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"].push(copyObject);

    this.utilityService.updateClassMasterObject();
  }

  addSubProperty(parentIndex) {
    console.log("add sub property---");
    let newClassProp = {};
    newClassProp['propertyCode'] = "";
    newClassProp['propertyType'] = "";
    newClassProp['propertyValue'] = "";
    newClassProp['presentationCntx'] = "";

    if (this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"] instanceof Array) {
      if (this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"][parentIndex]["classAttrPropertyCnfg"] != undefined) {
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"][parentIndex]["classAttrPropertyCnfg"].push(newClassProp);

      } else {
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"][parentIndex]["classAttrPropertyCnfg"] = [];
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"][parentIndex]["classAttrPropertyCnfg"].push(newClassProp);
      }
    }
    else {
     let obj = this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"];

      //build new array
      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"] = [];

      // add object to array
      if (obj != undefined) {
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"].push(obj);
      }
      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"][1]["classAttrPropertyCnfg"].push(newClassProp);
    }

    this.utilityService.updateClassMasterObject();
  }
  deleteSubProperty(parentIndex, childIndex) {

    let tmpProperties = this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"][parentIndex]["classAttrPropertyCnfg"];
    tmpProperties.splice(childIndex, 1);
    this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"][parentIndex]["classAttrPropertyCnfg"] = tmpProperties;
    this.utilityService.updateClassMasterObject();

  }

  copySubProperty(parentIndex, childIndex) {

    let copyObject = this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"][parentIndex]["classAttrPropertyCnfg"][childIndex];
    this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classAttributeRef"][parentIndex]["classAttrPropertyCnfg"].push(copyObject);
    this.utilityService.updateClassMasterObject();

  }

   public ngOnDestroy(): void {
        /*
         * magic kicks in here: All subscriptions which were added
         * with "subscription.add" are canceled too!
         */
        if(this.dropInstance!=undefined){
          this.dropInstance.unsubscribe();
        }

    }

  
  
  
  //
  //Method to save Y or N into xml file on event of checkbox
  //  
  convertToString(currentIndex)
  {
    if(currentIndex!=-1)
    {
    if((<HTMLInputElement>document.getElementById("checkbox_"+currentIndex)).checked==true)
    {
      (<HTMLInputElement>document.getElementById("checkbox_"+currentIndex)).value='Y';
      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"][currentIndex]["isKey"]='Y';
     }
    else 
    {
      (<HTMLInputElement>document.getElementById("checkbox_"+currentIndex)).value='N';
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"][currentIndex]["isKey"]='N';
     }
    }
  else
  {
    if((<HTMLInputElement>document.getElementById("checkbox_")).checked==true)
    {
      (<HTMLInputElement>document.getElementById("checkbox_")).value='Y';
      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"]["isKey"]='Y';
     }
    else 
    {
      (<HTMLInputElement>document.getElementById("checkbox_"+currentIndex)).value='N';
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"]["isKey"]='N';
     }
    }
    
  }


getIsKey()
{
  let singleProp:any=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"]; 
  if(this.checkInstanceOfArray(this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classAttributeCnfg"]))
  { //console.log("Array in getiskey");
   for (let i=0; i < singleProp.length; i++) {
    if(singleProp[i]["isKey"]=='Y')
      {
        (<HTMLInputElement>document.getElementById("checkbox_"+i)).value="Y"; //This is used for setting Y to a checkbox 
        (<HTMLInputElement>document.getElementById("checkbox_"+i)).checked=true;
      }
      else
      {
        (<HTMLInputElement>document.getElementById("checkbox_"+i)).value="N"; //This is used for setting N to a checkbox
        (<HTMLInputElement>document.getElementById("checkbox_"+i)).checked=false;
       }
    }
  }
  else
  {
    console.log("single object");
    if(singleProp["isKey"]=='Y')
    {
      (<HTMLInputElement>document.getElementById("checkbox_")).value="Y"; //This is used for setting Y to a checkbox 
      (<HTMLInputElement>document.getElementById("checkbox_")).checked=true;
     }
    else
    {
      (<HTMLInputElement>document.getElementById("checkbox_")).value="N"; //This is used for setting N to a checkbox
      (<HTMLInputElement>document.getElementById("checkbox_")).checked=false;
     }
  }

}



}
