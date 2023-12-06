import { LoginService } from './../services/login.service';
import { UploadExcelService } from '../services/upload-excel.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  constructor(
    private uploadExcelService: UploadExcelService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  fileName: any;

  file: any;

  public showTable = false

  public json : any [] = []
    
  private filesUploaded: boolean = false;

  public getFilesUploaded() {
    return this.filesUploaded;
  }

  public setFilesUploaded(value: boolean) {
    this.filesUploaded = value;
  }

  private fileLoading: boolean = false;

  public getFileLoading() {
    return this.fileLoading;
  }

  public setFileLoading(value: boolean) {
    this.fileLoading = value;
  }

  private _error: boolean = false;

  public get error(): boolean {
    return this._error;
  }
  public set error(value: boolean) {
    this._error = value;
  }

  private finishedOperation: boolean = false;

  getFinishedOperation() {
    return this.finishedOperation;
  }

  setFinishedOperation(value: boolean) {
    this.finishedOperation = value;
  }

  private jsonData: any;


  
  public sendToBackend() {
    //console.log('Data sent :', this.jsonData);
    //const formData: FormData = new FormData();
    //formData.append('file', this.file, this.file.name);

    this.setFilesUploaded(false);
    this.setFileLoading(true);
    this.setFinishedOperation(false);
    this.error = false;
    console.log(this.jsonData)
    this.uploadExcelService.uploadToBackend(this.jsonData).subscribe(
      (response) => {
        this.json = JSON.parse(response);
        console.log('Data received :', response);
        //this.uploadExcelService.downloadExcelFile(response, 'response.xlsx');
        this.setFilesUploaded(true);
        this.setFileLoading(false);
        this.setFinishedOperation(true);
        this.showTable = true
      },
      (error) => {
        console.error('Error while sending data:', error);
        this.setFilesUploaded(true);
        this.setFileLoading(false);
        this.error = true;
        this.showTable = false
      }
    );
  }

  logout() {
    this.loginService.logout();
  }

  public voltarAoInicio(){
    this.showTable = false
  }

  // onFileChange(event: any) {
  //   //const file: File = event.target.files[0];
  //   this.file = event.target.files[0];
  //   this.setFilesUploaded(false);
  //   this.setFileLoading(true);
  //   this.error = false;
  //   this.fileName = this.file.fileName

  //   const reader = new FileReader();
  //   reader.readAsText(this.file);


  //   reader.onload = (e: any) => {
  //     /* read workbook */
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

  //     /* grab first sheet */
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];

  //     /* save data */
  //     this.jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
  //     console.log(this.jsonData)

  //     this.setFilesUploaded(true);
  //     this.setFileLoading(false);
  //     };
    
  // }

  public test1(){
    interface Person {
      name: string;
      age: number;
      hobbies: string[];
    }

    let person: Person = {
      name: "John Doe",
      age: 30,
      hobbies: ["reading", "coding", "hiking"]
    };


    this.uploadExcelService.uploadToBackend(person).subscribe(
      (response) => {
        console.log('Data received :', response);
        
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );

  }

  onFileChange(ev: any) {
    /* wire up file reader */    
    const target: DataTransfer = <DataTransfer>ev.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    let file = target.files[0];
    this.fileName = file.name;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
       this.jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      
      this.filesUploaded = true;
      //this.showModal('Foram carregados ' + String(tam ) + ' Links!');
    };
    reader.readAsBinaryString(target.files[0]);
  }

}
