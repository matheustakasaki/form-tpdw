import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Principal() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDados(docSnap.data());
        }
      }
    };
    carregarDados();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {dados ? (
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Bem-vindo, {dados.nome} {dados.sobrenome}!
          </h1>
          <p className="text-gray-600">
            Sua data de nascimento é:{" "}
            <span className="font-medium text-blue-600">{dados.nascimento}</span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Carregando...</p>
      )}
    </div>
  );
}
