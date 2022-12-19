import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchpipePipe } from 'src/app/pipe/searchpipe.pipe';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    ProductListComponent,
    SearchpipePipe,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductDetailsComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
})
export class HomeModule {}
