import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Note} from '../../domain/models/note';
import {StateService} from '../../services/state/state.service';
import {ToastService} from '../../services/local/toast.service';

@Component({
  selector: 'note-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './note-form.html',
  styleUrl: './note-form.scss',
  standalone: true
})
export class NoteForm implements OnInit {

  @Input()
  public noteId: string | null;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private stateService: StateService = inject(StateService);
  private toastService: ToastService = inject(ToastService);

  public noteForm!: FormGroup;

  constructor() {
    this.noteId = null;
    this.noteForm = this.formBuilder.group({});
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      tags: ['', []]
    });
  }

  public onSubmit(): void {
    if (this.noteForm.valid) {

      const formValue = this.noteForm.value;

      const tags: string[] = formValue.tags.split(',').map((tag: string): string => tag.trim());

      const note: Partial<Note> = {
        title: formValue.title,
        content: formValue.content,
        tags: tags
      };

      this.stateService.saveNote(note);
      this.clearForm();
      this.toastService.showToast('Note saved successfully!', 3000);
    }
  }

  public onCancel(): void {
    this.clearForm();
  }

  private clearForm(): void {
    this.noteForm.reset();
  }
}
