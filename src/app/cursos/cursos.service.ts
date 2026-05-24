import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestReportResponse } from './cursos.types';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly url = 'https://besvc.capacitateparaelempleo.org/api/inscriptions/TestReport';

  constructor(private http: HttpClient) {}

  getTestReport(): Observable<TestReportResponse> {
    return this.http.get<TestReportResponse>(this.url);
  }
}