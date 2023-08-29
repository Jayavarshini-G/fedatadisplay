// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-data-table',
//   templateUrl: './data-table.component.html',
//   styleUrls: ['./data-table.component.css']
// })
// export class DataTableComponent implements OnInit {
//   data: any[] = [];
//   displayedColumns: string[] = [];
//   selectedColumns: { [key: string]: boolean } = {}; // Use an object to store selected columns

//   startIndex = 0;
//   rowsToAdd = 20;

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.fetchData();
//   }

//   fetchData(): void {
//     this.http.get<any[]>('https://raw.githubusercontent.com/Jayavarshini-G/nghamburger/main/data.json').subscribe(
//       (data) => {
//         this.data = data;
//         this.displayedColumns = Object.keys(data[0]);
//         // Initialize selectedColumns object with all columns initially selected
//         for (const column of this.displayedColumns) {
//           this.selectedColumns[column] = true;
//         }
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   }

//   showNextRows(): void {
//     this.startIndex += this.rowsToAdd;
//     this.rowsToAdd += 20;
//   }

//   getDisplayedRows(): any[] {
//     const endIndex = Math.min(this.startIndex + this.rowsToAdd, this.data.length);
//     return this.data.slice(0, endIndex);
//   }
// }









// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-data-table',
//   templateUrl: './data-table.component.html',
//   styleUrls: ['./data-table.component.css']
// })
// export class DataTableComponent implements OnInit {
//   data: any[] = [];
//   displayedColumns: string[] = [];
//   selectedColumns: { [key: string]: boolean } = {};
//   startIndex = 0;
//   rowsPerBatch = 20; // Number of rows to display per batch
//   currentBatchIndex = 0; // Track the current batch of rows

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.fetchData();
//   }

//   fetchData(): void {
//     this.http.get<any[]>('https://raw.githubusercontent.com/Jayavarshini-G/nghamburger/main/data.json').subscribe(
//       (data) => {
//         this.data = data;
//         this.displayedColumns = Object.keys(data[0]);
//         for (const column of this.displayedColumns) {
//           this.selectedColumns[column] = true;
//         }
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   }

//   showNextRowsBatch(): void {
//     this.currentBatchIndex++;
//   }

//   getDisplayedRows(): any[] {
//     const start = this.currentBatchIndex * this.rowsPerBatch;
//     const end = start + this.rowsPerBatch;
//     return this.data.slice(0, end);
//   }

//   showNextColumns(): void {
//     this.startIndex += this.rowsPerBatch;
//   }

//   getDisplayedColumns(): string[] {
//     const endIndex = Math.min(this.startIndex + this.rowsPerBatch, this.displayedColumns.length);
//     return this.displayedColumns.slice(0, endIndex);
//   }
// }










import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  data: any[] = [];
  displayedColumns: string[] = [];
  selectedColumns: { [key: string]: boolean } = {};
  startIndex = 0;
  columnsPerBatch = 10;
  currentBatchIndex = 0;
  rowsPerBatch = 10;
  columnsDropdown: string[] = [];
  showColumnCheckboxes = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any[]>('https://raw.githubusercontent.com/Jayavarshini-G/nghamburger/main/data.json').subscribe(
      (data) => {
        this.data = data;
        this.displayedColumns = Object.keys(data[0]);
        this.columnsDropdown = this.displayedColumns.slice(0, this.columnsPerBatch);
        for (const column of this.displayedColumns) {
          this.selectedColumns[column] = true;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  showNextColumnsBatch(): void {
    this.currentBatchIndex++;
    const start = this.currentBatchIndex * this.columnsPerBatch;
    const end = start + this.columnsPerBatch;
    this.columnsDropdown = this.displayedColumns.slice(0, end);
  }

  getDisplayedColumns(): string[] {
    const start = 0; // Start from the first column
    const end = (this.currentBatchIndex + 1) * this.columnsPerBatch; // Include both previous and current batch columns
    return this.displayedColumns.slice(start, end);
  }

  showNextRowsBatch(): void {
    this.startIndex += this.rowsPerBatch;
  }

  getDisplayedRows(): any[] {
    const endIndex = Math.min(this.startIndex + this.rowsPerBatch, this.data.length);
    return this.data.slice(0, endIndex);
  }

  toggleColumnCheckboxes(): void {
    this.showColumnCheckboxes = !this.showColumnCheckboxes;
  }
}
