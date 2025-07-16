import { useState } from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setsenha] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            alert("Login realizado com sucesso!")
        } catch (erro) {
            setError("Usuário ou senha inválido.");
        }
    };

    return (
        <div style={{ padding: '2rem'}}> 
            <h2>Login - DigiClínica</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                /><br /><br/>
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Entrar</button>
            </form>
            {error && <p style={{color: red}}>{erro}</p>}
        </div>
    );
}