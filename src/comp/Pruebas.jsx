import React, { useState, useEffect } from "react";
import { countries } from '../country-codes';

 export default function Pruebas() {
    const [nombrarPais, setNombrarPais] = useState("");

    useEffect(() => {
        const buscarPais = async () => {
          const selectedCountry = countries.find((country) => country.iso.alpha2 === "ZW");
          const nombrePais = selectedCountry ? selectedCountry.officialName.spanish : "";
          console.log (nombrePais)
          setNombrarPais(nombrePais);
        }
        buscarPais();
      }, []); // La dependencia vacía asegura que useEffect solo se ejecute una vez al montar el componente
    

      // Por ejemplo, puedes acceder a las propiedades del primer país así


  // Y luego mostrar las propiedades en tu JSX
  return (
    <div>
      <h1>Información del Primer País</h1>
      <p>Nombre: {}</p>
      <p>Dial Prefix: {}</p>
      {/* Mostrar otras propiedades según sea necesario */}
    </div>
  );

}
