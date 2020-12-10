import React, {useState, useEffect} from 'react';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {MDBDataTable} from "mdbreact";
import SelectBox from "../../components/SelectBox/SelectBox";
import {Table, Tbody, Td, Th, Thead, Tr} from "react-super-responsive-table";

import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button, Nav, NavItem, NavLink, TabContent, TabPane, Media, CardHeader } from "reactstrap";
import classnames from 'classnames';

//Import Star Ratings
import StarRatings from 'react-star-ratings';

//Import Product Images
import img4 from "../../assets/images/product/img-4.png";
import img6 from "../../assets/images/product/img-6.png";
import img7 from "../../assets/images/product/img-7.png";
import img8 from "../../assets/images/product/img-8.png";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import { Get } from '../../services/fetchService';
import Input from '../../components/Input/Input';


function WordProfile({match}){

    const [userComment,setUserComment]=useState({
        comments: [
            { id: 1, img: avatar2, name: "Brian", description: "If several languages coalesce, the grammar of the resulting language.", date: "5 hrs ago" },
            {
                id: 2, img: avatar4, name: "Denver", description: "To an English person, it will seem like simplified English, as a skeptical Cambridge", date: "07 Oct, 2019",
                childComment: [
                    { id: 1, img: avatar5, name: "Henry", description: "Their separate existence is a myth. For science, music, sport, etc.", date: "08 Oct, 2019" },
                ]
            },
            { id: 3, img: "Null", name: "Neal", description: "Everyone realizes why a new common language would be desirable.", date: "05 Oct, 2019" },
        ],
        recentProducts: [
            { id: 1, img: img7, name: "Wirless Headphone", link: "", rating: 4, oldPrice: 240, newPrice: 225 },
            { id: 2, img: img4, name: "Phone patterned cases", link: "", rating: 3, oldPrice: 150, newPrice: 145 },
            { id: 3, img: img6, name: "Phone Dark Patterned cases", link: "", rating: 4, oldPrice: 138, newPrice: 135 },
        ],
        activeTab: '1',
    });

    const [word,setWord]=useState({
        "id": null,
        "in_english": null,
        "in_azerbaijani": null,
        "note": null,
        "image": null,
        "status": null,
        "reference_id": null,
        "in_glossary": null,
        "chapter": null,
        "category_id": null,
        "created_at": null,
        "category": {
          "id": null,
          "name": null
        },
        "reference": {
          "id": 7,
          "title":null,
          "author": null,
          "year": null,
          "url": null
        }
      },)

    useEffect(()=>{
        let id = match.params.id;
        let token = JSON.parse(localStorage.getItem('authUser'));
        
        Get(`${process.env.REACT_APP_API_URL}/words/${id}`,{
            headers:{
                'Authorization':token&&`${token.token_type} ${token.access_token}`
              }
        }).then(res=>{
           setWord(res.data)
        })
    },[])




    return(
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Word Profile" breadcrumbItem="Word Profile" />
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <div className="table-rep-plugin">
                                        <div className="table-responsive mb-0" data-pattern="priority-columns">
                                            <Table id="tech-companies-1" className="table table-striped table-bordered">
                                                <Thead>
                                                    <Tr>
                                                        <Th data-priority="1">Termin</Th>
                                                        <Th data-priority="2">Tərcümə</Th>
                                                        <Th data-priority="3">Nitq Hissəsi</Th>
                                                        <Th data-priority="4">İstinad</Th>
                                                        <Th data-priority="5">Lüğətdə var ?</Th>
                                                        <Th data-priority="6">Fəsil</Th>
                                                        <Th data-priority="7">Kateqoriya</Th>
                                                        <Th data-priority="8">Status</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>

                                                    <Tr>
                                                        <Th>{word?.in_english}</Th>

                                                        <Td>{word?.translations?.map(t=><span className='d-block'>{t.word}</span>)}</Td>
                                                        <Td>{word?.translations?.map(t=><span className='d-block'>{t.part_of_speech}</span>)}</Td>

                                                        <Td>
                                                        {word.reference?.author},
                                                        {word.reference?.title},
                                                        {word.reference?.url},
                                                        {word.reference?.year}
                                                        </Td>

                                                        <Td>{
                                                            word?.in_glossary===0?
                                                            'Bilinmir'          :
                                                            word?.in_glossary===1?
                                                            'Lüğətdə var'       :
                                                            word?.in_glossary===2?
                                                            'Lüğətdə yoxdur'    : null
                                                        }</Td>

                                                        <Td>{word?.chapter}</Td>

                                                        <Td>{word.categories?.map(c=><span className='d-block'>{c.name}</span>)}</Td>

                                                        <Td>{
                                                            word?.status===0     ?
                                                            'Tərcümə olunmayıb' :
                                                            word?.status===1     ?
                                                            'Tərcümə olunub'    :
                                                            word?.status===2     ?
                                                            'Təstiqlənib'       : null
                                                        }</Td>

                                                    </Tr>

                                                </Tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="page-content">
                <div className="container-fluid">

                            <Card>
                            <CardHeader>Kommentlər</CardHeader>
                                <CardBody>
                                <Input placeholder='komment yaz' onKeyUp={(e)=>{
                                    if (e.keyCode === 13) {
                                        console.log(e.target.value)
                                      }
                                }}/>
                                    <div>
                                        {
                                            userComment.comments.map((comment, k) =>
                                                <Media className={comment.id === 1 ? "border-bottom" : "border-bottom mt-3"} key={"__media__" + k}>
                                                    {
                                                        comment.img !== "Null" ?
                                                            <img src={comment.img} className="avatar-xs mr-3 rounded-circle" alt="img" />
                                                            : <div className="avatar-xs mr-3">
                                                                    <span className="avatar-title bg-soft-primary text-primary rounded-circle font-size-16">
                                                                        N
                                                                </span>
                                                            </div>
                                                    }
                                                    <Media body>
                                                        <h5 className="mt-0 mb-1 font-size-15">{comment.name}</h5>
                                                        <p className="text-muted mb-1">{comment.description}</p>
                                                        <ul className="list-inline float-sm-right">
                                                            <li className="list-inline-item">
                                                                <Link to="#"><i className="far fa-comment-dots mr-1"></i> Comment</Link>
                                                            </li>
                                                        </ul>
                                                        <div className="text-muted font-size-12 mb-3"><i className="far fa-calendar-alt text-primary mr-1"></i>{comment.date}</div>
                                                        {
                                                            comment.childComment ?
                                                                comment.childComment.map((child, key) =>
                                                                    <Media  key={"_media_" + key}>
                                                                        <img src={child.img} className="avatar-xs mr-3 rounded-circle" alt="img" />
                                                                        <Media body>
                                                                            <h5 className="mt-0 mb-1 font-size-15">{child.name}</h5>
                                                                            <p className="text-muted mb-1">{child.description}</p>
                                                                            <ul className="list-inline float-sm-right">
                                                                                <li className="list-inline-item">
                                                                                    <Link to="#"><i className="far fa-comment-dots mr-1"></i> Comment</Link>
                                                                                </li>
                                                                            </ul>
                                                                            <div className="text-muted font-size-12"><i className="far fa-calendar-alt text-primary mr-1"></i> {child.date}</div>
                                                                            <Input onKeyUp={(e)=>{
                                                                                if (e.keyCode === 13) {
                                                                                    console.log(e.target.value)
                                                                                  }
                                                                            }}/>
                                                                        </Media>
                                                                    </Media>
                                                                )

                                                                : null
                                                        }
                                                    </Media>
                                                </Media>
                                            )
                                        }
                                    </div>
                                </CardBody>
                            </Card>





                </div>
            </div>
        </React.Fragment>
    )
}

export default WordProfile;