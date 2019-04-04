import { AbstractControl, FormGroup } from '@angular/forms';

export function mobileNumberValidation(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const mobile = /^[0-9]{10}$/;
        if (!mobile.test(control.value)) {
            return {
                isError: true
            };
        }
        return null;
    }
}
