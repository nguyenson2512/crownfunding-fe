import {
  Directive,
  Renderer2,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';

const SCROLLBAR_WIDTH = 20;

@Directive({
  selector: '[appNgxDatatableEmptyRow]',
})
export class NgxDatatableEmptyRowDirective
  implements AfterViewInit, AfterViewChecked, OnDestroy {
  private datatableBodyEl: HTMLElement;
  private datatableEmptyRowEl: HTMLElement;
  private datatableRowCenterEl: HTMLElement;
  private removeEventListener: () => void;

  constructor(private renderer: Renderer2, private hostElRef: ElementRef) {}

  ngAfterViewInit() {
    this.setUpElementReferences();
    if (this.isDatatableEmpty) {
      this.createEmptyCellWidth();
      this.setUpHeaderScrollListener();
    }
  }

  ngAfterViewChecked() {
    if (this.isDatatableEmpty) {
      this.createEmptyCellWidth();
    }
  }

  ngOnDestroy() {
    if (this.removeEventListener) {
      this.removeEventListener();
      this.removeEventListener = null;
    }
  }

  private setUpHeaderScrollListener() {
    this.removeEventListener = this.renderer.listen(
      this.datatableBodyEl,
      'scroll',
      (event: any) => {
        if (this.isDatatableEmpty) {
          this.renderer.setStyle(
            this.datatableRowCenterEl,
            'transform',
            `translate(-${event.srcElement.scrollLeft}px,  0px)`
          );
        }
      }
    );
  }

  private createEmptyCellWidth() {
    const newWidth = this.datatableRowCenterEl.style.width;
    if (
      newWidth &&
      parseInt(newWidth, 10) - SCROLLBAR_WIDTH >
        this.datatableEmptyRowEl.offsetWidth
    ) {
      this.renderer.setStyle(this.datatableEmptyRowEl, 'width', newWidth);
    }
  }

  private setUpElementReferences() {
    const hostEl = this.hostElRef.nativeElement;
    this.datatableBodyEl = hostEl.getElementsByClassName('datatable-body')[0];
    this.datatableEmptyRowEl = hostEl.getElementsByClassName('empty-row')[0];
    this.datatableRowCenterEl = hostEl.getElementsByClassName(
      'datatable-row-center'
    )[0];
  }

  private get isDatatableEmpty(): boolean {
    const hostEl = this.hostElRef.nativeElement;
    this.datatableEmptyRowEl = hostEl.getElementsByClassName('empty-row')[0];
    return !!this.datatableEmptyRowEl;
  }
}
