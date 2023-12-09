import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';

function Filme() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [Filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: "d0fbf89958baf568db48961158f6b7a6",
            language: "pt-BR",
          },
        });
        console.log("Dados da API:", response.data);
        setFilme(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Erro na requisição:", error);
        setLoading(false); // Defina o estado de loading como falso em caso de erro.
        navigation("/", {replace:true});
        return;
      }
    }
    loadFilme();

    return () => {
      console.log("Componente foi desmontado");
    };
  }, [navigation, id]);

function salvarFilme(){
  const minhaLista = localStorage.getItem("@primeflix");

  let filmesSalvos = JSON.parse(minhaLista) || [];

  const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id == Filme.id)

  if (hasFilme){
    alert("ESSE FILME JA ESTA NA LISTA");
    return;
  }
  filmesSalvos.push(Filme);
  localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
  alert("salvo com sucesso!")

}

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes....</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{Filme.title}</h1>
      {Filme.backdrop_path && (
        <img src={`https://image.tmdb.org/t/p/original/${Filme.backdrop_path}`} alt={Filme.title} />
      )}

      <h3>Sinopse</h3>
      <span>{Filme.overview}</span>
    
    <strong>Votação: {Filme.vote_average} /10</strong>

    <div className="area-buttons">  
        <button onClick={salvarFilme}>Salvar</button>
        <button>
        <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${Filme.title} Trailer`}> Trailer </a>    
        </button>  
    </div>
    </div>
  );
}

export default Filme;
