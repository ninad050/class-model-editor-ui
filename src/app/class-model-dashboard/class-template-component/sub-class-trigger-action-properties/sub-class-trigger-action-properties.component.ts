import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../../../services/utility.service';


@Component({
  selector: 'app-sub-class-trigger-action-properties',
  templateUrl: './sub-class-trigger-action-properties.component.html',
  styleUrls: ['./sub-class-trigger-action-properties.component.scss']
})
export class SubClassTriggerActionPropertiesComponent implements OnInit {

  constructor(public utilityService:UtilityService) { }

  ngOnInit() {
  }
  checkInstanceOfArray(data):boolean{

     if(data instanceof Array){
       return true;
     }
      return false;

  }



   addProperty(){

    let newClassProp = {};
    newClassProp['triggering-event'] = "";
    newClassProp['trigger-type'] = "";
    newClassProp['sort-order'] = "";



     if(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"] instanceof Array){
              
        this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"].push(newClassProp);
     
     }
     else{

       let obj=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"];

       //build new array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"]=[];
       
       // add object to array
        if(obj!=undefined){
           this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"].push(obj);
        }
          this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"].push(newClassProp);
       }
       this.utilityService.updateClassMasterObject();
    }


deleteProperty(item,index){

     let tmpProperties=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"];
     tmpProperties.splice(index,1);
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();
}


deleteSingleProperty(){     
     let tmpProperties=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"];     
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"]=[];     
     this.utilityService.updateClassMasterObject();
}
deleteSubProperty(parentIndex , childIndex){
   
    // console.log(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-cnfg"]);

     let tmpProperties=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex]["class-tra-property-cnfg"];    
   // console.log(JSON.stringify(tmpProperties));
     tmpProperties.splice(childIndex,1);
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex]["class-tra-property-cnfg"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();

}
    copySubProperty(parentIndex , childIndex){
   
     let copyObject=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex]["class-tra-property-cnfg"][childIndex];    
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex]["class-tra-property-cnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}



copyProperty(parentIndex){
   
    // console.log(parentIndex);
     let copyObject=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex];    
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}

    addSubProperty(parentIndex){
    let newClassProp = {};
    newClassProp['property-code'] = "";
    newClassProp['property-type'] = "";
    newClassProp['property-value'] = "";
//console.log("else part-----addSubProperty"+parentIndex);
   
       
   


     if(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"] instanceof Array){
       
     //   console.log("ppproperty confg--"+this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex]["class-tra-property-cnfg"]);     
        if(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex]["class-tra-property-cnfg"]!=undefined){
          this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex]["class-tra-property-cnfg"].push(newClassProp);
        }else{
          this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex]["class-tra-property-cnfg"]=[];
          this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][parentIndex]["class-tra-property-cnfg"].push(newClassProp);
        }
     
     }
     else{
       let obj=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"];

       //build new array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"]=[];
       
       // add object to array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"].push(obj);
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-trigger-actn-ref"][1]["class-tra-property-cnfg"].push(newClassProp);
       }

       this.utilityService.updateClassMasterObject();
    }



}
