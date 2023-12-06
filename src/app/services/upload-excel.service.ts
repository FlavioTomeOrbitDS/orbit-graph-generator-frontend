import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root',
})
export class UploadExcelService {
  //private url = 'http://127.0.0.1:8080';
  private url = 'https://orbit-score-backend-xgmsewclfa-uc.a.run.app/';
  
  constructor(private httpClient: HttpClient) {}

  
  sendToBackend(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      }),
      responseType: 'blob' as 'json',
      withCredentials: true,
    };

    return this.httpClient.post<any>(
      this.url + '/api/gettoal',
      data,
      httpOptions
    );
  }

  
  downloadExcelFile(data: any, filename: string) {
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, 'output.xlsx');
  }

  uploadToBackend(formData: any): Observable<any> {
    const httpOptions = {
      
    };
     

    // let data = JSON.stringify(formData)
     //console.log(data)
    return this.httpClient.post(this.url + '/api/gettotal', formData, httpOptions);
  }
}
