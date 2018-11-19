import React,{ Component} from 'react';
import { throws } from 'assert';

class App extends Component{

    constructor(){
        super();
        this.state = {
            products:[],
            pages:[1],
            qtdProdutos : 0,

            filter: "",
            selectItensPerPage : 5,
            qtdpgs:1,
            pg:1
        };

        this.handleChange = this.handleChange.bind(this);
        this.changeSelectItensPerPage = this.changeSelectItensPerPage.bind(this);
        this.pagination = this.pagination.bind(this);
    }

    // Utilizado para remover produtos
    deleteProduct(id){
        console.log(id)
        fetch(`/api/product/${id}`,{
            method:"DELETE",
            headers:
            {
                "Accept":"application/json",
                'Content-Type':"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            
            M.toast({
                html:"Product deleted"
            });

            this.fetchproducts()
        })
    }

    //Chama o método após o componente ser montado
    componentDidMount(){
        this.fetchproducts()
    }

    //Método para ir até a paginação desejada
    pagination(pg){

        this.state.pg = pg;
        this.setState({pg: pg});
        this.fetchproducts();
        
    }

    //Método para tratar a aginação próxima e a anterior
    paginationNextPriors(IsNext){

        if(IsNext){
            if(this.state.pg + 1  <= this.state.qtdpgs)
            {
                this.state.pg++;
                this.setState({pg: this.state.pg});
                this.fetchproducts();
            }
        }
        else{
            if(this.state.pg - 1  > 0)
            {
                this.state.pg--;
                this.setState({pg: this.state.pg});
                this.fetchproducts();
            }
        }
    }

    
    //Obter produto pela API REST
    fetchproducts(){

        if (this.state.filter.length > 2 || this.state.filter.length == 0){

            fetch("/api/product?pg="+this.state.pg+"&itenspg="+this.state.selectItensPerPage+ "&filter=" + this.state.filter)
            .then(res => res.json())
            .then(data => {
                this.setState({products: data.dados, qtdProdutos: data.qtd});
                this.state.qtdpgs =  data.qtdpgs;
                this.createPages();
                })
        }
    }


    //Metodo responsavel por atualizar todos os campos na variável de controle state
    handleChange(e){
        
        const { name, value} = e.target;
        this.setState({
            [name]:value
        })

        if(name == "filter")
        {
            this.state.filter = value;
            this.fetchproducts()
        }
    }

     //Metodo responsavel por alterar os itens por página
    changeSelectItensPerPage(e){
        const { value} = e.target;
        this.state.selectItensPerPage = value;
        this.fetchproducts()
        
    }

    //Metodo responsavel por criar um elemento para a iteração da paginação
    createPages()
    {
        this.state.pages= []

        for(var i = 1 ; i <= this.state.qtdpgs ; i++)
            this.state.pages.push(i);

        this.setState({pages : this.state.pages})
    }


    render() {
        return (
            <div>
            <nav className="white">
                <div className="nav-wrapper">
                <a href="#!" className="brand-logo" style={{ left:"2%"}} ><svg id="icon-logo-mmartan" viewBox="0 0 264 32" style={{height:"28px", left:"2%",color: "rgb(128, 108, 92)",fill: "currentcolor"}} width="50%" height="20%">
                <title>logo-mmartan</title>
                <path d="M0.188 12.8c0-1.882 0-4.329-0.188-6.212h6.965c0 1.318 0.188 2.635 0.188 3.953 2.824-3.388 5.835-4.894 9.788-4.894 4.518 0 8.282 1.882 10.165 5.647 2.635-4.329 6.588-5.647 10.541-5.647 4.518 0 11.294 1.882 11.294 11.482v14.871h-7.153v-13.365c0-6.212-2.635-7.718-6.212-7.718-3.765 0-7.341 2.824-7.341 9.035v12.047h-7.153v-13.365c0-6.212-2.635-7.718-6.212-7.718-3.765 0-7.341 2.824-7.341 9.035v12.047h-7.341v-19.2z"></path>
                <path d="M58.541 12.8c0-1.882-0.188-4.329-0.188-6.212h6.965c0.188 1.318 0.188 2.635 0.188 3.953 2.824-3.388 5.835-4.894 9.788-4.894 4.518 0 8.282 1.882 10.165 5.647 2.635-4.329 6.588-5.647 10.541-5.647 4.518 0 11.294 1.882 11.294 11.482v14.871h-7.153v-13.365c0-6.212-2.635-7.718-6.212-7.718-3.765 0-7.341 2.824-7.341 9.035v12.047h-7.153v-13.365c0-6.212-2.635-7.718-6.212-7.718-3.765 0-7.341 2.824-7.341 9.035v12.047h-7.153v-19.2z"></path>
                <path d="M142.871 26.353c0 1.694 0 3.012 0.188 4.706h-6.776c-0.188-1.129-0.188-2.259-0.188-3.388-3.012 3.012-6.776 4.329-11.671 4.329-8.659 0-11.482-3.953-11.482-7.529 0-7.718 7.341-9.035 16.565-9.035h6.024c0-4.329-3.012-5.459-6.776-5.459-3.576 0-5.647 1.506-6.024 3.388h-7.718c0.753-6.212 7.529-7.718 13.741-7.718 6.776 0 13.929 1.882 13.929 10.541v10.165zM129.318 19.953c-5.647 0-8.847 1.129-8.847 4.141 0 1.694 1.318 3.953 5.647 3.953 3.576 0 9.224-2.071 9.224-8.094h-6.024z"></path>
                <path d="M150.776 12.235c0-2.259-0.188-4.329-0.188-6.024h7.341c0 1.318 0.188 2.824 0.188 4.329v0c0.753-1.694 2.447-4.894 8.282-4.894 1.694 0 3.012 0.188 4.894 0.565v5.459c-0.376-0.188-0.941-0.188-1.506-0.188s-1.129-0.188-1.882-0.188c-6.212 0-9.412 2.447-9.412 9.035v9.788h-7.529v-17.882z"></path>
                <path d="M185.224 0v6.965h8.659v5.647h-8.659v10.541c0 2.635 1.129 4.141 3.953 4.141 1.506 0 3.576-0.188 4.518-0.376v4.706c-1.882 0.188-4.141 0.376-6.212 0.376-7.341 0-9.6-2.447-9.6-8.094v-11.294h-4.706v-5.647h4.894v-5.271l7.153-1.694z"></path>
                <path d="M227.576 26.353c0 1.694 0 3.012 0.188 4.706h-6.776c-0.188-1.129-0.188-2.259-0.188-3.388-3.012 3.012-6.776 4.329-11.671 4.329-8.471 0-11.482-3.953-11.482-7.529 0-7.718 7.341-9.035 16.565-9.035h5.835c0-4.329-3.012-5.459-6.776-5.459-3.576 0-5.647 1.506-6.024 3.388h-7.718c0.753-6.212 7.529-7.718 13.741-7.718 6.776 0 13.929 1.882 13.929 10.541v10.165zM214.024 19.953c-5.647 0-8.847 1.129-8.847 4.141 0 1.694 1.318 3.953 5.647 3.953 3.576 0 9.224-2.071 9.224-8.094h-6.024z"></path>
                <path d="M235.482 12.612c0-2.259 0-4.329-0.188-6.024h6.965c0.188 1.506 0.188 2.824 0.188 4.141v0c2.447-3.576 5.647-5.082 10.165-5.082 4.329 0 10.918 2.447 10.918 10.729v15.624h-7.153v-13.365c0-6.212-2.635-7.718-6.212-7.718-3.765 0-7.341 2.824-7.341 9.035v12.047h-7.153v-19.388z"></path>
                </svg></a>
                <ul className="right hide-on-med-and-down" style={{ marginRight:"20px"}}>
                    <li>
                    <input type="text" className="white" name="filter" value={this.state.filter} onChange={this.handleChange} style={{ borderBottom:"1px solid rgb(128, 108, 92)", boxShadow: "0 1px 0 0 rgb(98, 78, 62)"}}    results="5" placeholder="Procurar..."  />
                    </li>
                </ul>
                </div>
            </nav>
            <div className="card blue-grey lighten-5" style={{marginTop: "4px", color:"rgb(127,124,151)", backgroundColor:"rgb(236,239,241)"}}>    
                    <div className="row " >
                    <div className="col s12 " >
                        <h3 style={{"margin": "20px"}}>

                            {this.state.filter == "" ? "Lista de produtos" :this.state.filter }
                        </h3>
                    </div> 
                    </div>
            </div>

               <div className="container">    
                    <div className="row">
                        <div style={{margin:"20px 0px 20px 10px",display: "table", borderBottom:"2px solid rgb(223,190,127)"}}>
                            {this.state.qtdProdutos} PRODUTOS ENCONTRADOS
                        </div>
                        <div className="col s12">
                       
                        <table style={{width:"100%", border:"1px solid rgb(224,224,224)"}} >
                            <tbody>
                                {
                                    this.state.products.map(prod =>
                                        {
                                            return (
                                                <tr key={prod._id}>
                                                    <td style={{padding:"0px 0px",width: "360px"}}>

                                                    { 
                                                        prod.Images.map((img, index) =>
                                                        {
                                                            return (
                                                            
                                                            <img key={index}  src={img} width="80px" style={{margin:"4px"}} ></img>
                                                            

                                                            )

                                                        })
                                                    }
                                                    </td>
                                                    <td style={{padding:"0px 0px"}}><b>{prod.Name}</b>
                                                    <br/>
                                                    <span style={{color:"gray"}} >
                                                        {prod.Type} - {prod.Model}
                                                    </span>
                                                    </td>

                                                            <td style={{textAlign:"right", paddingRight:"15px"}} >

                                                            <span style={{color:"gray",textDecoration: "line-through"}} className={prod.PriceOld ? '' : 'hidden'} >
                                                            
                                                            
                                                            {new Intl.NumberFormat('pt-BR', { 
                                                                style: 'currency', 
                                                                currency: 'BRL',
                                                                minimumFractionDigits: 2, 
                                                                maximumFractionDigits: 2 
                                                                }).format(prod.PriceOld)} 
                                                            </span> <span style={{color:"gray"}} className={prod.PriceOld ? '' : 'hidden'}> por</span> {new Intl.NumberFormat('pt-BR', { 
                                                                style: 'currency', 
                                                                currency: 'BRL',
                                                                minimumFractionDigits: 2, 
                                                                maximumFractionDigits: 2 
                                                                }).format(prod.Price)}
                                                            {/* <button  onClick={()=> this.deleteProduct(prod._id)}>Excluir</button> */}
                                                     </td>
                                                </tr>
                                            )
                                        })
                                }
                                
                            </tbody>
                        </table>
                       
                        </div>

                        <div className="row">
                        
                        <div className="input-field col s3">
                            <select style={{display: "block"}} name="selectItensPerPage" value={this.state.selectItensPerPage} onChange={this.changeSelectItensPerPage}>
                            <option value="5">5 produtos por página</option>
                            <option value="10">10 produtos por página</option>
                            <option value="15">15 produtos por página</option>
                            <option value="20">20 produtos por página</option>
                            </select>
                        </div>
                        <div className="input-field  col s4">
                        &nbsp;
                        </div>
                        <div className="input-field  col s4" style={{float: "right"}} >
                            <ul className="pagination">


                                <li className={ this.state.pg == 1 ? "disabled white" : ""}><a href="#!" disabled={this.state.pg == 1}  onClick={()=> this.pagination(1)}><i className="fas fa-angle-double-left"></i></a></li>
                                <li className={ this.state.pg == 1 ? "disabled white" : ""}><a href="#!" disabled={this.state.pg == 1}  onClick={()=> this.paginationNextPriors(false)}><i className="fas fa-angle-left"></i></a></li>
                                {
                                    this.state.pages.map( (item,index) => {
                                         
                                        return ( 
                                             
                                            <li key={index} className="active white" style={ this.state.pg == item ? {border: "1px solid rgb(190,190,190)"}:{}}  >
                                                 <a href="#!" style={{color: "black"}} onClick={()=> this.pagination(item)}>{item}</a>
                                            </li>
                                        )
                                    })
                                }
                               
                                <li className={ this.state.pg == this.state.qtdpgs ? "disabled white" : ""}><a href="#!" disabled={this.state.pg == this.state.qtdpgs} onClick={()=> this.paginationNextPriors(true)}><i className="fas fa-angle-right"></i></a></li>
                                <li className={ this.state.pg == this.state.qtdpgs ? "disabled white" : ""}><a href="#!" disabled={this.state.pg == this.state.qtdpgs} onClick={()=> this.pagination(this.state.pages.length)}><i className="fas fa-angle-double-right"></i></a></li>

                            </ul>
                        </div>


                        </div>
                    </div>
               </div>
            </div>
        )
    }
}




export default App;