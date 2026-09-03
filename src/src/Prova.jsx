import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"

export default function Prova() {

    const{id} = useParams();
    const [questao, setQuestao] = useState(null);
    const [questaoIndex, setQuestaoIndex] = useState(1);

    async function buscarQuestao() {
        const respostaQuestao = await fetch(
            `https://api.enem.dev/v1/exams/${id}/questions/${questaoIndex}`
        )
        const dadosQuestao = await respostaQuestao.json();
        setQuestao(dadosQuestao);
    }

    function avancar(){
        if(questaoIndex === 180){
            alert("Você chegou ao final da prova.");
        } else {
            setQuestaoIndex(questaoIndex + 1);
        }
    }

    function voltar(){
        if(questaoIndex === 1){
            alert("Você está no início da prova, não é possível voltar.");
        } else {
            setQuestaoIndex(questaoIndex - 1);
        }
    }

    function verResposta(questao){
        alert(`A resposta correta é: ${questao.correctAlternative}`);
    }

    useEffect(() => {
        buscarQuestao();
    }, [questaoIndex]);

    return (
        questao ? 
        <div>
            <h1>{questao.title}</h1>
            <p>{questao.context}</p>
            <p>
                <b>
                    {questao.alternativesIntroduction}
                </b>
            </p>
            <ul style={{listStyle: "upper-alpha"}}>
                {questao.alternatives.map((alt, i) => (
                    <li key={i}>
                        <span>{alt.letter}. </span>
                        {alt.text}
                    </li>
                ))}
            </ul>

            <button onClick={() => verResposta(questao)}>
                Ver resposta 
            </button>

            <button onClick={avancar}>
                Avançar questão
            </button>
            
            <button onClick={voltar}>
                Voltar questão
            </button>

        </div>
         : null
          )
}
