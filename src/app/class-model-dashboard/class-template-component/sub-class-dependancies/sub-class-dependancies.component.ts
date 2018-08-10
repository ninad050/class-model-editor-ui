import { Component, OnInit,OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import {UtilityService} from '../../../services/utility.service';

@Component({
  selector: 'app-sub-class-dependancies',
  templateUrl: './sub-class-dependancies.component.html',
  styleUrls: ['./sub-class-dependancies.component.scss']
})
export class SubClassDependanciesComponent implements OnInit,OnDestroy {

  constructor(public utilityService:UtilityService,private dragulaService: DragulaService) { }
  dropInstance;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete?';
 
  ngOnInit() {
   
   this.utilityService.removeAllBasketRef(this.dragulaService);
    let tempCurrentObj=this;
    let sibilingOj;
    this.dragulaService.setOptions('bag-task3', {
       accepts: function(el, target, source, sibling) {
        sibilingOj=sibling;
        return true;
      }
    });

    this.dropInstance= this.dragulaService.drop.subscribe((value) => {
     //  console.log("on drop"+value[1].id+"-------sibling obj"+sibilingOj.id);
         let tmpProperties=tempCurrentObj.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"];
          tmpProperties= tempCurrentObj.utilityService.reOrderElementsInArray(tmpProperties,value[1].id,sibilingOj);
           tempCurrentObj.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"]=tmpProperties;     
           tempCurrentObj.utilityService.updateClassMasterObject();
          
      //this.onDrop(value.slice(1));
    });
   
  }
 
addProperty(){
     let  newClassProp={};
     newClassProp['parentClass']="";
     newClassProp['dependencyType']="";
    

     if(this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"] instanceof Array){
              
        this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"].push(newClassProp);
     
     }
     else{

       let obj=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"];

       //build new array
       this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"]=[];
       
       // add object to array
        if(obj!=undefined){
           this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"].push(obj);
        }
           this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"].push(newClassProp);
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
     let tmpProperties=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"];
     tmpProperties.splice(index,1);
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"]=tmpProperties;     
     this.utilityService.updateClassMasterObject();
}


deleteSingleProperty(){     
     let tmpProperties=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"];     
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"]=[];     
     this.utilityService.updateClassMasterObject();
}

copyProperty(parentIndex){
   
     let copyObject=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"][parentIndex];    
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"].push(copyObject);     
     this.utilityService.updateClassMasterObject();
}
    copySIngleProperty(parentIndex){
   
     let copyObject=this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"]; 
      this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"]=[];     
      
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"].push(copyObject);     
     this.utilityService.currentClassObject["classCnfgOrClassRef"][0]["appSpaceCntx_0020"][0]["classDependencyCnfg"].push(copyObject);     
    
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

    isemptyArry(currentarray){
       if(currentarray==null || currentarray==undefined || currentarray.length<=0){
          return true;
        }
        return false;
    }
}
