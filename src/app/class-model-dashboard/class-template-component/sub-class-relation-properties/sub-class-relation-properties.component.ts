import { Component, OnInit } from '@angular/core';

import {UtilityService} from '../../../services/utility.service';
@Component({
  selector: 'app-sub-class-relation-properties',
  templateUrl: './sub-class-relation-properties.component.html',
  styleUrls: ['./sub-class-relation-properties.component.scss']
})
export class SubClassRelationPropertiesComponent implements OnInit {

  constructor(public utilityService:UtilityService) { }

  ngOnInit() {
  }
checkInstanceOfArray(data):boolean{

     if(data instanceof Array){

    //   console.log("this is array");
       return true;
     }
      return false;

  }


 addProperty(){
    let newClassProp = {};
    newClassProp['property-code'] = "";
    newClassProp['property-type'] = "";
    newClassProp['roperty-value'] = "";
    newClassProp['presentation-cntx'] = "";


     if(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"] instanceof Array){
              
        this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"].push(newClassProp);
     
     }
     else{

       let obj=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"];

       //build new array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"]=[];
       
       // add object to array
        if(obj!=undefined){
            this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"].push(obj);
        }
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"].push(newClassProp);
       }

       this.utilityService.updateClassMasterObject();
    }


deleteProperty(index){

     let tmpProperties=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"];
     tmpProperties.splice(index,1);
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();
}


deleteSingleProperty(){     
     let tmpProperties=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"];     
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"]=[];     
     this.utilityService.updateClassMasterObject();
}


deleteSingleSubProperty(parentIndex , childIndex){
   
     let tmpProperties=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"]["class-rel-property-cnfg"];    
     tmpProperties.splice(childIndex,1);
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"]["class-rel-property-cnfg"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();

}


addSubProperty(parentIndex){
    let newClassProp = {};
    newClassProp['property-code'] = "";
    newClassProp['property-type'] = "";
    newClassProp['property-value'] = "";
    newClassProp['presentation-cntx'] = "";


       
   

    if(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"] instanceof Array){
       if(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"][parentIndex]!=undefined){       
         this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"][parentIndex]["class-rel-property-cnfg"].push(newClassProp);
       }else{
        let obj=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"];

       //build new array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"]=[];
       
       // add object to array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"].push(obj);
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"][parentIndex]["class-rel-property-cnfg"].push(newClassProp);

       }
     }
     else{

       let obj=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"];

       //build new array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"]=[];
       
       // add object to array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"].push(obj);
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"][0]["class-rel-property-cnfg"].push(newClassProp);
       }

       this.utilityService.updateClassMasterObject();
    }

 copySubProperty(parentIndex , childIndex){
   
     let copyObject=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"][parentIndex]["class-rel-property-cnfg"][childIndex];    
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"][parentIndex]["class-rel-property-cnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}
    copySingleSubProperty(parentIndex , childIndex){
     // console.log("copySingleSubProperty----");
     let originalSubObj=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"];//["class-rel-property-cnfg"];
     let copyObject=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"]["class-rel-property-cnfg"][childIndex];    
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"]=[];

    
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"].push(originalSubObj);
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"][0]["class-rel-property-cnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}



copyProperty(parentIndex){
   
   //  console.log(parentIndex);
     let copyObject=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"][parentIndex];    
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-relation-ref"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}


}
