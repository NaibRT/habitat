import React, { useState, useEffect, useMemo } from 'react'
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody,Button } from "reactstrap";
import {Link} from 'react-router-dom'
import Pencil from '../../assets/images/icons/pencil.svg'
import X from '../../assets/images/icons/x-icon.svg'

import './datatable.scss'
import axios from 'axios';
import { Delete, Get } from '../../services/fetchService';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Input from '../../components/Input/Input'
import Pagination from 'react-paginate'
import '../../assets/scss/pagination.scss'
import Swal from 'sweetalert2';

function References() {

 const [data,setData]=useState({
  columns:[
   {
    label: "Yazar adı",
    field: "Yazar adı",
    sort: "asc",
    width: 50
  },
  {
   label: "Kitabın adı",
   field: "Kitabın adı",
   sort: "asc",
   width: 50
 },
 {
  label: "Nəşr ili",
  field: "Nəşr ili",
  sort: "asc",
  width: 50
},
{
 label: "Kitabın linki",
 field: "Kitabın linki",
 sort: "asc",
 width: 50
},
{
 label: "Ətraflı",
 field: "Ətraflı",
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
  noBottomColumns:true,
  updated_Id:''
 });

 const [meta, setmeta] = useState({
   
})
const [filter, setfilter] = useState('')


 useEffect(()=>{
     let token=JSON.parse(localStorage.getItem('authUser'));
     Get(`${process.env.REACT_APP_API_URL}/references/`,{
        headers:{
            'Authorization':token&&`${token.token_type}${token.access_token}`
        }
    }).then(res=>{
        
        let rows = res.data.map(x=>{
          return {
            id:x.id,
           ['Yazar adı']:x.author,
           ['Kitabın adı']:x.title,
           ['Nəşr ili']:x.year,
           ['Kitabın linki']:<a style={{wordBreak:'breake-all'}} href={x.url}>{x.url}</a>,
           ['Ətraflı']:<Link style={{'color':'#ffffff'}} to={`/reference-words/${x.author}:${x.title}/${x.id}`}><Button className='btn btn-sm btn-rounded w-100' color='primary'>Ətraflı</Button></Link>,
           ['Düzəliş et']:<Link className='d-flex align-self-center  align-items-center'  to={`/reference-edit/${x.id}`}><img src={Pencil}/></Link>,
           ['Sil']:<Link className='d-flex align-self-center  align-items-center' onClick={()=>deleteReference(x.id)}><img  src={X}/></Link>,
           borderBottom:'dt-col-border'
         }
         });
       setData({
         ...data,
         rows:rows
       })
       setmeta(res.meta)

    }).catch()

 },[])

 
 const deleteReference = (id) => {

  Swal.fire({
    title:'Silmək istədiyinizə əminsiz?',
    icon:'warning',
    confirmButtonText: 'Təsdiqlə',
    cancelButtonText:'İmtina',
    showCancelButton:true,
    preConfirm:(result)=>{
       if(result){
        let token=JSON.parse(localStorage.getItem('authUser'));
        Delete(`${process.env.REACT_APP_API_URL}/references/${id}`,{
          headers:{
              'Authorization':token&&`${token.token_type}${token.access_token}`
          }
        }).then((res)=>{
          Get(`${process.env.REACT_APP_API_URL}/references/`,{
            headers:{
                'Authorization':token&&`${token.token_type}${token.access_token}`
            }
        }).then(res=>{
    
            let rows = res.data.map(x=>{
              return {
                id:x.id,
               ['Yazar adı']:x.author,
               ['Kitabın adı']:x.title,
               ['Nəşr ili']:x.year,
               ['Kitabın linki']:x.url,
               ['Ətraflı']:<Link style={{'color':'#ffffff'}} to={`/reference-words/(${x.author}:${x.title})/${x.id}`}><Button className='btn btn-sm btn-rounded w-100' color='primary'>Ətraflı</Button></Link>,
               ['Düzəliş et']:<Link className='d-flex align-self-center  align-items-center'  to={`/reference-edit/${x.id}`}><img src={Pencil}/></Link>,
               ['Sil']:<Link className='d-flex align-self-center  align-items-center' onClick={()=>deleteReference(x.id)}><img  src={X}/></Link>,
               borderBottom:'dt-col-border'
             }
             });
           setData({
             ...data,
             rows:rows
           })
           setmeta(res.meta)
        })
        })
       }
    }
  })
 }

 const searchFunc=(value)=>{
  setfilter(value)
 let token=JSON.parse(localStorage.getItem('authUser'));
 Get(`${process.env.REACT_APP_API_URL}/references?filter[all]=${value}`,{
  headers:{
      'Authorization':token&&`${token.token_type}${token.access_token}`
  }
}).then((res)=>{
setData({
  ...data,
  rows:res.data.map(x=>{
    return {
      id:x.id,
     ['Yazar adı']:x.author,
     ['Kitabın adı']:x.title,
     ['Nəşr ili']:x.year,
     ['Kitabın linki']:x.url,
     ['Ətraflı']:<Link style={{'color':'#ffffff'}} to={`/reference-words/${x.author}:${x.title}/${x.id}`}><Button className='btn btn-sm btn-rounded w-75' color='primary'>Ətraflı</Button></Link>,
     ['Düzəliş et']:<Link className='d-flex align-self-center  align-items-center'  to={`/reference-edit/${x.id}`}><img src={Pencil}/></Link>,
     ['Sil']:<Link className='d-flex align-self-center  align-items-center' onClick={()=>deleteReference(x.id)}><img  src={X}/></Link>,
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

     Get(`${meta.path}?page=${e.selected+1}${filter!==''?'&filter[all]='+filter:''}`,{
      headers:{
          'Authorization':token&&`${token.token_type}${token.access_token}`
      }
   }).then(res=>{
    setData({
      ...data,
      rows:res.data.map(x=>{
        return {
          id:x.id,
         ['Yazar adı']:x.author,
         ['Kitabın adı']:x.title,
         ['Nəşr ili']:x.year,
         ['Kitabın linki']:x.url,
         ['Ətraflı']:<Link style={{'color':'#ffffff'}} to={`/reference-words/${x.author}:${x.title}/${x.id}`}><Button className='btn btn-sm btn-rounded w-100' color='primary'>Ətraflı</Button></Link>,
         ['Düzəliş et']:<Link className='d-flex align-self-center  align-items-center'  to={`/reference-edit/${x.id}`}><img src={Pencil}/></Link>,
         ['Sil']:<Link className='d-flex align-self-center  align-items-center' onClick={()=>deleteReference(x.id)}><img  src={X}/></Link>,
         borderBottom:'dt-col-border'
       }
       })
    });
    //setmeta(res.meta)
   })
  }

   
     console.log(data.rows)   

 return (
  <React.Fragment>
  <div className="page-content">
    <div className="container-fluid">
      <Breadcrumbs title="İstinadlar" breadcrumbItem="Bütün istinadlar" />
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
            <form className='d-flex justify-content-end' onSubmit={(e)=>{
                  e.preventDefault();
                  searchFunc(e.target[0].value)
               }}>
              <div className='d-flex align-items-center jus'>
               <Input placeholder='axtar...'  onKeyDown={searchCategory} />
               <Button className='btn mt-1' type='submit'color='primary'><img src={require('../../assets/images/icons/search.svg')} alt=''/></Button>
              </div>
              </form>
              <MDBDataTable
                            theadColor='dt-color'
                            noBottomColumns={true}
                            borderless={true}
                            searching={false}
                            sortable={false}
                            paging={false}
                            responsive data={data} 
                            />
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</React.Fragment>
 )
}

export default References
