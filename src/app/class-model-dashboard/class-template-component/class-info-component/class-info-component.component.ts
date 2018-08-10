import { Component, OnInit ,Input } from '@angular/core';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-class-info-component',
  templateUrl:'./class-info-component.component.html',
  styleUrls: ['./class-info-component.component.scss']
})
export class ClassInfoComponentComponent implements OnInit {


  constructor(public utilityService:UtilityService){

  }
  ngOnInit() {
   


  }
}
