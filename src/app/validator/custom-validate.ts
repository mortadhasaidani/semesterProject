import {FormControl, ValidationErrors} from "@angular/forms";

export class CustomValidate {
  static noWhiteSpace(form: FormControl): ValidationErrors | null {
    if (form.value != null && form.value.trim().length == 0)
      return {'noWhiteSpace': true}
    return null;
  }
}
