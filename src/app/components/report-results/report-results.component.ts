import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportData } from '../../services/report.service';

@Component({
  selector: 'app-report-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-results.component.html',
  styleUrls: ['./report-results.component.scss']
})
export class ReportResultsComponent {
  @Input() reportData: ReportData[] = [];
  @Output() backToSearch = new EventEmitter<void>();
  
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  get paginatedData() {
    const start = this.pageIndex * this.pageSize;
    return this.reportData.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.reportData.length / this.pageSize);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered': return 'delivered';
      case 'transit': return 'transit';
      case 'pending': return 'pending';
      default: return '';
    }
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  }

  nextPage() {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
    }
  }

  lastPage() {
    this.pageIndex = this.totalPages - 1;
  }

  onBackToSearch() {
    this.backToSearch.emit();
  }
}