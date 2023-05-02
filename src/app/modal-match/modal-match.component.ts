import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-modal-match',
  templateUrl: './modal-match.component.html',
  styleUrls: ['./modal-match.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalMatchComponent {
  @Input() selectedMatch: any;
  @Input() currentUser: any;

  constructor(private elementRef: ElementRef) {
  }

  showModal() {
    const modalContent = this.elementRef.nativeElement.querySelector('.modal-content');
    const modal = this.elementRef.nativeElement.querySelector('.modal');
    modalContent.classList.add('bounceIn');
    modal.style.display = 'flex';
  }

  hideModal() {
    const modalContent = this.elementRef.nativeElement.querySelector('.modal-content');
    const modal = this.elementRef.nativeElement.querySelector('.modal');
    if (modal.style.display !== 'none') {
      modalContent.classList.remove('bounceIn');
      modal.style.display = 'none';
    }
  }

  ngOnInit(): void {
  }
}
