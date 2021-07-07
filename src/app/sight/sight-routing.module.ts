import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SightAddEditComponent} from './components/sight-add-edit/sight-add-edit.component';

const routes: Routes = [
  {path: 'add', component: SightAddEditComponent},
  {path: 'edit', component: SightAddEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SightRoutingModule {
}
