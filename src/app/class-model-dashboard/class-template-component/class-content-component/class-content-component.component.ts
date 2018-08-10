import { Component, OnInit,Input } from '@angular/core';

import { ClassTemplateService } from '../class-template.service';
import {UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-class-content-component',
  templateUrl: './class-content-component.component.html',
  styleUrls: ['./class-content-component.component.scss'],
  providers: [ClassTemplateService]
})
export class ClassContentComponentComponent implements OnInit {
  
 
  propertyList: {name: string, idEle: string}[] = [];
 
  constructor(private classtemplateService: ClassTemplateService , public utilityService:UtilityService) {
    this.classtemplateService.propertyListFlag.subscribe(
      (status: string) => this.propertyList=this.classtemplateService.getPropertyList()
    );
   }

  ngOnInit() {
    this.propertyList=this.classtemplateService.getPropertyList();
  }

  addProperty(){
    this.classtemplateService.addNewProperty();
  }

  deleteProperty(deleteId:string){
     this.classtemplateService.deleteProperty(deleteId);
     console.log("deleting the id"+deleteId);
 }

 
}
