
import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export default function AppointmentList() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroEspecialidade, setFiltroEspecialidade] = useState("");
    const [filtroData, setFiltroData] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "agendamentos"));
            const dados = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAgendamentos(dados);
        };

        fetchData();
    }, []);

const cancelarAgendamento = async (id) => {
    const confirmar = window.confirm('Deseja cancelar esta consulta?');
    if (confirmar) {
        try {
            await deleteDoc(doc(db, 'agendamentos', id));
            setAgendamentos(agendamentos.filter(item => item.id !== id));
        } catch (erro) {
            alert('Erro ao cancelar. Tente novamente.');
        }
    }
};

const agendamentosFiltrados = agendamentos.filter(iten => {
    const nomeMatch = iten.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const especialidadeMatch = iten.especialidade.toLowerCase().includes(filtroEspecialidade.toLowerCase());
    const dataMatch = iten.data.includes(filtroData);
    return nomeMatch && especialidadeMatch && dataMatch;
});

    return (
        <div style={{maxWidth: "600px", margin: "2rem auto"}}>
            <h2>Consultas Agendadas</h2>

            <div style={{marginBottom: "1rem"}}>
                <input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                    />
                    &nbsp;
                <input
                    type="text"
                    placeholder="Filtrar por especialidade"
                    value={filtroEspecialidade}
                    onChange={(e) => setFiltroEspecialidade(e.target.value)}
                    />
                    &nbsp;
                <input
                    type="date"
                    placeholder="Filtrar por data"
                    value={filtroData}
                    onChange={(e) => setFiltroData(e.target.value)}
                    />
            </div>

            {agendamentosFiltrados.length === 0 ? (
                <p>Nenhuma consulta agendada até o momento.</p>
            ) : (
                <ul>
                    {agendamentosFiltrados.map((iten) => (
                        <li key={iten.id} style={{ marginBottom: "1rem" }}>
                            <strong>Paciente:</strong> {iten.nome}<br />
                            <strong>Especialidade:</strong> {iten.especialidade}<br />
                            <strong>Data:</strong> {iten.data}<br />
                            <strong>Horário:</strong> {iten.horario}<br />
                            <button onClick={() => cancelarAgendamento(iten.id)}>Cancelar</button>
                        </li>
                    ))}
                </ul>
            )}
             </div>
        );
            }

       