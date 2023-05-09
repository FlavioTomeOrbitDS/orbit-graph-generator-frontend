import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadExcelService {
  private url = 'http://127.0.0.1:8080';
  //private url = 'https://api-test-2n5o6txceq-rj.a.run.app/'
  //private url = 'https://orbit-graph-generator-backend-2n5o6txceq-rj.a.run.app';
  constructor(private httpClient: HttpClient) {}

  // public sendToBackend(data: any): void {
  //   this.httpClient
  //     .post<any>(this.url, data, {
  //       responseType: 'blob' as 'json',
  //     })
  //     .subscribe((response) => {
  //       this.downloadExcelFile(response, 'response.xlsx');
  //       console.log(response);
  //     });
  //}

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
      this.url + '/api/download',
      data,
      httpOptions
    );
  }

  test(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/iniciaupload');
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
  }
}
