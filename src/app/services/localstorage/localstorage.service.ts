import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getClassMasterObject():any{
     let object=localStorage.getItem("class_master");
     let parseObj=new Object();
     if(object!=undefined && object!=null && object!=""){       
       parseObj=JSON.parse(object);
     }

     return parseObj;
  }


  setClassMasterObject(data:any){
    let jsondata=JSON.stringify(data);
    if(jsondata!=undefined){
    localStorage.setItem("class_master",jsondata);
    }
  }
}
