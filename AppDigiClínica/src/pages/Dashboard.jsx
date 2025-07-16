import react from 'react';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';

export default function Dashboard() {
    return (
        <div style={{padding: '2rem'}}>
            <h1>Sistema de Agendamentos - DigiClínica</h1>
            <AppointmentForm />
            <hr style={{ margin: '2rem 0'}} />
            <AppointmentList />
        </div>
    );
    }