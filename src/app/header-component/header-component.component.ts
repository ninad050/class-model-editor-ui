import { Component, OnInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {
  
 
  constructor(private router: Router,public utilityService: UtilityService) { 
 
  }

  ngOnInit() {
    
  }
  goBack(){
    this.utilityService.classObjectList.forEach(element => {
      if(element!=null && element!=undefined){
        console.log("making false-------");
        element["newTab"]=false;
      }
     });
    this.utilityService.updateFileInStorge();
    this.router.navigateByUrl('/dashboard/classModel', { skipLocationChange: true });
    this.utilityService.closeButtonDisableFlag=true;
  }

}
