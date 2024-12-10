import { Component, OnInit } from '@angular/core';
import { NgIf,NgFor,NgClass } from '@angular/common';
import { ProductsService } from '../../../../service/product/products.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../../../../service/category/categories.service';
import { Product } from '../../../../Entity/Product';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgFor, NgIf, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

constructor(private productService: ProductsService,private notify: ToastrService,private formBuilder: FormBuilder,private categoryService: CategoriesService){}

products !: any
showAddProducts : boolean = false
addProductsForm!: FormGroup;
categories : any[]=[]
models !:any
addedProduct !: Product
ngOnInit(): void {
    this.productService.getProductsIndex().subscribe((data: any) => {
      
      this.products=data.$values
    })
    this.categoryService.getCategoryWithOutProducts().subscribe((data: any) => {
    
      data.$values.filter((cat : any) => cat.$ref == null).forEach((cat : any) => cat.inverseParentProductCategory.$values.forEach((subCat : any) => this.categories.push(subCat)));
      
    })
    this.productService.getModels().subscribe((data: any) => {
      console.log(data);
      this.models=data.$values
    })
    this.addProductsForm=this.formBuilder.group(
    {
      name: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(15),]),
      productNumber: new FormControl(null, [Validators.required,Validators.minLength(4),Validators.maxLength(10),]),
      color: new FormControl("red", [Validators.required]),
      standardCost: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(10),]),
      listPrice: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(10),]),
      size: new FormControl(null, [Validators.required,Validators.minLength(1),Validators.maxLength(2),]),
      weight: new FormControl(null, [Validators.required,Validators.minLength(1),Validators.maxLength(10),]),
      productCategoryId: new FormControl(5, [Validators.required]),
      productModelId: new FormControl(1, [Validators.required]),
      sellStartDate: new FormControl(null, [Validators.required]),
      sellEndDate: new FormControl(null, [Validators.required]),

    })
}

deleteProduct(id : number) {
  this.productService.deleteProductById(id).subscribe((data: any) => {
    console.log(data);
    this.notify.success('Prodotto rimosso con successo'); 
    this.ngOnInit();
  
  });
}
addProductToDB(){
  if(this.addProductsForm.valid){
    this.addedProduct=this.addProductsForm.value
    console.log(this.addedProduct);
    
    this.productService.addProduct(this.addProductsForm.value).subscribe((data: any) => {
     this.notify.success('Prodotto aggiunto con successo');
    })
  }else{
    this.notify.error('Form non valido');
  }
}

}
