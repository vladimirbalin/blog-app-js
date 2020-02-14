export class Form{
  constructor(form, controls) {
    this.form = form;
    this.controls = controls;
  }

  value(){
    const value = {};

    Object.keys(this.controls).forEach(nameOfControl => {
      value[nameOfControl] = this.form[nameOfControl].value;
    });

    return value;
  }

  isValid(){
    let formIsValid = true;

    Object.keys(this.controls).forEach(nameOfControl => {
      let validators = this.controls[nameOfControl];


      let isValid = true;
      validators.forEach(validator => {
        isValid = validator(this.form[nameOfControl].value) && isValid;
      });

      if (!isValid){
        setError(this.form[nameOfControl]);
      } else {
        clearError(this.form[nameOfControl]);
      }

      formIsValid = isValid && formIsValid;
    });

    return formIsValid;
  }
  clear(){
    Object.keys(this.controls).forEach(nameOfControl => {
      this.form[nameOfControl].value = '';
    });
  }
}

function setError($control) {
  clearError($control);
  const error = '<p class="error">Введите верное значение</p>';
  $control.insertAdjacentHTML('afterend', error);
}

function clearError($control) {
  if($control.nextSibling){
    $control.closest('.form-control').removeChild($control.nextSibling);
  }
}