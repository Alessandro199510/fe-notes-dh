import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteForm implements OnInit, OnChanges {

  @Input()
  public note: Note | null;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private stateService: StateService = inject(StateService);
  private toastService: ToastService = inject(ToastService);

  public noteForm!: FormGroup;

  @Output()
  public hideForm: EventEmitter<void>;

  constructor() {
    this.note = null;
    this.noteForm = this.formBuilder.group({});
    this.hideForm = new EventEmitter<void>();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['note']) {
      this.initForm();
    }
  }

  private initForm(): void {
    this.noteForm = this.formBuilder.group({
      title: [this.note?.title || '', [Validators.required]],
      content: [this.note?.content || '', [Validators.required]],
      tags: [this.note?.tags.join(', ') || '', []]
    });
  }

  public onSubmit(): void {
    if (this.noteForm.valid) {

      const formValue = this.noteForm.value;

      let tags: string[] = [];
      if (formValue.tags) {
        tags = formValue.tags.split(',').map((tag: string): string => tag.trim());
      }

      const note: Partial<Note> = {
        title: formValue.title,
        content: formValue.content,
        tags: tags
      };

      if (this.note == null) {
        this.stateService.saveNote(note);
      } else {
        this.stateService.updateNote({
          id: this.note.id,
          status: this.note.status,
          ...note
        });
      }

      this.clearForm();
      this.toastService.showToast('Note saved successfully!', 3000);
      this.hideForm.emit();
    }
  }

  public onCancel(): void {
    this.clearForm();
    this.hideForm.emit();
  }

  private clearForm(): void {
    this.noteForm.reset();
  }
}
