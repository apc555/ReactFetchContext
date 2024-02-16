import React, { useEffect, useState } from "react";
import cargandoImg from '..//img/cargando.gif';
import tlfn from '..//img/tlfn.png';
import email from '..//img/email.png';
import female from '..//img/female.png';
import male from '..//img/male.png';
import { countries } from "../country-codes";

export default function Api(props) {
    const [datosRandom, setDatosRandom] = useState({});
    const [datosUser, setDatosUser] = useState(null); // Estado para almacenar los datos del usuario
    const [genero, setGenero] = useState(""); // Estado para almacenar el género del usuario
    const [pais, setPais] = useState("");
    const [bandPais, setBandPais] = useState(""); 
    const [nombrarPais, setNombrarPais] = useState("");
    const [fechaRegistro, setFechaRegistro] = useState("");


    const importarTodasLasBanderas = (requireContext) => {
        let banderas = {};
        requireContext.keys().forEach((imagen) => {
          const nombre = imagen.replace(/^\.\/(.*)\.\w+$/, "$1"); // Obtén el nombre de la imagen
          banderas[nombre] = requireContext(imagen); // Importa la imagen y asigna al objeto banderas
          
        });
        return banderas;
      };
      
      const banderas = importarTodasLasBanderas(require.context("../banderas", false, /\.(png|jpe?g|svg)$/));
      //console.log ("Objeto banderas",banderas)


    const realizarFetch = async () => {
        try {
            const datosFetch = await fetch('https://randomuser.me/api/');
            const datosJson = await datosFetch.json();
            console.log('datosJson : ', datosJson);
            setDatosRandom(datosJson);
            const user = datosJson.results[0]; // Obtener los datos del usuario
            setDatosUser(user); // Actualizar el estado con los datos del usuario

            // Determinar el género del usuario
            let imgGenero = '';
            if (user.gender === "male") {
                imgGenero = male;
            } else if (user.gender === "female") {
                imgGenero = female;
            }
            setGenero(imgGenero); // Actualizar el estado con el género del usuario

            const selectedCountry = countries.find((country) => country.iso.alpha2 === user.nat);
            const nombrePais = selectedCountry ? selectedCountry.officialName.spanish : "";
            console.log (nombrePais)
            setNombrarPais(nombrePais);

            
             const registro = datosUser.registered.date.slice(0,10);
             setFechaRegistro(registro);

/*             console.log("Nombre:", user.name.first, user.name.last, "Género:", imgGenero, "País:", user.nat);
            console.log("Correo electrónico:", user.email);
            console.log("Teléfono:", user.phone); */

            let lowerPais = user.nat.toLowerCase();
            let bandPais = lowerPais;
            setBandPais(bandPais); // Almacenar bandPais en el estado

        } catch (error) {
            console.error('Error en el fetch sobre API:', error);
        }
    };

    useEffect(() => {
        if (!datosUser) { // Verificar si los datos del usuario están disponibles
            realizarFetch();
        }
    }, []); // Ejecutar solo una vez al montar el componente

    const hacerClick = () => {
        setDatosUser(null); // Reiniciar los datos del usuario al hacer clic en el botón
        realizarFetch(); // Realizar una nueva solicitud de la API
    };

    let banderafinal = banderas[bandPais];


    console.log(datosUser)
/* console.log("bandera 2 elementos", banderafinal);
console.log("Objeto countries", countries); */




return (
    <div className="api-container">
        <div className={`data-display ${datosUser ? 'fade-in' : 'fade-out'}`}>
            {datosUser ? ( // Verificar si los datos del usuario están disponibles
                <div><div className="dataImages">
                    <a href={datosUser.picture.large}><img src={datosUser.picture.medium} alt="Thumbnail" style={{margin: '2px', borderRadius: "20%" }}/></a>
                    <img src={banderafinal} alt="Bandera" style={{ maxWidth: '96px', margin: '2px',  borderRadius: "10%"  }}/>
                    </div>
                    <ul>
                        <li>Nombre: {datosUser.name.first} {datosUser.name.last}   <img src={genero} style={{ maxHeight: '14px' }}/></li>
                        <li>Edad: {datosUser.dob.age}</li>
                        <li>País: {nombrarPais}</li>
                        <li>Ciudad: {datosUser.location.city}</li>
                        <li>Alias: {datosUser.login.username}</li>
                        <li><img src={email} alt="Correo electrónico" style={{ maxHeight: '12px' }}/> {datosUser.email}</li>
                        <li><img src={tlfn} alt="Teléfono" style={{ maxHeight: '12px' }}/> {datosUser.phone}</li>
                        <li>Registro: {fechaRegistro}</li>
                    </ul>
                </div>
            ) : (
                <div className={`dataImages ${datosUser ? 'fade-out' : 'fade-in'}`}>
                    <p>Cargando...</p>
                    <img src={cargandoImg} alt="Cargando" style={{ maxWidth: '130px', margin: '2px', opacity: 0.7 }}/>
                </div>
            )}
            
        </div>
        <button className="fetch-button" onClick={hacerClick} style={{margin: "20px"}}>Hacer FETCH</button>

    </div>
);


}
