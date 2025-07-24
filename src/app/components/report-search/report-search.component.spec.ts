import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-search.component.html',
  styleUrls: ['./report-search.component.scss']
})
export class ReportSearchComponent {
  fromDate: string = '';
  toDate: string = '';
  showDateError: boolean = false;
  hasValidated: boolean = false;
  
  @Output() search = new EventEmitter<{fromDate: string, toDate: string}>();

  validateDates() {
    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);
      this.showDateError = from > to;
      this.hasValidated = true;
    } else {
      this.showDateError = false;
    }
  }

  onSearch() {
    if (!this.hasValidated) {
      this.validateDates();
    }
    
    if (this.showDateError) {
      return;
    }

    if (this.fromDate && this.toDate) {
      this.search.emit({
        fromDate: this.fromDate,
        toDate: this.toDate
      });
    }
  }
}