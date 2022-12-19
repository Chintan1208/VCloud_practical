import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productData: any;
  discription: any;

  constructor(
    private router: Router,
    public crudService: CrudService,
    private route: ActivatedRoute
  ) {
    this.productData = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    this.crudService.showSpinner(); 
    this.crudService.getById(this.productData).subscribe((data) => {
      this.discription = data.description;
    });
  }
}
