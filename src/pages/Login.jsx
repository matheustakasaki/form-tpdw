import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.senha);
      navigate("/principal");
    } catch {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required />
      <button type="submit">Entrar</button>
      {erro && <p>{erro}</p>}
    </form>
  );
}
