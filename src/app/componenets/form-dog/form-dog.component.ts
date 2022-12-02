import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DogService} from "../../services/dog.service";
import {CustomValidate} from "../../validator/custom-validate";
import {Category} from "../../common/category";
import {Dog} from "../../common/dog";
import {of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DogCategoriesService} from "../../services/dog-categories.service";

@Component({
  selector: 'app-form-dog',
  templateUrl: './form-dog.component.html',
  styleUrls: ['./form-dog.component.css']
})
export class FormDogComponent implements OnInit {
  checkForm!: FormGroup
  categories: Category[] = [];
  dog!: Dog
  dogId = 0
  data: any = new FormData()

  constructor(private formBuilder: FormBuilder, private dogService: DogService, private categoryService: DogCategoriesService, private route: Router, private Activeroute: ActivatedRoute) {
  }

  get name() {
    return this.checkForm.get('dog.name')
  }

  get color() {
    return this.checkForm.get('dog.color')
  }

  get gender() {
    return this.checkForm.get('dog.gender')
  }

  get price() {
    return this.checkForm.get('dog.price')
  }

  get state() {
    return this.checkForm.get('dog.state')
  }

  get weight() {
    return this.checkForm.get('dog.weight')
  }

  get image() {
    return this.checkForm.get('dog.image')
  }

  get age() {
    return this.checkForm.get('dog.age')
  }

  get category() {
    return this.checkForm.get('dog.category')
  }

  get description() {
    return this.checkForm.get('dog.description')
  }

  ngOnInit(): void {
    this.Activeroute.paramMap.subscribe(
      data => {
        if (data.has('id'))
          this.dogId = Number(data.get('id'))
      }
    )
    if (this.dogId != 0) {
      this.dogService.getDogById(this.dogId).subscribe(
        data => {
          console.log(data)
          this.dog = data
        }
      )
    }
    this.categoryService.getCategoryList().subscribe(
      data => {
        this.categories = data
      }
    )
    this.checkForm = this.formBuilder.group(
      {
        dog: this.formBuilder.group(
          {
            name: ['', [Validators.required, Validators.minLength(2), CustomValidate.noWhiteSpace]],
            color: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            // price: ['', [Validators.required, Validators.min(1)]],
            weight: ['', [Validators.required, Validators.min(1)]],
            image: ['', [Validators.required]],
            age: ['', [Validators.required, Validators.min(1)]],
            category: ['', Validators.required],
            description: ['', [Validators.required, Validators.minLength(10)]]
          }
        )
      }
    )
  }

  onSubmit() {
    if (this.checkForm.invalid) {
      this.checkForm.markAllAsTouched()
    } else {
      of(this.checkForm.get('dog')?.value).subscribe(
        data => {
          console.log(data)
          this.dog = data
        }
      )
      if (this.dogId == 0) {
        this.dogService.addDog(this.dog)
      } else {
        this.dog.id = +this.dogId
        this.dogService.updateDog(this.dog)
      }
      // copyFile(this.dog.image,
      //   "/assets/images/",
      //   () => console.log("failed to load file"))
      // var fs = require("fs")
      // fs.writeFile("")
      this.route.navigateByUrl('/dogs')
    }
  }
}
