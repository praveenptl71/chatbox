import { NgModule } from '@angular/core';
import { LineBreakPipe } from './line-break.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    LineBreakPipe
  ],
  exports: [
    LineBreakPipe
  ]
})
export class ApplicationPipesModule {}