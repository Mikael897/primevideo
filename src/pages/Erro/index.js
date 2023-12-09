import { Link } from 'react-router-dom';
import './erro.css';
function Erro(){
    return(
        <div className="not-found">
         <h1>ERROR 404</h1>   
        <h2>Essa pagina não existe</h2>
        <Link to="/">Veja todos os filmes!</Link>
        </div>
    )
}

export default Erro;