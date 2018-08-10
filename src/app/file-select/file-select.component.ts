import { MessageService } from './../services/MessageService';
import { Component, OnInit, } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

//import { EventEmitter } from 'events';

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FileSelectComponent implements OnInit {
  Files: any[];
  selectedFile: String;

  constructor(private _messageService: MessageService,private http:Http,private router: Router,) { }

  ngOnInit() {

    this.http.get('http://localhost:8080/list')
    .subscribe(response => {
      console.log(response);
      this.Files = response.json()

    });
  }
 

  selectXMLFile(name){
    this.selectedFile = name;
    console.log(this.selectedFile)
  }
  redirect(){
      this._messageService.filter(this.selectedFile);
      this.router.navigateByUrl('');
  }

  }
