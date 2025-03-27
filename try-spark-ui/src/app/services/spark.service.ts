import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CodeRequest {
  code: string;
  language: string;
}

@Injectable({
  providedIn: 'root'
})
export class SparkService {
  private apiUrl = 'http://localhost:8000/run-job';

  constructor(private http: HttpClient) {}

  runCode(code: string, language: string): Observable<any> {
    const payload: CodeRequest = { code, language };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
