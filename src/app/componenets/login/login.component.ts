import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomValidate} from "../../validator/custom-validate";
import {of} from "rxjs";
import {UserLogin} from "../../common/user-login";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkForm!: FormGroup
  user!: UserLogin

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthenticationService,
    private route: Router,
    private Activeroute: ActivatedRoute
  ) {
  }

  get name() {
    return this.checkForm.get('dog.email')
  }

  get description() {
    return this.checkForm.get('dog.password')
  }

  ngOnInit(): void {
    this.checkForm = this.formBuilder.group(
      {
        dog: this.formBuilder.group(
          {
            email: ['', [Validators.required, Validators.minLength(2), CustomValidate.noWhiteSpace]],
            password: ['', [Validators.required, Validators.minLength(8)]]
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
          this.user = data
        }
      )
      this.loginService.login(this.user).subscribe(
        (data) => {
          console.log('aaaaaaaaaaaaaaaa ' + data)
        },
        (err) => {
          console.log(err)
          console.log('ha ha ha ' + err.headers.keys)
          if (err.statusText == "OK") {
          }
        }
      )
      // () => {
      //     alert("FAILED😢 Login  is Faild Try Again Later!!")
      //   }
      // copyFile(this.dog.image,
      //   "/assets/images/",
      //   () => console.log("failed to load file"))
      // var fs = require("fs")
      // fs.writeFile("")
      // this.route.navigateByUrl('/dogs')
    }
  }
}
