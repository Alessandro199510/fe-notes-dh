import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public showToast(message: string, duration: number = 3000): void {

    const toast: HTMLDivElement = document.createElement('div');
    toast.className = 'toast';

    const icon: HTMLSpanElement = document.createElement('span');
    icon.className = 'toast-icon';
    icon.innerHTML = '&#10003;';
    toast.appendChild(icon);

    const textSpan: HTMLSpanElement = document.createElement('span');
    textSpan.className = 'toast-text';
    textSpan.innerHTML = message;
    toast.appendChild(textSpan);

    const closeButton: HTMLButtonElement = document.createElement('button');
    closeButton.className = 'toast-close';
    closeButton.innerHTML = '&#10005;';
    toast.appendChild(closeButton);
    closeButton.onclick = () => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }

    document.body.appendChild(toast);

    setTimeout((): void => {
      toast.classList.add('show');
    }, 100);

    setTimeout((): void => {
      toast.classList.remove('show');
      setTimeout((): void => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  }
}
