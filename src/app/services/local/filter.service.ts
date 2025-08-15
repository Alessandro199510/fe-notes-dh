import {inject, Injectable} from '@angular/core';
import {NotesStatus} from '../../domain/enums/notes-status.enum';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  public getFilterState(): NotesStatus {
    const status: string | null = this.route.snapshot.queryParamMap.get('status');
    if (status == null){
      return NotesStatus.ACTIVE;
    }else {
      return NotesStatus.ARCHIVED;
    }
  }

  public setFilterState(state: NotesStatus.ACTIVE | NotesStatus.ARCHIVED | null): void {
    console.log(state)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {status: state},
      queryParamsHandling: 'merge'
    });
  }
}
