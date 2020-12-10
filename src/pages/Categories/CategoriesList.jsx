import React, { useState, useEffect } from 'react'
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import Pagination from 'react-paginate'
import {Link} from 'react-router-dom'
import Pencil from '../../assets/images/icons/pencil.svg'
import X from '../../assets/images/icons/x-icon.svg'

import './datatable.scss'
import axios from 'axios';
import { Get, Delete } from '../../services/fetchService';
import Input from '../../components/Input/Input'
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Swal from 'sweetalert2';
import '../../assets/scss/pagination.scss'

function CategoriesList() {

 const [data,setData]=useState({
  columns:[
   {
    label: "Kateqoriya Adı",
    field: "Kateqoriya Adı",
    sort: "asc",
    width: 50
  },
{
 label: "Düzəliş et",
 field: "Düzəliş et",
 sort: "asc",
 width: 50
},
{
 label: "Sil",
 field: "Sil",
 sort: "asc",
 width: 50,
 background:'.dt-col-border'
}
  ],
  rows:[],
  small:true,
  noBottomColumns:true
 });

 const [meta, setmeta] = useState({
   
 })

 const [filter, setfilter] = useState('')


 useEffect(()=>{
     let token=JSON.parse(localStorage.getItem('authUser'));
    Get(`${process.env.REACT_APP_API_URL}/categories/`,{
         headers:{
            'Authorization':token&&`${token.token_type}${token.access_token}`
        }
}).then(res=>{

       setData({
         ...data,
         rows:res.data.map(x=>{
          return {
           ['Kateqoriya Adı']:x.name,
           ['Düzəliş et']:<Link className='d-flex align-self-center  align-items-center'  to={`/categories-update/${x.id}`}><img  src={Pencil}/></Link>,
           ['Sil']:<span className='d-flex align-self-center  align-items-center' style={{"cursor":"pointer"}}  onClick={()=>Deleted(x.id)}><img  src={X}/></span>,
           borderBottom:'dt-col-border'
         }
         })
       });
       setmeta(res.meta)
    })
 },[])

 const Deleted = (id) => {
  Swal.fire({
    title:'Silmək istədiyinizə əminsiz?',
    icon:'warning',
    confirmButtonText: 'Təsdiqlə',
    cancelButtonText:'İmtina',
    showCancelButton:true,
    preConfirm:(result)=>{
       if(result){
           let token=JSON.parse(localStorage.getItem('authUser'));
    Delete(`${process.env.REACT_APP_API_URL}/categories/${id}`,{
        headers:{
            'Authorization':token&&`${token.token_type}${token.access_token}`
        }
    }).then(res=>{
         Get(`${process.env.REACT_APP_API_URL}/categories`,{
          headers:{
              'Authorization':token&&`${token.token_type}${token.access_token}`
          }
      }).then(res=>{
        setData({
          ...data,
          rows:res.data.map(x=>{
            return {
             ['Kateqoriya Adı']:x.name,
             ['Düzəliş et']:<Link className='d-flex align-self-center  align-items-center'  to={`/categories-update/${x.id}`}><img  src={Pencil}/></Link>,
             ['Sil']:<span className='d-flex align-self-center  align-items-center' style={{"cursor":"pointer"}}  onClick={()=>Deleted(x.id)}><img  src={X}/></span>,
             borderBottom:'dt-col-border'
           }
           })
        })
        setmeta(res.meta)
      })
        console.log(data.rows)
    })
       }
    }
  })


 }

 const searchFunc=(value)=>{
   setfilter(value)
  let token=JSON.parse(localStorage.getItem('authUser'));
  Get(`${process.env.REACT_APP_API_URL}/categories?filter[name]=${value}`,{
   headers:{
       'Authorization':token&&`${token.token_type}${token.access_token}`
   }
}).then((res)=>{
 setData({
   ...data,
   rows:res.data.map(x=>{
     return {
      ['Kateqoriya Adı']:x.name,
      ['Düzəliş et']:<Link className='d-flex align-self-center  align-items-center'  to={`/categories-update/${x.id}`}><img  src={Pencil}/></Link>,
      ['Sil']:<span className='d-flex align-self-center  align-items-center' style={{"cursor":"pointer"}}  onClick={()=>Deleted(x.id)}><img  src={X}/></span>,
      borderBottom:'dt-col-border'
    }
    })
 });
 setmeta(res.meta)
})
 }

 const searchCategory = (e)=>{
  if (e.keyCode === 13) {
    searchFunc(e.target.value)
  }
  }

  const pageChange = (e,i)=>{
    console.log(e)
    console.log(i)
  let token=JSON.parse(localStorage.getItem('authUser'));

     Get(`${meta.path}?page=${e.selected+1}${filter!==''?'&filter[name]='+filter:''}`,{
      headers:{
          'Authorization':token&&`${token.token_type}${token.access_token}`
      }
   }).then(res=>{
    setData({
      ...data,
      rows:res.data.map(x=>{
        return {
         ['Kateqoriya Adı']:x.name,
         ['Düzəliş et']:<Link className='d-flex align-self-center  align-items-center'  to={`/categories-update/${x.id}`}><img  src={Pencil}/></Link>,
         ['Sil']:<span className='d-flex align-self-center  align-items-center' style={{"cursor":"pointer"}}  onClick={()=>Deleted(x.id)}><img  src={X}/></span>,
         borderBottom:'dt-col-border'
       }
       })
    });
    //setmeta(res.meta)
   })
  }
 


 return (
  <React.Fragment>
  <div className="page-content">
    <div className="container-fluid">
      <Breadcrumbs title="Kateqoriya" breadcrumbItem="Kateqoriyalar" />
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
            <form className='d-flex justify-content-end' onSubmit={(e)=>{
                  e.preventDefault();
                  searchFunc(e.target[0].value)
               }}>
              <div className='d-flex align-items-center'>
               <Input placeholder='axtar...' onKeyDown={searchCategory} />
               <Button className='btn mt-1' type='submit'color='primary'><img src={require('../../assets/images/icons/search.svg')} alt=''/></Button>
              </div>
              </form>
              <MDBDataTable
                   className=''
                            theadColor='dt-color'
                            noBottomColumns={true}
                            borderless={true}
                            searching={false}
                            sortable={false}
                            paging={false}
                            responsive data={data} />
            </CardBody>

             <Pagination
                         containerClassName='d-flex list-unstyled justify-content-end align-items-center'
                         previousClassName='mr-3'
                         previousLabel='əvvəlki'
                         nextLabel='sonrakı'
                         nextClassName='mr-3' 
                         activeClassName=' bg-primary rounded-circle paginationItem'
                         pageClassName='mr-3'
                         onPageChange={pageChange} 
                         pageCount={meta?.last_page}/>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</React.Fragment>
 )
}

export default CategoriesList;