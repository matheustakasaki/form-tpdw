import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      await signInWithEmailAndPassword(auth, form.email, form.senha);
      navigate("/principal");
    } catch {
      setErro("E-mail ou senha inválidos.");
    }
  };

  return (


    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 flex justify-center items-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-5 animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Login
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
            className="input-field text-black p-3 border border-gray-200 my-2 rounded-md"
          />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            onChange={handleChange}
            required
            className="input-field text-black p-3 border border-gray-200 my-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
        >
          Entrar
        </button>

        <p className="text-center text-sm text-gray-500">
          Ainda não tem conta?{" "}
          <a href="/cadastro" className="text-purple-600 hover:underline font-medium">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
