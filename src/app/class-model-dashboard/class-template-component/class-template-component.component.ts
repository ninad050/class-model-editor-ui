import { Component, OnInit , Input, AfterViewInit, OnChanges} from '@angular/core';
import { UtilityService } from '../../services/utility.service';
import { HttpService } from '../../services/httpservice/http.service';
import { ClassTemplateService} from '../class-template-component/class-template.service';
import { Router} from '@angular/router';



@Component({
  selector: 'app-class-template-component',
  templateUrl: './class-template-component.component.html',
  styleUrls: ['./class-template-component.component.scss']
})
export class ClassTemplateComponentComponent implements OnInit {

  checkStatusFlag: boolean=true;

@Input()
classObject: any;
appCntx:any;

 constructor(public utilityService: UtilityService,
             private classTemplateService: ClassTemplateService,
             private router: Router) { }

  ngOnInit() {
    this.utilityService.fileDeleteStatus.subscribe(
      (status: string) => this.updateActiveTabClass()
    );
    
  //console.log("templeate init----"+JSON.stringify(this.utilityService.currentClassObject));
    //console.log("currentFileEditFlag----"+this.currentFileEditFlag+"file----"+this.utilityService.curentFileName);
    this.utilityService.currentHeadTab="tab1";
    this.router.navigateByUrl('/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class)',{skipLocationChange:true});
  }

updateActiveTabClass(){
  console.log("inside update active tab class");
  for(let i=0;i<this.utilityService.headTabs.length;i++){
    document.getElementById("tab_"+this.utilityService.headTabs[i].id).className="nav-link"
  }
   document.getElementById("tab_tab1").className="nav-link active";
 

}
  isActiveTab(tab:String): String {
    return this.utilityService.isActiveTab(tab);
  }


  navigateTo(id: String) {
    let url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class)';
    switch (id) {


      case 'tab1':
      url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class)';
      break;

      case 'tab2':
      url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class-dependancies)';
      break;

      case 'tab3':
      url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class-atrribute)';
      break;
       case 'tab4':
      url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class-atrribute-properties)';
      break;

      case 'tab5':
      url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class-trigger-action)';
      break;

      case 'tab6':
      url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class-trigger-action-properties)';
      break;

      case 'tab7':
      url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class-relation)';
      break;
      case 'tab8':
      url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class-relation-properties)';
      break;

      default:
      url = '/dashboard/classModelDashboard/classTemplate/(subtabs:sub-class)';
    }

    this.router.navigateByUrl(url, {skipLocationChange: true});
  }
saveData(){
  console.log("updating storage...");
    this.utilityService.updateDataInStorage();
    this.utilityService.showToastMsg("Updated Successfully",1);
  }



trimFileName(fileName){
  //console.log("trim file----")
   //this.currentFileEditFlag=localStorage.getItem(this.utilityService.curentFileName);
   // console.log("currentFileEditFlag----"+this.currentFileEditFlag+"file----"+this.utilityService.curentFileName);
   
  if(fileName!=null)
  {
    var fname=fileName;
    fname=fname.replace(/^.*(\\|\/|\:)/, '');
    return fname;
  }
  }
}
