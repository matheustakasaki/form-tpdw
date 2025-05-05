import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
    const [form, setForm] = useState({
        email: "",
        senha: "",
        nome: "",
        sobrenome: "",
        nascimento: "",
    });
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(""); // limpa erro antes de tentar novamente
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.senha
            );
            const uid = userCredential.user.uid;
            await setDoc(doc(db, "usuarios", uid), {
                uid,
                nome: form.nome,
                sobrenome: form.sobrenome,
                nascimento: form.nascimento,
                email: form.email,
            });
            navigate("/");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErro("Este e-mail já está em uso. Faça login ou use outro.");
            } else {
                setErro("Erro ao cadastrar. Verifique os campos e tente novamente.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-5 animate-fade-in"
            >
                <h2 className="text-3xl font-bold text-center text-blue-700">
                    Cadastro
                </h2>

                {erro && (
                    <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                        {erro}
                    </p>
                )}

                <div className="flex flex-col">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="input-field text-black p-3 border border-gray-200 my-2 rounded-md"                />
                <input
                    name="senha"
                    type="password"
                    placeholder="Senha"
                    onChange={handleChange}
                    required
                    className="input-field text-black p-3 border border-gray-200 my-2 rounded-md"                />
                <input
                    name="nome"
                    placeholder="Nome"
                    onChange={handleChange}
                    required
                    className="input-field text-black p-3 border border-gray-200 my-2 rounded-md"                />
                <input
                    name="sobrenome"
                    placeholder="Sobrenome"
                    onChange={handleChange}
                    required
                    className="input-field text-black p-3 border border-gray-200 my-2 rounded-md"                />
                <input
                    name="nascimento"
                    type="date"
                    onChange={handleChange}
                    required
                    className="input-field text-black p-3 border border-gray-200 m rounded-md"
                />

                </div>

              
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
                >
                    Cadastrar
                </button>

                <p className="text-center text-sm text-gray-500">
                    Já tem conta?{" "}
                    <a href="/" className="text-blue-600 hover:underline font-medium">
                        Fazer login
                    </a>
                </p>
            </form>
        </div>
    );
}
