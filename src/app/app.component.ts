import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'first-project-angular';
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('angular17crud');
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModel() {
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.studentObj = new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  saveStudent() {
    const isLocalPresent = localStorage.getItem('angular17crud');

    if (isLocalPresent != null) {
      const oldArrary = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArrary.length + 1;
      oldArrary.push(this.studentObj);
      this.studentList = oldArrary;
      localStorage.setItem('angular17crud', JSON.stringify(oldArrary));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.closeModel();
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }

  updateStudent() {
    const currentRecord = this.studentList.find(
      (m) => m.id === this.studentObj.id
    );

    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.state = this.studentObj.state;
      currentRecord.pincode = this.studentObj.pincode;
      currentRecord.email = this.studentObj.email;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      currentRecord.city = this.studentObj.city;
    }
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModel();
  }

  onDelete(item: Student) {
    const isDelet = confirm('Are you sure want to Delete?');
    if (isDelet) {
      const currentRecord = this.studentList.find(
        (m) => m.id === this.studentObj.id
      );
      // this.studentList.splice(currentRecord, 1);
    }
  }
}

export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
}
