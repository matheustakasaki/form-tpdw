import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [form, setForm] = useState({ email: "", senha: "", nome: "", sobrenome: "", nascimento: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.senha);
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "usuarios", uid), {
        uid,
        nome: form.nome,
        sobrenome: form.sobrenome,
        nascimento: form.nascimento,
        email: form.email
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required />
      <input name="nome" placeholder="Nome" onChange={handleChange} required />
      <input name="sobrenome" placeholder="Sobrenome" onChange={handleChange} required />
      <input name="nascimento" type="date" onChange={handleChange} required />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
