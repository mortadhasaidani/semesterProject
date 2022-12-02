import {Component, OnInit} from '@angular/core';
import {Category} from "../../common/category";
import {DogCategoriesService} from "../../services/dog-categories.service";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {
  categories: Category[] = []

  constructor(private CategoryService: DogCategoriesService) {
  }

  ngOnInit(): void {
    this.listCategories()
  }

  private listCategories() {
    return this.CategoryService.getCategoryList().subscribe(
      data => {
        this.categories = data
      }
    )
  }
}
