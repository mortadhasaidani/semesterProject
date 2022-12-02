import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Category} from "../common/category";

@Injectable({
  providedIn: 'root'
})
export class DogCategoriesService {
  category: Category[] = []

  constructor(private http: HttpClient) {
  }

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8083/dogCategories/`);
  }
}
