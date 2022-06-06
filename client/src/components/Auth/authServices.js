export default function validate(
  input,
  name,
  password,
  setBirthError,
  setEmailError,
  setNameError,
  setPasswordError,
  setConfirmPasswordError,
  setSurnameError
) {
  if (name === "nacimiento") {
    const dateValidation =
      /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
    if (dateValidation.test(input) && parseInt(input.split("/")[2]) > 1920) {
      var r = input.split("/").reverse().join("/");
      if (birthValidate(r) < 18) setBirthError("Debe ser mayor de 18 años");
      else setBirthError(null);
    } else setBirthError("La fecha es invalida");
  } else if (name === "password") {
    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordValidation.test(input)) {
      setPasswordError(
        "La contraseña debe contener al menos un caracter en minuscula, uno en mayuscula, un numero, al menos un caracter especial [!@#$%^&*], y no menos de 8 caracteres"
      );
    } else setPasswordError(null);
  }
  else if (name === "confirmPassword") {
    console.log(password, input, password !== input)
    if (password !== input) {
      setConfirmPasswordError("Las contraseñas deben coincidir")
    } else setConfirmPasswordError(null)
  } else if (name === "email") {
    const emailValidation =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailValidation.test(input)) {
      setEmailError("El email es invalido");
    } else setEmailError(null);
  } else if (name === "nombre") {
    if (input.length === 0) {
      setNameError("El Nombre es requerido");
    } else setNameError(null);
  } else if (name === "apellido") {
    if (input.length === 0) {
      setSurnameError("El Apellido es requerido");
    } else setSurnameError(null);
  }
}

function birthValidate(input) {
  let today = new Date();
  let birth = new Date(input);
  let yOld = today.getFullYear() - birth.getFullYear();
  let month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    yOld--;
  }
  return yOld;
}