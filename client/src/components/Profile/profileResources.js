export default function validate(input, name, setNameError, setSurnameError) {
  if (name === "nombre") {
    if (input.length === 0) {
      setNameError("El Nombre es requerido");
    } else setNameError(null);
  } else if (name === "apellido") {
    if (input.length === 0) {
      setSurnameError("El Apellido es requerido");
    } else setSurnameError(null);
  }
}
