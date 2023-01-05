console.log("hola")

const btnLogin = document.querySelector("#login")
const correo = document.querySelector("#correo")
const password = document.querySelector("#password")


if(btnLogin) {
    btnLogin.addEventListener("click", async (e) => {

        const datos = {
          correo: correo.value,
          password: password.value,
        }
      
        console.log(datos)
        const settings = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
              Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            };
      
        const fetchResponse = await fetch(`/auth/login`, settings);
        console.log(fetchResponse)
        const data = await fetchResponse.json();
        console.log(data)
              
        if(fetchResponse.status === 200){
          const dataSesion = [data.correo, data.usuario,  data.token]
          localStorage.setItem("sesion", JSON.stringify(dataSesion) );
          window.location.assign(`/auth/${data.usuario}/index`)
        }
      })
      
}

const traerUsuarios = () => {
  fetch('/auth')
  .then((response) => response.json())
  .then((data) => console.log(data));
}

traerUsuarios();

console.log(window.location.pathname)
const getSesion = JSON.parse(localStorage.getItem('sesion'));

if(getSesion && window.location.pathname === "/") {
  window.location.assign(`/auth/${getSesion[1]}/index`)
 }
