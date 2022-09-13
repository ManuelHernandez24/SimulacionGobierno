import React, { useState } from 'react';
import './App.css'

const App = () => {

    //Valores en texto
    const [currently, setCurrently] = useState("");
    const [political, setPolitical] = useState("");
    const [politics, setPolitics] = useState("");
    const [people, setPeople] = useState("");
    const [contest, setContest] = useState("");

    const [cantCambioGobierno1, setcantCambioGobierno1] = useState("");
    const [cantContiendas1, setcantContiendas1] = useState("");
    const [cantPoliticas1, setcantPoliticas1] = useState("");


    //Valores en numeros

    //0 Ningun partido
    //1 Conservador
    //2 Liberal
    var numPartido = 0;

    //0 Ninguna politica
    //1 Permisiva
    //2 Coercitiva
    var numPolitica = 0;

    //1 Pacifica
    //2 Huelga
    var numGente = 1;

    //0 No hay huelga
    //1 Baja
    //2 Alta
    var numContienda = 0;

    var cantPoliticas = 0;
    var cantContiendas = 0;
    var cantContiendasAltas = 0;
    var cantCambioGobierno = 0;

    var probabilidadHuelga = 0;
    var probabilidadContienda = 0;

    //Funcion para tener los numeros aleatorios.
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    const initialPolitical = () => {
        let partido = getRandomArbitrary(0, 100);
        if (partido >= 0 && partido <= 50) {
            //political("LIBERAL");
            setPolitical("Liberal");
            setPolitics("(Coercitivo)");
            numPartido = 2;
            numPolitica = 2;
        } else {
            // political("CONSERVADOR");
            setPolitical("Conservador");
            setPolitics("(Permisivo)");
            numPartido = 1;
            numPolitica = 1;
        }

        setTimeout(initialSilumation, 2000);
    }

    const changePolitical = () => {
        if (numPartido == 1) {
            numPartido = 2;
            numPolitica = 2;
            setPolitical("Liberal");
            setPolitics("(Coercitivo)");
        } else {
            numPartido = 1;
            setPolitical("Conservador");
            setTimeout(changePolitics, 6000);
        }
        cantCambioGobierno++;
        setcantCambioGobierno1(cantCambioGobierno);
    }

    const changePolitics = () => {
        numPolitica = 1;
        setPolitics("(Permisivo)");
    }

    const initialSilumation = () => {
        setCurrently("El gobierno imparte una nueva politica.");
        numGente = 1;
        setPeople("Pacifica");
        setContest("No hay");
        cantPoliticas++;
        setcantPoliticas1(cantPoliticas);

        if (numPolitica == 1) {
            probabilidadHuelga = 80;
        } else {
            probabilidadHuelga = 20;
        }

        setTimeout(silumationPeople, 2000);

    }

    const silumationPeople = () => {
        setPeople("Pacifica");
        numGente = 1;
        let posibilidades = getRandomArbitrary(0, 100);

        if (posibilidades >= 0 && posibilidades <= probabilidadHuelga) {
            setPeople("Pacifica");
            setCurrently("A la gente le agrada la nueva politica.");
            numGente = 1;
        } else {
            setCurrently("A la gente no le agrada la nueva politica.");
            setPeople("En huelga");
            numGente = 2;
        }
        if (numGente == 2) {
            let posibilidades = getRandomArbitrary(0, 100);
            if (numPolitica == 1) {
                probabilidadContienda = 80;
            } else {
                probabilidadContienda = 20;
            }

            if (posibilidades >= 0 && posibilidades <= probabilidadContienda) {
                setContest("Baja");
                numContienda = 1;
            } else {
                setContest("Alta");
                numContienda = 2;
                cantContiendasAltas++;
            }
            cantContiendas++;
            setcantContiendas1(cantContiendas);
            setTimeout(contarContiendasAltas, 2000);
        }
        setTimeout(initialSilumation, 2000);
    }

    const contarContiendasAltas = () => {
        if (cantContiendasAltas >= 3) {
            alert('Se cambia de gobierno.');
            cantContiendasAltas = 0;
            setTimeout(changePolitical, 2000);
        }
    }

    const start = () => {
        setCurrently("Se elige un nuevo gobierno.");
        setTimeout(initialPolitical, 2000);
        setPeople("Pacifica");
        setContest("No hay");
    }

    const finalize = (cantContiendas1, cantCambioGobierno1, cantPoliticas1) => {
        alert(`Simulacion finalizada.`);
        window.location.reload();
    }

    const boton = () => {

        if (political != '') {
            finalize(cantContiendas, cantCambioGobierno, cantPoliticas);
        } else {
            start();
        }
    }

    return (
        <>
            <div className="container">
                <form>
                    <input type="text" value={`Partido actual: ${political} ${politics}`} /> <br />
                    <input type="text" value={`Estado de la gente actual: ${people}`} /><br />
                    <input type="text" value={`Contienda actual: ${contest}`} /><br />
                    <br />
                    <input type="text" value={`${currently}`} />
                    <br />
                    <br />
                    <input type="text" value={`Protestas: ${cantContiendas1}`} />
                    <input type="text" value={`Cambios de gobierno: ${cantCambioGobierno1}`} />
                    <input type="text" value={`Politica: ${cantPoliticas1}`} />

                </form>

                <div className="keypad">
                    <button className="highlight" onClick={boton} id='clear'>Iniciar</button>
                </div>

            </div>
        </>
    );
}

export default App;