export default function validate(
  value,
  name,
  setNombreError,
  setMarcaError,
  setPrecioError,
  setGraduacionError,
  setTipoError,
  setDescripcionError,
  setMlError,
  setStockError
  ) { 
      let regex =  /^[1-9][0-9]*$/
      console.log(value,name);
    if (name === "nombre") {
        console.log(name, value);
        if(value.length < 7){
            console.log("entro al error");
            setNombreError("El nombre del producto no puede tener menos de 7 caracteres")
        }
        else setNombreError(null)
    }
    else if(name === "marca"){
        if(value.length < 3){
            setMarcaError("El Marca del producto no puede tener menos de 3 caracteres")
        }
        else setMarcaError(null)
    }
    else if(name === "precio"){
        if(!/^(\d*)$/.test(value)){
            setPrecioError("Solo se pueden ingresar caracteres numericos")
        }
        else if(value < 1){
            setPrecioError("El precio no puede ser menor a $1 (uno)")
        }
        else setPrecioError(null)
    }
    else if(name === "graduacion"){
        if(!/^[0-9]+([.][0-9]+)?$/.test(value)){
            setGraduacionError("Ingrese una graduacion válida")
        }
        else if(value < 1 ){
            setGraduacionError("La graduacion no puede ser menor a 1% (uno)")
        }
        else if(value > 101 ){
            setGraduacionError("La graduacion no puede ser mayor a 100% (cien)")
        }
        else setGraduacionError(null)
    } 
    else if(name === "ml"){
        if(!regex.test(value)){
            setMlError("El producto no puede tener menos de 1 ml. (uno)")
        }
        else setMlError(null)
    } 
    else if(name === "tipo"){
        if(value.length < 0){
            setTipoError(`Debe seleccionar un "tipo" de producto`)
        }
        else setTipoError(null)
    } 
    else if(name === "descripcion"){
        if(value.length < 20){
            setDescripcionError(`La descripcion producto debe tener mas de 20 caracteres`)
        }
        else setDescripcionError(null)
    } 
    else if(name === "stock"){
        if(!value || value < 0 || !value.length ){
            setStockError(`El stock del producto no puede ser menor a 0 (cero)`)
        }
        else if(!/^(\d*)$/.test(value)){
            setStockError("Solo se pueden ingresar caracteres numericos")
        }
        else setStockError(null)
    } 
}


var producto ={nombre: "cerveza"}

console.log(producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1));

let revs = [
    {
        id_user: "a",
        id_prod: "b"
    },
    {
        id_user: "b",
        id_prod: "b"
    }
]

let allRevs = revs.map(e => `${e.id_user} ${e.id_prod}`)
console.log(allRevs);
var id_user = "b"
var id_prod = "b"

console.log(allRevs.includes(`${id_user} ${id_prod}`));


let obj = {
    "019c6ecb-8a03-468a-9dde-e8be1b92ba57": 20,
"acce51de-852e-449a-9290-10a156afb225": 3,
"e78f2717-4d47-4fcb-8910-921922a5e42d": 1
}


console.log(Object.entries(obj));


