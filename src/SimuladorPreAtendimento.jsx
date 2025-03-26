import { useState } from "react";

const perguntas = [
  "Você sente obstrução nasal frequente?",
  "Tem espirros constantes ou coriza?",
  "Sente dor ou pressão na face?",
  "Percebe sangramento nasal?",
  "Tem perda de olfato ou paladar?"
];

const intensidadeLabels = ["Leve", "Moderado", "Intenso"];
const intensidadeCores = ["#bbf7d0", "#fde68a", "#fecaca"];

const examesSugeridos = [
  "Nasofibroscopia",
  "Tomografia dos seios da face",
  "Teste de alergia",
  "Raio-X de cavidades paranasais"
];

const botaoStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default function SimuladorPreAtendimento() {
  const [intensidades, setIntensidades] = useState(Array(perguntas.length).fill(null));
  const [fase, setFase] = useState("paciente");
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

  const handleEnviarRespostas = () => {
    setFase("medico");
  };

  const handleEnviarRequisicao = () => {
    setFase("final");
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      {fase === "paciente" && (
        <>
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
                      backgroundColor: intensidades[index] === i ? intensidadeCores[i] : '#e5e7eb',
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
          <button style={botaoStyle} onClick={handleEnviarRespostas}>Enviar Respostas</button>
        </>
      )}

      {fase === "medico" && (
        <>
          <h1>Visualização do Médico</h1>
          <p>Respostas do paciente:</p>
          <ul>
            {perguntas.map((p, i) => (
              <li key={i}>{p} - {intensidades[i] != null ? intensidadeLabels[intensidades[i]] : 'Não respondido'}</li>
            ))}
          </ul>
          <h2>Selecionar exames a serem solicitados:</h2>
          {examesSugeridos.map((exame, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={examesSelecionados.includes(exame)}
                onChange={() => toggleExame(exame)}
              /> {exame}
            </div>
          ))}
          <button style={botaoStyle} onClick={handleEnviarRequisicao}>
            Gerar e Enviar Requisição
          </button>
        </>
      )}

      {fase === "final" && (
        <>
          <h1>Requisição Gerada</h1>
          <p><strong>Subespecialidade:</strong> Rinologia</p>
          <p><strong>Respostas:</strong></p>
          <ul>
            {perguntas.map((p, i) => (
              <li key={i}>{p} - {intensidades[i] != null ? intensidadeLabels[intensidades[i]] : 'Não respondido'}</li>
            ))}
          </ul>
          <p><strong>Exames selecionados:</strong></p>
          <ul>
            {examesSelecionados.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
          <p style={{ marginTop: 20, fontStyle: 'italic' }}>
            Requisição enviada para o paciente.
          </p>
        </>
      )}
    </div>
  );
}
