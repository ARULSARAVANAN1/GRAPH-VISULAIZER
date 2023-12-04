import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { DataserviceService } from 'src/app/shared/service/dataservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css'],
})
export class FileDialogComponent {
  selectedFile!: File;
  excelData !:any;
  loader:boolean = false;

  constructor(
    private dataservice: DataserviceService,
    private matDialog: MatDialog,
    private toastr:ToastrService
  ) {}

  onFileSelected(event: any) {
    this.loader = true;
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsBinaryString(this.selectedFile);
      reader.onload = (e: any) => {
        var workbook = XLSX.read(reader.result,{type:'binary'});
        var sheets = workbook.SheetNames;
        this.excelData =  XLSX.utils.sheet_to_json(workbook.Sheets[sheets[0]]);

        const userId = sessionStorage.getItem('userId');
        if (userId) {
          const fileName = this.selectedFile.name;
          const key = 'excelData-' + userId;
          const uploadDate = new Date();

          const dataToStore = {
            filename: fileName,
            data: this.excelData,
            uploadDate: uploadDate.toISOString() // Convert date to string for storage
          };


          localStorage.setItem(key,JSON.stringify(dataToStore));
          this.dataservice.fileUploaded.next("fileUploaded");
          this.toastr.success('File Uploaded Successfully');
        }
      };
      this.matDialog.closeAll();
      this.loader = !this.loader;
    }
  }

  downloadExcelFile() {
    const fileName = 'template.xlsx'; // Name for the downloaded file
    const wb = XLSX.utils.book_new();
    // const wsData = [['Time', 'Temperature']];
    const wsData = [
          ['Time', 'Temperature'],
          ['11', 30],
          ['12', 32],
          ['13', 31],
          ['14', 30]]     
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  // Convert string to ArrayBuffer
  s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }
}
