import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const PaginaInicio = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="h-100">
            <nav className="navbar px-3" style={{background:"black"}}>
                <div className="container-fluid d-flex justify-content-between">
                    <img className="navbar-brand" src="" />

                    <form className="d-flex" role="search">
                        <a href="/RegistroUsuario" className="nav-link text-white" style={{ fontFamily: 'Raleway, sans-serif' }}>Registrarme</a>
                        <p className="nav-link text-white">/</p>
                        <a href="/Login" className="nav-link text-white" style={{ fontFamily: 'Raleway, sans-serif' }} onClick={(e) => {
                            e.preventDefault();
                            navigate("/Login");

                        }}>Ingresar</a>

                    </form>

                </div>
            </nav>


            <div className="position-relative">
                <img className="position-absolute top-50 start-0 translate-middle-y " style={{width:"1366px", height:"600px", transform:"scaleX(-1)"}}  src="https://www.grupobillingham.com/blog/wp-content/uploads/2022/12/planner-agenda-calendario.jpg"/>
                <div className="bg-white" style={{width:"1366px", height:"600px"}}>
                    <div className="cuadronegro">

                    </div>
                
                    <div className="position-absolute top-0 start-50 px-5 " >
                        <h1 className="text-white text-center text-decoration-underline" style={{ fontSize: "60px", fontFamily: 'Tahoma, Verdana, Segoe, sans-serif' , marginTop:"60px" }}>CalendApp</h1>
                        <h2 className=" text-center text-white my-5" style={{ fontSize: "40px", fontFamily: "Tahoma, Verdana, Segoe, sans-serif" }}>Una nueva forma de gestion de agendas</h2>
                       <h3 className=" text-white fs-6 d-flex justify-content-center">Todo lo que queres en un solo lugar. </h3>
                       <h3 className="text-white fs-6 d-flex justify-content-center">Ingresa y consegui tu agenda para lo que necesites.</h3>
                        
                    </div>
                </div>
            </div>

            {/* Footer negro */}
            <div className="footer p-2 text-white position-relative" style={{background:"black"}}></div>
            <div className="footer p-5 text-black position-relative" style={{background:"white"}}>
            <div className="cuadrogris">

            </div>
            <p className=" d-flex fs-5 justify-content-center my-5" style={{ fontFamily: 'Raleway, sans-serif' }}>Somos una plataforma que facilita la interacción usuario-empresa, generando un entorno fácil y ágil para gestionar la agenda de cada empresa.</p>
               

               <div className="my-5 d-flex justify-content-center z-1">
                   <img className="my-4 mx-3" style={{width:"150px", height:"150px"}} src="https://images.qdq.com/U3PNYfky0ZJHVCPpnvp77sPzw0c=/800x800/smart/filters:format(JPEG)/photos/629/629555757/02f26b0cd37c457083b230044b351ad8.jpg"/>
                   
                   <img className="my-4 mx-3" style={{width:"150px", height:"150px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXqmmd32-yJtA3zAzTQDWQcBlo_Y15HCj3lw&usqp=CAU"/>
                   
                   <img className="my-4 mx-3" style={{width:"150px", height:"150px"}} src="https://cdn2.paraty.es/mareny-corpo/images/6a03aec88d2ca3e=s800-c"/>
                   
                   <img className="my-4 mx-3" style={{width:"150px", height:"150px"}} src="https://images.qdq.com/4Q3QPFH2PJhKorde-M-hMAF9IDs=/800x800/smart/filters:format(JPEG)/photos/465/465901632/mobile_dba2755e052f496189b570e759e78618.jpg"/>
              
                   <img className="my-4 mx-3" style={{width:"150px", height:"150px"}} src="https://www.casa.org.ar/src/img_up/13052022.117.jpg"/>
   
                   <img className="my-4 mx-3" style={{width:"150px", height:"150px"}} src="https://images.qdq.com/8yZfTbrKpfgl8tmHc2HcQ9jwUTg=/800x800/smart/filters:format(JPEG)/photos/303/303189649/d208582c806e407e95c0b0f49d7c8e58.jpg"/>
   
                   <img className="my-4 mx-3" style={{width:"150px", height:"150px"}} src="https://images.qdq.com/a1VSsaxcRG-R_ds-QGTg-R79oow=/800x800/smart/filters:format(JPEG)/photos/523/523960173/ed0d8855fc7449a0a75aab220fd6015b.jpg"/>
   
                   <img className="my-4 mx-3" style={{width:"150px", height:"150px"}} src="https://marerestaurante.es/wp-content/uploads/2022/05/mare-restaurante.jpg"/>
              
               
              </div> 
              < p className="my-1 fs-5 text d-flex justify-content-center z-1" style={{ fontFamily: 'Raleway, sans-serif' }}>Odontologos, Centros Estéticos, Gimnasios, Institutos de clases particulares, entre otros, nos eligen.</p>
              <p className="my-1 d-flex fs-5 justify-content-center z-1" style={{ fontFamily: 'Raleway, sans-serif' }}>Las empresas que necesiten gestinar sus agendas lo pueden hacer a través de CApp.</p>
              
            </div>
            <div className="my-5 d-flex justify-content-center z-1">
                <i className="fa-solid fa-user-plus mx-5 text-secondary" style={{fontSize:"100px"}}></i>
                <h2>Registrate</h2>
        
                <i className="fa-solid fa-right-to-bracket mx-5 text-secondary" style={{fontSize:"100px"}}></i>
                <h2>Ingresá</h2>
        
                <i className="fa-regular fa-calendar-days mx-5 text-secondary" style={{fontSize:"100px"}}></i>
                <h2>Agendate para lo que necesties</h2>
            </div>
            <div style={{marginBottom: "30px"}}>
                < p className="my-1 fs-5 text d-flex justify-content-center z-1" style={{ fontFamily: 'Raleway, sans-serif' }}>Los usuarios tienen acceso a un listado de empresas o pofesionales donde puede elegir el de su preferencia para agendar su cita.</p>
                < p className="my-1 fs-5 text d-flex justify-content-center z-1" style={{ fontFamily: 'Raleway, sans-serif' }}>Las empresas tienen acceso a su listado de citas.</p>
                
                
              
            </div>
            <footer className="footer p-5 text-white position-relative" style={{background:"black"}}>
                <div className="position-absolute top-0 start-50 translate-middle-x my-3"> 
                    <hr style={{border:"0px", bordertop: "5px", double: "#000"}}></hr>
                    <i className="fa-brands fa-facebook d-inline p-2 fs-5 text"></i>
                    <i className="fa-brands fa-twitter d-inline p-2 fs-5 text"></i>
                    <i className="fa-brands fa-instagram d-inline p-2 fs-5 text"></i>
                    <h3 className="fs-6 text text-center">CalendApp</h3>
                </div>
            </footer>
        </div>


    );
};
