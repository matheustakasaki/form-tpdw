import { useEffect, useState } from "react";
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

  return dados ? (
    <div>
      <h2>Bem-vindo, {dados.nome} {dados.sobrenome}</h2>
      <p>Data de nascimento: {dados.nascimento}</p>
    </div>
  ) : (
    <p>Carregando...</p>
  );
}
