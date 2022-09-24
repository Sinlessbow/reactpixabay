import React, {Component} from "react";
import Buscador from "./componentes/Buscador";
import Resultado from "./componentes/Resultado";

class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina: ''
  }


  paginaAnterior = () => {

    let pagina=this.state.pagina;

    if(pagina ===1) return null;

    pagina-= 1;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
    });

    //console.log(pagina);
  }

  paginaSiguiente = () => {

    let pagina=this.state.pagina;

    pagina+= 1;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
    });

    //console.log(pagina);
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=24747310-28311fc709aa97d11e1ee4f91&q=${termino}&per_page=30=&page=${pagina}`;

    console.log(url);

    fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => this.setState({ imagenes : resultado.hits}) )


  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }

  render () {
    return (
      <div className="app container">
        <div className="container-fluid text-sm-center p-5 bg-light">
          <p className="lead text-center">Buscador de Imágenes</p>

          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
          <div className= "list-group-item d-flex justify-content-center align-items-center flex-wrap">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
          </div>
      </div>
    );
  }
}

export default App;
 