import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @ViewChild('inputFisico') txtInputFisico?: ElementRef;

  @Input() todo?: Todo;

  editando: boolean = false;

  myGroup!: FormGroup;

  constructor(private store: Store<AppState>) {
    this.myGroup = new FormGroup({
      chkCompletado: new FormControl(this.todo?.completed),
      txtInput: new FormControl(this.todo?.text, Validators.required),
    });
  }

  ngOnInit(): void {
    this.chkCompletado?.valueChanges.subscribe((valor) => {
      this.store.dispatch(toggle({ id: this.todo?.id }));
    });
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico?.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
  }

  get chkCompletado() {
    return this.myGroup.get('chkCompletado');
  }
}
