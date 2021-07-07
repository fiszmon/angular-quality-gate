import {AbstractControl, ValidatorFn} from '@angular/forms';

export function latitude(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return isFinite(control.value) && Math.abs(control.value) <= 90 ?
      null
      :
      {latitude: 'latitude is out of range'};
  };
}
