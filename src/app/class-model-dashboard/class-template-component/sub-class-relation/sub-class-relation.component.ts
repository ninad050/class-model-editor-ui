import { Component, OnInit,OnDestroy } from '@angular/core';
import {UtilityService} from '../../../services/utility.service';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-sub-class-relation',
  templateUrl: './sub-class-relation.component.html',
  styleUrls: ['./sub-class-relation.component.scss']
})
export class SubClassRelationComponent implements OnInit,OnDestroy {
  attributeCnfg
  constructor(public utilityService:UtilityService,private dragulaService: DragulaService) { }
  dropInstance;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete?';

  ngAfterViewInit()
  {
    //console.log(" inside ngAfterViewInit of subClassAttributeComponent..");
    this.getCheckBoxValue_IsKey();
    this.getCheckBoxValue_BI();
  }

  ngAfterViewChecked(){
    //console.log(" inside ngOnChanges of subClassAttributeComponent..");
    this.getCheckBoxValue_IsKey();
    this.getCheckBoxValue_BI();
  }

  ngOnInit() {
    
   this.utilityService.removeAllBasketRef(this.dragulaService); 
    let tempCurrentObj=this;
    let sibilingOj;
    let popupSibilingOj;
    this.dragulaService.setOptions('bag-task4', {
       accepts: function(el, target, source, sibling) {
        sibilingOj=sibling;
        return true;
      }
    });
    this.dragulaService.setOptions('popup-bag-task4', {
      accepts: function(el, target, source, sibling) {
       popupSibilingOj=sibling;
       return true;
     }
   });

     this.dropInstance=this.dragulaService.drop.subscribe((value) => {
     //  console.log("on drop"+value[1].id+"-------sibling obj"+sibilingOj.id);
     if(value[0] =='bag-task4'){
         let tmpProperties=tempCurrentObj.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg'];
          tmpProperties= tempCurrentObj.utilityService.reOrderElementsInArray(tmpProperties,value[1].id,sibilingOj);
           tempCurrentObj.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg']=tmpProperties;     
           tempCurrentObj.utilityService.updateClassMasterObject();
     }
     else if(value[0]=='popup-bag-task4'){
          let tmpProperties=this.attributeCnfg;
          tmpProperties= tempCurrentObj.utilityService.reOrderElementsInArray(tmpProperties,value[1].id,popupSibilingOj);
          this.attributeCnfg=tmpProperties;     
          tempCurrentObj.utilityService.updateClassMasterObject();
    }
      //this.onDrop(value.slice(1));
    });
  }


  checkInstanceOfArray(data):boolean{

     if(data instanceof Array){
       return true;
     }
    //  console.log("returning false");
      return false;

  }
    copyProperty(parentIndex){
   
     let copyObject=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["app-space-cntx"][1][1]["class-relation-cnfg"][parentIndex];    
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["app-space-cntx"][1][1]["class-relation-cnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();
}
    copySIngleProperty(parentIndex){
   
     let copyObject=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["app-space-cntx"][1][1]["class-relation-cnfg"]; 
      this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["app-space-cntx"][1][1]["class-relation-cnfg"]=[];     
      
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["app-space-cntx"][1][1]["class-relation-cnfg"].push(copyObject);     
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["app-space-cntx"][1][1]["class-relation-cnfg"].push(copyObject);     
    
     this.utilityService.updateClassMasterObject();
}



  addProperty(){
     let  newClassProp={};
     newClassProp["fromClassName"]="";
     newClassProp["roleName"]="";
     newClassProp["isKey"]="";
     newClassProp["isBidirectional"]="";
     newClassProp["groupType"]="";
     newClassProp["multiplicity"]="";
     newClassProp["dbMappingType"]="";
     newClassProp["dbSqlSyntax"]="";


     if(this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg'] instanceof Array){
              
        this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg'].push(newClassProp);
     
     }
     else{

       let obj=this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg'];

       //build new array
       this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg']=[];
       
       // add object to array
       //console.log("obj--------"+JSON.stringify(obj));
       if(obj!=undefined){
        this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg'].push(obj);
       }
       this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg'].push(newClassProp);
       }

       this.utilityService.updateClassMasterObject();
    }


deleteProperty(item,index){
     //console.log(index);
     let tmpProperties=this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg'];
     tmpProperties.splice(index,1);
     this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg']=tmpProperties;     
     this.utilityService.updateClassMasterObject();
}

deleteSingleProperty(){     
     let tmpProperties=this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg'];     
     this.utilityService.currentClassObject['classCnfgOrClassRef'][0]['appSpaceCntx_0020'][0]['classRelationCnfg']=[];     
     this.utilityService.updateClassMasterObject();
}
 openProperties(attributeId,localAttributeCnfg) {
  this.attributeCnfg=localAttributeCnfg;
    document.getElementById('relation-properties-popup-relation').style.display = "block";
    //console.log("attributeId----"+attributeId);
   document.getElementById('popupProp_'+attributeId).style.display = "block";
   document.getElementById('relation_topbar_'+attributeId).style.display = "block";
   document.getElementById('relation_bottom_'+attributeId).style.display = "block";
  }
  popupClose(attributeId) {
   //console.log("close--"+attributeId);
    document.getElementById('relation-properties-popup-relation').style.display = 'none';
    document.getElementById('popupProp_'+attributeId).style.display = "none";
     document.getElementById('relation_bottom_'+attributeId).style.display = "none";
    document.getElementById('relation_topbar_'+attributeId).style.display = "none";
  
  }
  deleteSingleSubProperty(parentIndex , childIndex){
   
     let tmpProperties=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"]["classRelPropertyCnfg"];    
     tmpProperties.splice(childIndex,1);
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"]["classRelPropertyCnfg"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();

}
    deleteSubProperty(parentIndex , childIndex){
   
    // console.log(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-cnfg"]);

     let tmpProperties=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"][parentIndex]["classRelPropertyCnfg"];    
   // console.log(JSON.stringify(tmpProperties));
     tmpProperties.splice(childIndex,1);
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"][parentIndex]["classRelPropertyCnfg"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();

}


addSubProperty(parentIndex){
    let newClassProp = {};
    newClassProp['propertyCode'] = "";
    newClassProp['propertyType'] = "";
    newClassProp['propertyValue'] = "";
    newClassProp['presentationCntx'] = "";


       
   

    if(this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"] instanceof Array){
       if(this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"][parentIndex]!=undefined){       
         this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"][parentIndex]["classRelPropertyCnfg"].push(newClassProp);
       }else{
        let obj=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"];

       //build new array
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"]=[];
       
       // add object to array
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"].push(obj);
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"][parentIndex]["classRelPropertyCnfg"].push(newClassProp);

       }
     }
     else{

       let obj=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"];

       //build new array
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"]=[];
       
       // add object to array
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"].push(obj);
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"][0]["classRelPropertyCnfg"].push(newClassProp);
       }

       this.utilityService.updateClassMasterObject();
    }

 copySubProperty(parentIndex , childIndex){
   
     let copyObject=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"][parentIndex]["classRelPropertyCnfg"][childIndex];    
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"][parentIndex]["classRelPropertyCnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}
    copySingleSubProperty(parentIndex , childIndex){
     // console.log("copySingleSubProperty----");
     let originalSubObj=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"];//["classRelPropertyCnfg"];
     let copyObject=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"]["classRelPropertyCnfg"][childIndex];    
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"]=[];

    
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"].push(originalSubObj);
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classRelationRef"][0]["classRelPropertyCnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}
    showAllProp() {
   
    document.getElementById('all-relation-properties-popup').style.display = 'block';
   
  }
    allPopupClose(){
     document.getElementById('all-relation-properties-popup').style.display = 'none';
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
      isemptyArray(currentArray){
        let stringifyObj=JSON.stringify(currentArray);
         if(currentArray==null || currentArray==undefined || currentArray.length<=0 || stringifyObj==undefined){
          return true;
        }
        return false;
      }

  saveCheckBoxValue_IsKey(currentIndex)
  {
    if(currentIndex!=-1)
    {
      if((<HTMLInputElement>document.getElementById("checkbox_"+currentIndex)).checked==true)
      {
        (<HTMLInputElement>document.getElementById("checkbox_"+currentIndex)).value='Y';
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"][currentIndex]["isKey"]='Y';
      }
      else 
      {
        (<HTMLInputElement>document.getElementById("checkbox_"+currentIndex)).value='N';
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"][currentIndex]["isKey"]='N';
      }
    }
   else
    {
      if((<HTMLInputElement>document.getElementById("checkbox_")).checked==true)
      {
          (<HTMLInputElement>document.getElementById("checkbox_")).value='Y';
          this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"]["isKey"]='Y';
      }
      else 
      {
          (<HTMLInputElement>document.getElementById("checkbox_"+currentIndex)).value='N';
           this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"]["isKey"]='N';
      }
    }
    
  }


  saveCheckBoxValue_IsKey_BI(currentIndex)
  {
    if(currentIndex!=-1)
    {
      if((<HTMLInputElement>document.getElementById("bi_CheckBox_"+currentIndex)).checked==true)
      {
        (<HTMLInputElement>document.getElementById("bi_CheckBox_"+currentIndex)).value='Y';
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"][currentIndex]["isBidirectional"]='Y';
       }
      else 
      {
        (<HTMLInputElement>document.getElementById("bi_CheckBox_"+currentIndex)).value='N';
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"][currentIndex]["isBidirectional"]='N';
      }
    }
    else
    {
      if((<HTMLInputElement>document.getElementById("bi_CheckBox_")).checked==true)
      {
        (<HTMLInputElement>document.getElementById("bi_CheckBox_")).value='Y';
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"]["isBidirectional"]='Y';
      }
      else 
      {
        (<HTMLInputElement>document.getElementById("bi_CheckBox_"+currentIndex)).value='N';
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"]["isBidirectional"]='N';
      }
    }
    
  }

getCheckBoxValue_IsKey()
{
  let singleProp:any=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"];

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
   

getCheckBoxValue_BI()
{
  let singleProp:any=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classRelationCnfg"]; 
   for (let i=0; i < singleProp.length; i++) {
    if(singleProp[i]["isBidirectional"]=='Y')
      {
        (<HTMLInputElement>document.getElementById("bi_CheckBox_"+i)).value="Y"; //This is used for setting Y to a checkbox 
        (<HTMLInputElement>document.getElementById("bi_CheckBox_"+i)).checked=true;
      }
      else
      {
        (<HTMLInputElement>document.getElementById("bi_CheckBox_"+i)).value="N"; //This is used for setting N to a checkbox
        (<HTMLInputElement>document.getElementById("bi_CheckBox_"+i)).checked=false;
      }
    }
  }
}
