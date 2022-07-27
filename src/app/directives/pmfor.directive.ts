import { Directive, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[pmRepeat]'
})
export class PmforDirective {

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input('pmRepeat')
  set times(times: number) {
    for (let i=0; i<times; i++){
      this.viewContainer.createEmbeddedView(this.template);
    }
  }

}
