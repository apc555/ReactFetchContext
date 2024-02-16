import React, { useEffect, useState } from "react";
import cargandoImg from '..//img/cargando.gif';
import tlfn from '..//img/tlfn.png';
import email from '..//img/email.png';
import female from '..//img/female.png';
import male from '..//img/male.png';
import { countries } from "../country-codes";

export default function ApiDiez(props) {
    const [datosRandom, setDatosRandom] = useState([]);
    const [loading, setLoading] = useState(true);

    const importarTodasLasBanderas = (requireContext) => {
        let banderas = {};
        requireContext.keys().forEach((imagen) => {
            const nombre = imagen.replace(/^\.\/(.*)\.\w+$/, "$1"); // Obtén el nombre de la imagen
            banderas[nombre] = requireContext(imagen); // Importa la imagen y asigna al objeto banderas
        });
        return banderas;
    };
    
    const banderas = importarTodasLasBanderas(require.context("../banderas", false, /\.(png|jpe?g|svg)$/));

    const realizarFetch = async () => {
        try {
            const datosFetch = await fetch('https://randomuser.me/api/?results=10');
            const datosJson = await datosFetch.json();
            setDatosRandom(datosJson.results);
            setLoading(false);
        } catch (error) {
            console.error('Error en el fetch sobre API:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        realizarFetch();
    }, []);

    const hacerClick = () => {
        setLoading(true);
        realizarFetch();
    };

    return (
        <div className="api-container">
            <button className="fetch-button" onClick={hacerClick}>Hacer FETCH</button>
            <div className="data-display">
                {loading ? (
                    <div className="loading">
                        <p>Cargando...</p>
                        <img src={cargandoImg} alt="Cargando" style={{ maxWidth: '140px', margin: '2px', opacity: 0.7 }}/>
                    </div>
                ) : (
                    datosRandom.map((usuario, index) => (
                        <div key={index} className={`usuario ${index % 2 === 0 ? 'fade-in' : 'fade-in-delay'}`}>
                            <div className="dataImages">
                                <a href={usuario.picture.large}><img src={usuario.picture.medium} alt="Thumbnail" style={{ margin: '2px', borderRadius: "20%" }}/></a>
                                <img src={banderas[usuario.nat.toLowerCase()]} alt="Bandera" style={{ maxWidth: '96px', margin: '2px', borderRadius: "10%" }}/>
                            </div>
                            <ul>
                                <li>Nombre: {usuario.name.first} {usuario.name.last} <img src={usuario.gender === "male" ? male : female} style={{ maxHeight: '14px' }}/></li>
                                <li>Edad: {usuario.dob.age}</li>
                                <li>País: {countries.find(country => country.iso.alpha2 === usuario.nat)?.officialName.spanish}</li>
                                <li>Ciudad: {usuario.location.city}</li>
                                <li>Alias: {usuario.login.username}</li>
                                <li><img src={email} alt="Correo electrónico" style={{ maxHeight: '12px' }}/> {usuario.email}</li>
                                <li><img src={tlfn} alt="Teléfono" style={{ maxHeight: '12px' }}/> {usuario.phone}</li>
                                <li>Registro: {usuario.registered.date.slice(0,10)}</li>
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
