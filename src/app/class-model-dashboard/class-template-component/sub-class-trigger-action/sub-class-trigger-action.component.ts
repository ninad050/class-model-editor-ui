import { Component, OnInit ,OnDestroy} from '@angular/core';
import {UtilityService} from '../../../services/utility.service';

import { DragulaService } from 'ng2-dragula/ng2-dragula';
@Component({
  selector: 'app-sub-class-trigger-action',
  templateUrl: './sub-class-trigger-action.component.html',
  styleUrls: ['./sub-class-trigger-action.component.scss']
})
export class SubClassTriggerActionComponent implements OnInit,OnDestroy {
  attributeCnfg;
  constructor(public utilityService:UtilityService,private dragulaService: DragulaService) { }
dropInstance;
public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete?';
 
  ngOnInit() {
    
   this.utilityService.removeAllBasketRef(this.dragulaService);
    let tempCurrentObj=this;
    let sibilingOj;
    let popupSibilingOj;
   
    this.dragulaService.setOptions('bag-task5', {
       accepts: function(el, target, source, sibling) {         
        sibilingOj=sibling; 
        return true;
      }
    });
    this.dragulaService.setOptions('popup-bag-task5', {
      accepts: function(el, target, source, sibling) {
       popupSibilingOj=sibling;
       return true;
     }
   }); 


     this.dropInstance=this.dragulaService.drop.subscribe((value) => {
      if(value[0] =='bag-task5'){
      
         let tmpProperties=tempCurrentObj.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"];
         tmpProperties= tempCurrentObj.utilityService.reOrderElementsInArray(tmpProperties,value[1].id,sibilingOj);
          tempCurrentObj.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"]=tmpProperties;     
          tempCurrentObj.utilityService.updateClassMasterObject();
      }
      else if(value[0]=='popup-bag-task5'){
            let tmpProperties=this.attributeCnfg;
            tmpProperties= tempCurrentObj.utilityService.reOrderElementsInArray(tmpProperties,value[1].id,popupSibilingOj);
            this.attributeCnfg=tmpProperties;     
            tempCurrentObj.utilityService.updateClassMasterObject();
            console.log("After replacement---->----"+JSON.stringify(tmpProperties));
      }
      //this.onDrop(value.slice(1));
    });
  }
  checkInstanceOfArray(data):boolean{

     if(data instanceof Array){
       return true;
     }
      return false;

  }

  addProperty(){

    let newClassProp = {};
    newClassProp['triggeringEvent'] = "";
    newClassProp['triggerType'] = "";
    newClassProp['sortOrder'] = "";
    newClassProp['dbSqlSyntax'] = "";


//console.log("inside add property....");
     if(this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"] instanceof Array){
          // console.log("inside if--");   
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"].push(newClassProp);
     
     }
     else{

       let obj=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"];

       //build new array
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"]=[];
       
       // add object to array
       if(obj!=undefined){
          this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"].push(obj);
       }
          this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"].push(newClassProp);
       }

       this.utilityService.updateClassMasterObject();
    }


deleteProperty(item,index){

     let tmpProperties=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"];
     tmpProperties.splice(index,1);
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();
}



deleteSingleProperty(){     
     let tmpProperties=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"];     
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"]=[];     
     this.utilityService.updateClassMasterObject();
}
   copyProperty(parentIndex){
   
     let copyObject=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"][parentIndex];    
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();
} 
     copySIngleProperty(parentIndex){
   
     let copyObject=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"]; 
      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"]=[];     
      
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"].push(copyObject);     
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classTriggerActnCnfg"].push(copyObject);     
    
     this.utilityService.updateClassMasterObject();
}
deleteSubProperty(parentIndex , childIndex){
   
    // console.log(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-cnfg"]);

     let tmpProperties=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][parentIndex]["classTraPropertyCnfg"];    
   // console.log(JSON.stringify(tmpProperties));
     tmpProperties.splice(childIndex,1);
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][parentIndex]["classTraPropertyCnfg"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();

}
    copySubProperty(parentIndex , childIndex){
   
     let copyObject=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][parentIndex]["classTraPropertyCnfg"][childIndex];    
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][parentIndex]["classTraPropertyCnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}

    addSubProperty(parentIndex){
    let newClassProp = {};
    newClassProp['propertyCode'] = "";
    newClassProp['propertyType'] = "";
    newClassProp['propertyValue'] = "";
    newClassProp['presentationCntx'] = "";
//console.log("else part-----addSubProperty"+parentIndex);
   
       
   


     if(this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"] instanceof Array){
       
     //   console.log("ppproperty confg--"+this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][parentIndex]["classTraPropertyCnfg"]);     
        if(this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][parentIndex]["classTraPropertyCnfg"]!=undefined){
          this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][parentIndex]["classTraPropertyCnfg"].push(newClassProp);
        }else{
          this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][parentIndex]["classTraPropertyCnfg"]=[];
          this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][parentIndex]["classTraPropertyCnfg"].push(newClassProp);
        }
     
     }
     else{
       let obj=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"];

       //build new array
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"]=[];
       
       // add object to array
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"].push(obj);
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classTriggerActnRef"][1]["classTraPropertyCnfg"].push(newClassProp);
       }

       this.utilityService.updateClassMasterObject();
    }
      openProperties(eventId, localAttributeCnfg, index) {
        this.attributeCnfg=localAttributeCnfg;
        document.getElementById('trigger-properties-popup').style.display = "block";
        //console.log("attributeId----"+eventId);
        document.getElementById('popupProp_'+eventId+"_"+index).style.display = "block";
        document.getElementById('topbar_'+eventId+"_"+index).style.display = "block";
        document.getElementById('bottom_'+eventId+"_"+index).style.display = "block";
        }
        popupClose(eventId,index) {
          //console.log("close--"+eventId);
          document.getElementById('trigger-properties-popup').style.display = 'none';
          document.getElementById('popupProp_'+eventId+"_"+index).style.display = "none";
          document.getElementById('bottom_'+eventId+"_"+index).style.display = "none";
          document.getElementById('topbar_'+eventId+"_"+index).style.display = "none";
        
        }
showAllProp() {
   
    document.getElementById('all-trigger-properties-popup').style.display = 'block';
   
  }
    allPopupClose(){
     document.getElementById('all-trigger-properties-popup').style.display = 'none';
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
  
}
