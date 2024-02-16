import React, { useEffect, useState } from "react";
import cargandoImg from '..//img/cargando.gif';
import tlfn from '..//img/tlfn.png';
import email from '..//img/email.png';
import { countries } from "../country-codes";

export default function Api(props) {
    const [datosRandom, setDatosRandom] = useState({});
    const [datosUser, setDatosUser] = useState(null); // Estado para almacenar los datos del usuario
    const [genero, setGenero] = useState(""); // Estado para almacenar el género del usuario
    const [pais, setPais] = useState("");
    const [bandPais, setBandPais] = useState(""); 

    const importarTodasLasBanderas = (requireContext) => {
        let banderas = {};
        requireContext.keys().forEach((imagen) => {
          const nombre = imagen.replace(/^\.\/(.*)\.\w+$/, "$1"); // Obtén el nombre de la imagen
          banderas[nombre] = requireContext(imagen); // Importa la imagen y asigna al objeto banderas
          
        });
        return banderas;
      };
      
      const banderas = importarTodasLasBanderas(require.context("../banderas", false, /\.(png|jpe?g|svg)$/));
      console.log ("Objeto banderas",banderas)


    const realizarFetch = async () => {
        try {
            const datosFetch = await fetch('https://randomuser.me/api/');
            const datosJson = await datosFetch.json();
            console.log('datosJson : ', datosJson);
            setDatosRandom(datosJson);
            const user = datosJson.results[0]; // Obtener los datos del usuario
            setDatosUser(user); // Actualizar el estado con los datos del usuario

            // Determinar el género del usuario
            let nuevoGenero = '';
            if (user.gender === "male") {
                nuevoGenero = "Varón";
            } else if (user.gender === "female") {
                nuevoGenero = "Mujer";
            }
            setGenero(nuevoGenero); // Actualizar el estado con el género del usuario

            console.log("Nombre:", user.name.first, user.name.last, "Género:", nuevoGenero, "País:", user.nat);
            console.log("Correo electrónico:", user.email);
            console.log("Teléfono:", user.phone);

            let lowerPais = user.nat.toLowerCase();
            let bandPais = lowerPais;
            setBandPais(bandPais); // Almacenar bandPais en el estado

            console.log("pais test", bandPais.ae)
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
console.log("bandera 2 elementos", banderafinal);
console.log("Objeto countries", countries);




    return (
        <div className="api-container">
            <button className="fetch-button" onClick={hacerClick}>Hacer FETCH</button>
            <div className="data-display">
                {datosUser ? ( // Verificar si los datos del usuario están disponibles
                    <div>
                        <div className="dataImages">
                        <img src={datosUser.picture.medium} alt="Thumbnail" style={{margin: '2px' }}/>
                        
                        <img src={banderafinal} alt="Bandera" style={{ maxWidth: '96px', margin: '2px' }}/>
                        </div>
                        <ul>
                       

                            <li>Nombre: {datosUser.name.first} {datosUser.name.last}</li>
                            <li>Género: {genero}</li>
                            <li>País: {datosUser.nat}</li>
                            <li>
                            <img src={email} alt="Bandera" style={{ maxHeight: '12px' }}/>
                            {datosUser.email}</li>
                            <li>
                            <img src={tlfn} alt="Bandera" style={{ maxHeight: '12px' }}/> 
                            {datosUser.phone}</li>
                            
                        </ul>
                        <div></div>

                    </div>
                ) : (
                    <div><p>Cargando...</p>
                    <img src={cargandoImg} alt="Cargando" style={{ maxWidth: '180px', margin: '2px' }}/></div>
                )}
            </div>
        </div>
    );
}
