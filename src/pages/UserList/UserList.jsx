import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import './UserList.scss'
import { Container,Row,Col, Card, CardBody, CardFooter, UncontrolledTooltip } from "reactstrap";
import Axios from 'axios'
import moment from 'moment'

const UserList =(props)=>{

        const [users, setUsers] = useState(
            {
                loaded:false,
                data:[]
            }
            )

        const [groups,setGroups]=useState({
            loaded:false,
            data:[]
             }
            )

        useEffect(() => {
             let token=JSON.parse(localStorage.getItem('authUser'));

             Axios.get(`${process.env.REACT_APP_API_URL}/roles`,{
                headers:{
                    'Authorization':token&&`${token.token_type}${token.access_token}`
                }
            }).then(res=>{
                setGroups({
                    loaded:true,
                    data:res.data.data
                })
            }).catch(err=>console.log(err))

             Axios.get(`${process.env.REACT_APP_API_URL}/users`,{
                 headers:{
                    'Authorization':token&&`${token.token_type}${token.access_token}`
                 }
             }).then(res=>{
                 setUsers(
                     {
                        loaded:true,
                        data:res.data.data
                     }
                     )
             }).catch(err=>console.log(err))
        }, [])



        console.log('rendered',users)
        return (
            <React.Fragment>
                <Container>
                    <div className="page-content">
                        <Row>
                           {
                               users.loaded?
                               users.data.map(x=>{
                                return(
                                 <Col xl="3" sm="6" key={x.id}>
                                 <Link to={`user-info/${x.id}`} >
                                 <Card className="text-center card-hover">
                                 <CardBody>
                                     <div className='user-content'>
                                         <div className="mb-2">
                                             <img className="rounded-circle avatar-sm"  src={x.avatar} alt="" />
                                         </div>
                                         <address>
                                         <a href="mailto:webmaster@example.com">{x.email}</a>
                                         </address>
                                         <h5 className="font-size-15"><Link to="#" className="text-dark">{x.full_name}</Link></h5>
                                             <p className="text-muted">{(groups.data.length>0&&x.roles!==undefined)?groups.data.find(y=>y.id===x.roles[0])?.name:null}</p>
                                     </div>
                                 </CardBody>
                                 <CardFooter className="bg-transparent" style={{'borderTop':'1px solid #3e465f','padding':'10px 0px'}}>
                                     <div className="contact-links d-flex align-items-center font-size-12" style={{'justifyContent':'center'}}>
                                         <span style={{'width':'100%'}} className='mr-1'>Qoşulma tarixi </span>:
                                         <span style={{'fontSize':'small','width':'100%'}} className='ml-1'>{x.created_at}</span>
                                     </div>
                                 </CardFooter>
                             </Card>
                                 </Link>
                             </Col>
                                )
                            })
                            :null
                           }
                        </Row>
                    </div>
                </Container>
            </React.Fragment>
        );
}

export default UserList;