import {AbstractControl, ValidatorFn} from '@angular/forms';

export function longitude(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return isFinite(control.value) && Math.abs(control.value) <= 180 ?
      null
      :
      {longitude: 'longitude is out of range'};
  };
}
