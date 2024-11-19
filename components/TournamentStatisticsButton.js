import React from 'react';
import { Link } from 'react-router-dom';    
import { Button } from 'react-bootstrap';


export default function TournamentStatisticsButton() {

    const navigation = useNavigation();

    const handleStatistics = () => {
        navigation.navigate(''); //Aquí falta la ruta de las esTaDíStiCas
    };

    return <Button title="Estadísticas del Torneo" onPress={handleStatistics} />;

}
