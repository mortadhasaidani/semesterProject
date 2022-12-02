import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dog} from "../common/dog";

@Injectable({
  providedIn: 'root'
})

//services in Angular let you define code or functionalities that are then accessible and reusable in many other components in your Angular project.
//Angular services are objects that get instantiated just once during the lifetime of an application.
export class DogService {
  constructor(private http: HttpClient) {
  }

  getDogList(pageSize: number, nbPage: number): Observable<getDogResponse> {
    return this.http.get<getDogResponse>(`http://localhost:8083/dogs/list_dogs?size=${pageSize}&nbPage=${nbPage}`);
  }

  getDogListByCategory(categoryId: String, pageSize: number, nbPage: number): Observable<getDogResponse> {
    return this.http.get<getDogResponse>(`http://localhost:8083/dogs/category?size=${pageSize}&nbPage=${nbPage}&category_id=${categoryId}`)
  }

  getDogListByName(name: String, pageSize: number, nbPage: number): Observable<getDogResponse> {
    return this.http.get<getDogResponse>(`http://localhost:8083/dogs/name?size=${pageSize}&nbPage=${nbPage}&name=${name}`);
  }

  addDog(dog: Dog) {
    return this.http.post<Dog>("http://localhost:8083/dogs/add", dog).subscribe()
  }

  deleteDog(id: number) {
    return this.http.delete("http://localhost:8083/dogs/delete?id=" + id).subscribe()
  }

  getDogById(number: number): Observable<Dog> {
    return this.http.get<Dog>(`http://localhost:8083/dogs/${number}`)
  }

  updateDog(dog: Dog) {
    this.http.put<Dog>('http://localhost:8083/dogs', dog).subscribe()
  }
}

interface getDogResponse {
  content: Dog[],
  pageable: {
    pageSize: number,
    pageNumber: number
  },
  totalPages: number,
  totalElements: number
}


