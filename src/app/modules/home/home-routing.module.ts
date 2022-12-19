import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'src/app/guard/authguard.guard';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  {
    path: 'product-listing',
    component: ProductListComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'product-create',
    component: ProductCreateComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'product-update/:id',
    component: ProductUpdateComponent,
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
