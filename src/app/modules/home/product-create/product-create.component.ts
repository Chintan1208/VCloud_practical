import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  productForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: ['']
    });
  }

  submitForm() {
    this.crudService.create(this.productForm.value).subscribe((res) => {
      // this.crudService.showSpinner(); 
      this.router.navigateByUrl('home/product-listing');
      this.toastr.success('Product Created', '', {
        timeOut: 1500,
      });
    });
  }
}
