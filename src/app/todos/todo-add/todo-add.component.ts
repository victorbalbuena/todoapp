import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { crear } from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
  myGroup: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>) {
    this.myGroup = new FormGroup({
      txtInput: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  agregar() {
    if (this.myGroup.invalid) {
      return;
    }

    console.log(this.TxtInput?.value);

    this.store.dispatch(crear({ texto: this.TxtInput?.value }));

    this.TxtInput?.reset();
  }

  get TxtInput() {
    return this.myGroup.get('txtInput');
  }
}
