import { useState } from "react";

const perguntas = [
  "Você sente obstrução nasal frequente?",
  "Tem espirros constantes ou coriza?",
  "Sente dor ou pressão na face?",
  "Percebe sangramento nasal?",
  "Tem perda de olfato ou paladar?"
];

const intensidadeCores = [
  "bg-green-200", "bg-yellow-200", "bg-red-200"
];

const intensidadeLabels = ["Leve", "Moderado", "Intenso"];

const examesSugeridos = [
  "Nasofibroscopia",
  "Tomografia dos seios da face",
  "Teste de alergia",
  "Raio-X de cavidades paranasais"
];

export default function SimuladorPreAtendimento() {
  const [intensidades, setIntensidades] = useState(Array(perguntas.length).fill(null));
  const [respostasEnviadas, setRespostasEnviadas] = useState(false);
  const [examesSelecionados, setExamesSelecionados] = useState([]);

  const setIntensidade = (index, nivel) => {
    const novas = [...intensidades];
    novas[index] = nivel;
    setIntensidades(novas);
  };

  const toggleExame = (exame) => {
    setExamesSelecionados((prev) =>
      prev.includes(exame) ? prev.filter((e) => e !== exame) : [...prev, exame]
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Pré-atendimento: Rinologia</h1>
      {perguntas.map((pergunta, index) => (
        <div key={index} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc' }}>
          <p>{pergunta}</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {intensidadeLabels.map((label, i) => (
              <button
                key={i}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: intensidades[index] === i ? ['#bbf7d0', '#fde68a', '#fecaca'][i] : '#e5e7eb',
                  border: 'none',
                  borderRadius: 4
                }}
                onClick={() => setIntensidade(index, i)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!respostasEnviadas && (
        <button onClick={() => setRespostasEnviadas(true)}>Enviar Respostas</button>
      )}

      {respostasEnviadas && (
        <>
          <div style={{ marginTop: 20 }}>
            <h2>Exames sugeridos</h2>
            {examesSugeridos.map((exame, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={examesSelecionados.includes(exame)}
                  onChange={() => toggleExame(exame)}
                /> {exame}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <h3>Resumo para Requisição</h3>
            <ul>
              {perguntas.map((p, i) => (
                <li key={i}>{p} - {intensidades[i] != null ? intensidadeLabels[intensidades[i]] : 'Não respondido'}</li>
              ))}
            </ul>
            <p><strong>Exames selecionados:</strong></p>
            <ul>
              {examesSelecionados.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
            <p><em>Assinatura do médico será inserida posteriormente.</em></p>
          </div>
        </>
      )}
    </div>
  );
}
