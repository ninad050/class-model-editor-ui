import { EventEmitter, Injectable , OnInit, AfterViewInit } from '@angular/core';
import {HttpService} from './../../services/httpservice/http.service';
import { UtilityService } from '../../services/utility.service';

@Injectable()
export class ClassTemplateService implements OnInit{

    constructor(private httpService: HttpService) {

    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }


   currentClassObj: any;
   objectData = new EventEmitter<any>();


   propertyList = [
       {
        name: 'Master prop',
        idEle: '1'
        },
        {
        name: 'Test prop',
        idEle: '2'
        }
    ];

  propertyListFlag = new EventEmitter<string>();
  getPropertyList() {
      return this.propertyList.slice();
  }
  addNewProperty() {
      this.propertyList.push({name: 'test1', idEle: '3'});
      this.propertyListFlag.emit('true');
  }
   deleteProperty(tempId: string) {
        for (let i = 0, max = this.propertyList.length; i < max; i++) {
                let a = this.propertyList[i];
                  if (a.idEle === tempId) {
                        this.propertyList.splice(i, 1);
                        break;
                    }
         }
        this.propertyListFlag.emit('true');
    }


  parseData(response: any) {
      this.currentClassObj = response;
      this.objectData.emit(true);
  }

  getCurrentObject() {
    this.httpService.getClassJson().subscribe((response)=>
    this.parseData(response)
    );
  }

 

}
