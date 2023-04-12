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
  constructor(private uploadExcelService: UploadExcelService, private loginService :LoginService) {}

  ngOnInit(): void {}

  fileName: any;

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

  private finishedOperation : boolean = false;

  getFinishedOperation(){
    return this.finishedOperation
  }

  setFinishedOperation(value : boolean){
    this.finishedOperation = value
  }

  private jsonData: any;

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   const fileReader = new FileReader();
  //   fileReader.readAsArrayBuffer(file);
  //   fileReader.onload = () => {
  //     const arrayBuffer = fileReader.result;
  //     const data = new Uint8Array();
  //     const workbook = XLSX.read(data, { type: 'array' });
  //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  //     const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

  //     //const formData = new FormData();
  //     //const name = this.parseFileName(data.attachment.name);
  //     //formData.append('attachment', data.attachment.file, name);

  //     this.uploadExcelService.sendToBackend(jsonData);
  //   };
  // }

  onFileChange(ev: any) {
    this.setFilesUploaded(false);
    this.setFileLoading(true);
    this.error = false;
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
      this.setFilesUploaded(true);
      this.setFileLoading(false);

      //this.uploadExcelService.sendToBackend(json_data);
      // json_data.map((item) => {
      //   let item_str = String(item);
      //   if (item_str != '') this.mainService.addOriginal_urls_list(item_str);
      // });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  public sendToBackend() {
    console.log('Data sent :', this.jsonData);
    this.setFilesUploaded(false);
    this.setFileLoading(true);
    this.setFinishedOperation(false)
    this.error = false;
    this.uploadExcelService.sendToBackend(this.jsonData).subscribe(
      (response) => {
        console.log('Data received :', response);
        this.uploadExcelService.downloadExcelFile(response, 'response.xlsx');
        this.setFilesUploaded(true);
        this.setFileLoading(false);
        this.setFinishedOperation(true);
      },
      (error) => {
        console.error('Error while sending data:', error);
        this.setFilesUploaded(true);
        this.setFileLoading(false);
        this.error = true;
      }
    );
  }

  public teste(){
    this.uploadExcelService.test().subscribe( (r) => console.log(r)  )
  }

  logout(){
    this.loginService.logout()
  }
}
