import {Component, OnInit} from '@angular/core';
import {Dog} from "../../common/dog";
import {DogService} from "../../services/dog.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.css']
})
export class DogDetailsComponent implements OnInit {
  dog!: Dog
  DogId: number = 0

  constructor(private dogService: DogService, private ActivateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ActivateRoute.paramMap.subscribe(
      data => {
        this.DogId = Number(data.get('id'))
      }
    )
    this.dogService.getDogById(this.DogId).subscribe(
      data => {
        this.dog = data
      }
    )
  }
}
