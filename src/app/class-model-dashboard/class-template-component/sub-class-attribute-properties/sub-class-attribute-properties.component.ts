import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../../../services/utility.service';


@Component({
  selector: 'app-sub-class-attribute-properties',
  templateUrl: './sub-class-attribute-properties.component.html',
  styleUrls: ['./sub-class-attribute-properties.component.scss']
})
export class SubClassAttributePropertiesComponent implements OnInit {

  constructor(public utilityService:UtilityService) { }

  ngOnInit() {
  }

   addProperty(){
    let newClassProp = {};
    newClassProp['property-code'] = "";
    newClassProp['property-type'] = "";
    newClassProp['property-value'] = "";
    newClassProp['presentation-cntx'] = "";

       let newClassPropObj = {};
       newClassPropObj["class-attr-property-cnfg"]=[];
       newClassPropObj["class-attr-property-cnfg"][0]=newClassProp;
       
       
   


     if(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"] instanceof Array){
              
        this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"].push(newClassPropObj);
     
     }
     else{

       let obj=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"];

       //build new array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"]=[];
       
       // add object to array
        if(obj!=undefined){
         this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"].push(obj);
        }
         this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"].push(newClassPropObj);
       }

       this.utilityService.updateClassMasterObject();
    }


    addSubProperty(parentIndex){
      //console.log("add sub property---");
    let newClassProp = {};
    newClassProp['property-code'] = "";
    newClassProp['property-type'] = "";
    newClassProp['property-value'] = "";
    newClassProp['presentation-cntx'] = "";

       
   


     if(this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"] instanceof Array){
              
        this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"][parentIndex]["class-attr-property-cnfg"].push(newClassProp);
     
     }
     else{

       let obj=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"];

       //build new array
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"]=[];
       
       // add object to array
        if(obj!=undefined){
          this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"].push(obj);
        }
       this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"][1]["class-attr-property-cnfg"].push(newClassProp);
       }

       this.utilityService.updateClassMasterObject();
    }



deleteProperty(item,index){

     //console.log(index);

     let tmpProperties=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"];
     tmpProperties.splice(index,1);
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();
}


deleteSingleProperty(){     
     let tmpProperties=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"];     
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"]=[];     
     this.utilityService.updateClassMasterObject();
}


deleteSubProperty(parentIndex , childIndex){
   
     let tmpProperties=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"][parentIndex]["class-attr-property-cnfg"];    
     tmpProperties.splice(childIndex,1);
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"][parentIndex]["class-attr-property-cnfg"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();

}

copySubProperty(parentIndex , childIndex){
   
     let copyObject=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"][parentIndex]["class-attr-property-cnfg"][childIndex];    
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"][parentIndex]["class-attr-property-cnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}



copyProperty(parentIndex){
   
     //console.log(parentIndex);
     let copyObject=this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"][parentIndex];    
     this.utilityService.currentClassObject["class-xml"]["class-cnfg"]["owner-cntx"]["class-attribute-ref"].push(copyObject);     
     this.utilityService.updateClassMasterObject();

}


  
}
