import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IItem } from '../iitem'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   private url = "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"

   allInfo = [];
  products : IItem[] = [];

  constructor(private http: HttpClient) { }
  getProducts() {
    return this.http.get(this.url,{responseType: 'json'});
  }



}
