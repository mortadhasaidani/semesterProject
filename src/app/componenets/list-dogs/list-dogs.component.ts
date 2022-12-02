import {Component, OnInit} from '@angular/core';
import {Dog} from "../../common/dog";
import {DogService} from "../../services/dog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DogCategoriesService} from "../../services/dog-categories.service";

@Component({
  selector: 'app-list-dogs',
  templateUrl: './list-dogs.component.html',
  styleUrls: ['./list-dogs.component.css']
})
export class ListDogsComponent implements OnInit {
  dogs: Dog[] = [];
  pageSize: number = 20
  pageNumber: number = 1
  totalPages!: number
  totalElements!: number
  categoryId: String = "0"
  previousCategoryId: String = "0"
  searchMode: boolean = false
  keyWord: String = ""
  mp: Map<String, String> = new Map<String, String>();

  constructor(private dogService: DogService,
              private route: ActivatedRoute,
              private router: Router,
              private category: DogCategoriesService) {
  }

  //ki ysir el creation t3 el object men class hedha awwel haja tsir heya y3ayet lel method hedhi
  ngOnInit(): void {
    this.category.getCategoryList().subscribe(
      data => {
        for (let i = 0; i < data.length; i++)
          this.mp.set(data[i]['id'], data[i]['name'])
      }
    )
    this.route.paramMap.subscribe(() =>
      this.listAll()
    )
  }

  processData(data: any) {
    this.dogs = data['content']
    this.pageSize = data['pageable']['pageSize']
    this.pageNumber = data['pageable']['pageNumber']
    this.totalPages = data['totalPages']
    this.totalElements = data['totalElements']
  }

  changePage() {
    if (!this.searchMode) {
      if (this.categoryId == "0") {
        this.dogService.getDogList(this.pageSize, this.pageNumber - 1).subscribe(
          data => {
            this.dogs = data['content']
          }
        )
      } else {
        if (this.categoryId != this.previousCategoryId)
          this.pageNumber = 1
        this.previousCategoryId = this.categoryId
        this.dogService.getDogListByCategory(this.categoryId, this.pageSize, this.pageNumber - 1).subscribe(
          data => {
            this.dogs = data['content']
          }
        )
      }
    } else {
      this.dogService.getDogListByName(this.keyWord, this.pageSize, this.pageNumber - 1).subscribe(
        data => {
          this.dogs = data['content']
        }
      )
    }
  }

  changeSize(value: String) {
    this.pageSize = +value
    this.pageNumber = 1
    this.listAll()
  }

  delete(id: number) {
    this.dogService.deleteDog(id);
    this.router.navigateByUrl('/dogs')
  }

  private listAll() {
    this.route.paramMap.subscribe(
      data => {
        if (data.has('id')) {
          this.categoryId = String(data.get('id'))
          this.searchMode = false
        } else if (data.has('name')) {
          this.keyWord = String(data.get('name'))
          this.searchMode = true
        }
      }
    )
    if (!this.searchMode) {
      if (this.categoryId == "0") {
        this.dogService.getDogList(this.pageSize, 0).subscribe(
          data => {
            this.processData(data)
          }
        )
      } else {
        this.dogService.getDogListByCategory(this.categoryId, this.pageSize, 0).subscribe(
          data => {
            this.processData(data)
          }
        )
      }
    } else {
      this.dogService.getDogListByName(this.keyWord, this.pageSize, 0).subscribe(
        data => {
          this.processData(data)
        }
      )
    }
  }
}
