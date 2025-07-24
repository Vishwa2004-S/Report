import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReportData {
  hawb_no: string;
  hawb_date: string;
  total_carton: string;
  total_weight: string;
  receiver_name: string;
  receiver_district_name: string | null;
  invoice_status: string;
  commercial_invoice_no: string | null;
  customer_name: string;
  sender_name: string;
  facility: string | null;
  commercial_invoice_value: string;
  delivery_date: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://45.118.162.26:81/Maran_logistics/origin_php/api_php_booking/index.php/get_Hawb_Details_by_date_wise';

  constructor(private http: HttpClient) {}

  getReportsByDate(fromDate: string, toDate: string): Observable<{status: string, code: string, data: ReportData[]}> {
    const params = {
      from_date: this.formatDate(fromDate),
      to_date: this.formatDate(toDate),
      client_id: '-1',
      customer_name: '-1',
      facility: '-1'
    };
    return this.http.get<{status: string, code: string, data: ReportData[]}>(this.apiUrl, { params });
  }

  private formatDate(date: string): string {
    // Convert date to YYYY-MM-DD format if needed
    return new Date(date).toISOString().split('T')[0];
  }
}