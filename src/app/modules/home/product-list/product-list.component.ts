import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: any;
  isDesc: boolean = false;
  column: string = 'CategoryName';
  searchText: string;

  constructor(
    private router: Router,
    public crudService: CrudService,
    private toastr: ToastrService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getProductList();
    
  }

  getProductList() {
    this.crudService.showSpinner();
    this.crudService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  btnClick() {
    this.router.navigateByUrl('home/product-create');
  }

  logoutuser(){
    this._auth.logout();
    this.router.navigateByUrl('/login');
    this.toastr.success('User Logged Out Successfully', '', {
      timeOut: 1500,
    });
  }

  deleteProduct(product: any) {
    this.crudService.delete(product.id).subscribe((data) => {
      if (data) {
        this.toastr.success('Product Deleted Successfully', '', {
          timeOut: 1500,
        });
      }
      this.getProductList();
    });
  }

  editProduct(product: any) {
    this.router.navigate(['home/product-update/', product.id]);
  }

  gotoProductDetails(product: any) {
    this.router.navigate(['home/product-details/', product.id]);
  }

  sort(property: any) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.products.sort(function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
