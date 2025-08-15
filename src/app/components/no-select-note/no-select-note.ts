import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'no-select-note',
  templateUrl: './no-select-note.html',
  styleUrl: './no-select-note.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoSelectNote {
}
