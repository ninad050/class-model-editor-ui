import { Component, OnInit,OnDestroy  } from '@angular/core';
import {UtilityService} from '../../../services/utility.service';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-sub-class',
  templateUrl: './sub-class.component.html',
  styleUrls: ['./sub-class.component.scss']
})
export class SubClassComponent implements OnInit,OnDestroy  {
 public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete?';
  
  constructor(public utilityService:UtilityService,private dragulaService: DragulaService) {
        // dragulaService.setOptions('bag-task1',{
   }
   dropInstance;
  ngOnInit() {

   this.utilityService.removeAllBasketRef(this.dragulaService);
    let tempCurrentObj=this;
    let sibilingOj;
    this.dragulaService.setOptions('bag-task1', {
       accepts: function(el, target, source, sibling) {
        sibilingOj=sibling;
        return true;
      }
    });

     this.dropInstance=this.dragulaService.drop.subscribe((value) => {
    //   console.log("on drop"+value[1].id+"-------sibling obj"+sibilingOj.id);
         let tmpProperties=tempCurrentObj.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"];
          tmpProperties= tempCurrentObj.utilityService.reOrderElementsInArray(tmpProperties,value[1].id,sibilingOj);
      //    console.log(JSON.stringify(tmpProperties)); 
          tempCurrentObj.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"]=tmpProperties;     
           tempCurrentObj.utilityService.updateClassMasterObject();
          
      //this.onDrop(value.slice(1));
    });
   
  }
  
  
addProperty(loadDataModel){
     let  newClassProp={};
     newClassProp['propertyCode']="";
     newClassProp['presentationCntx']="";
     newClassProp['propertyType']="";
     newClassProp['propertyValue']="";


     if(this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"] instanceof Array){
              
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"].push(newClassProp);
     
     }
     else{

       let obj=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"];

       //build new array
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"]=[];
       
       // add object to array
        if(obj!=undefined){
          this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"].push(obj);
        }
          this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"].push(newClassProp);
       }
       
       this.utilityService.updateClassMasterObject();
       }


checkInstanceOfArray(data):boolean{             
         if(data instanceof Array){
          return true;
        }
        return false;
  }

    

deleteProperty(item,index){
//console.log("delete property");
     let tmpProperties=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"];
     tmpProperties.splice(index,1);
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();
}


deleteSingleProperty(){     
     let tmpProperties=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"];     
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"]=[];     
     this.utilityService.updateClassMasterObject();
}

copyProperty(parentIndex){
   
     let copyObject=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"][parentIndex];    
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();
}
    copySIngleProperty(parentIndex){
   
     let copyObject=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"]; 
      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"]=[];     
      
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"].push(copyObject);     
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["ownerCntx"][0]["classPropertyCnfg"].push(copyObject);     
    
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
  
}
