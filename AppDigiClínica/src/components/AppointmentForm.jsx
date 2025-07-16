import React, {useState} from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        nome:'',
        especialidade:'',
        data:'',
        horario:'',
    });

    const [mensagem, setMensagem] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "agendamentos"), formData);
            setMensagem("Agendamento realizado com sucesso!");
            setFormData({
                nome: '',
                especialidade: '',
                data: '',
                horario: '',
            });
        } catch (erro) {
            setMensagem("Erro ao realizar agendamento. Tente novamente.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Agendar Consulta</h2>
            <form onSubmit={handleSubmit}>
                
                    <label>Nome do Paciente</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    /><br /><br />
                
                
                    <label>Especialidade:</label>
                    <select
                        type="text"
                        name="especialidade"
                        value={formData.especialidade}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Cardiologia">Cardiologia</option>
                        <option value="Clinica Geral">Clínica Geral</option>
                        <option value="Dermatologia">Dermatologia</option>
                        <option value="Endocrinologia">Endocrinologia</option>
                        <option value="Gastroenterologia">Gastroenterologia</option>
                        <option value="Ginecologia">Ginecologia</option>
                        <option value="Neurologia">Neurologia</option>
                        <option value="Oftalmologia">Oftalmologia</option>
                        <option value="Ortopedia">Ortopedia</option>
                        <option value="Pediatria">Pediatria</option>
                        <option value="Psicologia">Psicologia</option>
                        <option value="Psiquiatria">Psiquiatria</option>
                        <option value="Urologia">Urologia</option>
                    </select><br /><br />

                 
                    <label>Data:</label><br />
                    <input
                        type="date"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        required
                    /><br /><br />
                
                    <label>Horário:</label>
                    <input
                        type="time"
                        name="horario"
                        value={formData.horario}
                        onChange={handleChange}
                        required
                    /><br /><br />
                
                                <button type="submit">Confirmar Agendamento</button>
                            </form>
                            {mensagem && <p>{mensagem}</p>}
                        </div>
                    );
                }

