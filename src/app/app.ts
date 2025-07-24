import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportSearchComponent } from './components/report-search/report-search.component';
import { ReportResultsComponent } from './components/report-results/report-results.component';
import { ReportService, ReportData } from './services/report.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ReportSearchComponent,
    ReportResultsComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  @ViewChild(ReportSearchComponent) reportSearchComponent!: ReportSearchComponent;
  showResults = false;
  isLoading = false;
  reportData: ReportData[] = [];

  constructor(private reportService: ReportService) {}

  onSearch(params: {fromDate: string, toDate: string}) {
    this.isLoading = true;
    this.reportService.getReportsByDate(params.fromDate, params.toDate)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status === 'success' && response.data && response.data.length > 0) {
            this.reportData = response.data;
            this.showResults = true;
            this.reportSearchComponent.showNoRecordsError = false;
          } else {
            this.showResults = false;
            this.reportSearchComponent.showNoRecordsMessage();
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error fetching reports:', err);
          this.reportData = [];
          this.showResults = false;
        }
      });
  }

  onBackToSearch() {
    this.showResults = false;
  }
}