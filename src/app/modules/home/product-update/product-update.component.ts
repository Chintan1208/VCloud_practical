import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent {
  productForm: FormGroup;
  productData: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.productData = this.route.snapshot.paramMap.get('id');
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
    });
  }

  ngOnInit(): void {
    this.getProductById();
  }

  submitForm() {
    this.crudService
      .update(this.productData, this.productForm.value)
      .subscribe((res) => {
        this.toastr.success('Product Updated', '', {
          timeOut: 1500,
        });
        this.router.navigateByUrl('home/product-listing');
      });
  }

  getProductById() {
    this.crudService.getById(this.productData).subscribe((data) => {
      this.productForm.patchValue({
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
      });
    });
  }
}
