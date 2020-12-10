import React, { useState, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container,Row, Col, Card, CardBody,Form,Modal,FormGroup,Label,Button, CardTitle } from "reactstrap";
import Input from '../../components/Input/Input'
import {useForm} from 'react-hook-form'
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';
import axios from 'axios';
import MultiSelectbox from '../../components/MultiSelectbox/MultiSelectbox';
import TextArea from '../../components/TextArea/TextArea';
import './AddWord.scss'
import SelectBox from '../../components/SelectBox/SelectBox';
import CreateReferance from '../CreateReferance/CreateReferance';
import AutoComplete from '../../components/AutoCompleteInput/tt-autocomplete-input.jsx';
import { useStore } from 'react-redux';
import { Get, Post } from '../../services/fetchService';
import makeAnimated from 'react-select/animated';
import Select from "react-select";
import Swal from 'sweetalert2';

function AddWord() {
    const animatedComponents = makeAnimated();
    const {register,handleSubmit,errors,reset} = useForm();
    const [categries,setCategries]=useState([]);
    const [multiCategries,setMultiCategries]=useState([]);
    const [autocompleteWord,setAvtocompleteWord]=useState({ message:'', status:true, value:''});
    const [autocompleteRef,setAutocompleteRef]=useState({data:[],status:false});
    const [refId,setRefId] = useState('')
    const [modal_center,setModal_center]=useState(false);
    const [datas,setData]=useState({status:'',in_glossary:'',categories:[]});
    const [aztrans, setAzTrans] = useState({items:[1],count:1});
    const [translations,setTranslations] = useState([]);
    
    const part_of_speech = [
      {id:'isim',name:'isim'},
      {id:'sifət',name:'sifət'},
      {id:'say',name:'say'},
      {id:'əvəzlik',name:'əvəzlik'},
      {id:'feil',name:'feil'},
      {id:'zərf',name:'zərf'}];



    useEffect(()=>{
      let token=JSON.parse(localStorage.getItem('authUser'));
      Get(`${process.env.REACT_APP_API_URL}/categories/`,{
        headers:{
          'Authorization':token&&`${token.token_type} ${token.access_token}`
        }
      }).then(res=>{

        let data=[];
        res.data.forEach(x=>
          data.push({id:x.id,label:x.name,value:x.name})
        );

        setCategries([{
         options:data
        }])
      })
    },[])

    const onSubmit = data => {

        data['categories'] = multiCategries.map(x=>x.id);
        data['translations'] = translations;
        console.log('submitData',data)

        let token=JSON.parse(localStorage.getItem('authUser'));
        Post(`${process.env.REACT_APP_API_URL}/words/`,JSON.stringify(data),{
        headers:{
            'Content-Type':'application/json',
            'Authorization':token&&`${token.token_type} ${token.access_token}`
        }
        }).then(res => {
              
                console.log(res.data);
                Swal.fire({
                  icon:'success',
                  title:'Əməliyyat uğurla yerinə yetirildi',
                  text:res.data.message
                })

             document.getElementById('wordCreateFrom').reset()
            })

    }

    const inputOnChange=(e)=>{
        setData({
          ...datas,
          [e.target.name]:e.target.value
        })
    }

    const searchchange=(e)=>{
      let value=e.target.value;
        let token=JSON.parse(localStorage.getItem('authUser'));
      axios.get(`${process.env.REACT_APP_API_URL}/words?filter[in_english]=${e.target.value}`,{
          headers:{
              'Content-Type':'application/json',
              'Authorization':token&&`${token.token_type} ${token.access_token}`
          }
      })
      .then(res=>{

           if(res.data.data.length>0){
            setAvtocompleteWord({
              ...autocompleteWord,
              message:'bu söz mövcuddur',
              status:false,
              value:''
            })
           }else{
            setAvtocompleteWord({
              ...autocompleteWord,
              message:'',
              status:true,
              value:value
            })
           }
        
      })
    }

    const refOnChange = (e) => {
      let token=JSON.parse(localStorage.getItem('authUser'));
          axios.get(`${process.env.REACT_APP_API_URL}/references?filter[author]=${e.target.value}`,{
            headers:{
              'Content-Type':'application/json',
              'Authorization':`${token.token_type} ${token.access_token}`
            }
          })
               .then(res => {
                setAutocompleteRef({
                  ...autocompleteRef,
                  status:true,
                  data:res.data.data
                })
               })
               .catch(err => {
                 console.log(err)
               })
    }

    const clearAutocompleteRef = () => {
          
         setAutocompleteRef({
           data:[],
           status:false
         })
    }

    const getRef = (name,id) => {
      setRefId(id)
      console.log('name',name)
      console.log('id',id)
    }


    const  removeBodyCss=()=> {
        document.body.classList.add("no_padding");
      }
    const  tog_center=()=> {
        setModal_center(!modal_center)
        removeBodyCss();
      }

    const newTransAdd = () => {
    let newItems=aztrans.items;
        newItems.push(aztrans.count+=1)
    setAzTrans({
      ...aztrans,
      items:newItems,
      count:aztrans.count++
    })
    }

    const removeTransAdd = (x) => {
    let newItems=aztrans.items.filter(i=>i!==x);
    let newTranslate = translations;
        newTranslate.splice((x-1),1);
    console.log(newTranslate)
    console.log(x)

    setTranslations(newTranslate)
    setAzTrans({
      ...aztrans,
      items:newItems,
      count:aztrans.count!==1?aztrans.count-=1:aztrans.count
    })
    }

    const handleMultiCat = selected => {
      console.log(selected)
      setMultiCategries([ ...selected ]);
    };

    const translationHandle = (e,i) => {
      let newTranslation = translations;
      console.log(newTranslation)
        newTranslation[i-1] = {
          ...translations[i-1],
          [`${e.target.name}`]:e.target.value
        }
        setTranslations(newTranslation)
    }

console.log(aztrans)
    return (
      <>
        <div className="page-content">
        <Card>
        <CardBody>
        <Container fluid={true}>
        <Form onSubmit={handleSubmit(onSubmit)} id='wordCreateFrom' >
            <Row>
                <Col lg={6}>
                    <Input
                      labelName='İngiliscə ad'
                      required={true}
                      onChange={searchchange&&searchchange}
                      style={autocompleteWord.status===false?{'borderColor':'red'}:null}
                      errors={errors.name_en&&errors.name_en}
                      existMessage={autocompleteWord.message}
                      />

                      <input type='hidden' value={autocompleteWord.value}
                      name='in_english'
                      ref={register({
                        required:{value:true,message:'ad boş ola bilməz!'}
                    })}
                      />
                </Col>
                <Col lg={6}>
                <FormGroup className="mb-0 templating-select select2-container">
                  <Label className='lbl-star' for='categories'>Kateqoriya</Label>
                  <Select
                    //value={selectedMulti3}
                    isMulti={true}
                    name='categories'
                    onChange={handleMultiCat}
                    options={categries}
                    classNamePrefix="select2-selection"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    ref={register('categories')}
                  />
                  {/*<ErrorLabel text={errors.categories&&errors.categories.message}/>*/}
                </FormGroup>
              </Col>

            </Row>

            <Row>
                <Col lg={6}>
                  <Row>
                  {
                    aztrans.items.map(x=>{
                      return <> <Col lg={12}>
                              <div className='d-flex align-items-end'>
                              <Input
                              className='mr-3'
                              key={x}
                              name='word'
                              onChange={e =>translationHandle(e,x)}
                              labelName={`Azərbaycanca tərcümə ${x}`}
                             />
                             <SelectBox LabelName='Nitq hissəsi'
                                name='part_of_speech'
                                option={part_of_speech}
                                onChange={e =>translationHandle(e,x)}
                             />
                             {x!==1&&
                                <button type='button' onClick={()=>{
                                  removeTransAdd(x)
                              }} className='btn btn-danger align-self-center btn-sm mt-2 ml-2'>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                              </svg>
                              </button>
                             }
                              </div>
                             </Col>
                             </>
                    })
                  }
                  </Row>
                 <div className='d-flex justify-content-end'>
                    <button onClick={newTransAdd} type='button' className='ref-btn'><img className='mr-1' src={require('../../assets/images/icons/addRef.svg')} alt=''/><span>Yeni tərcümə</span></button>
                </div>
                </Col>
                <Col lg={6}>
                     <Input 
                      name='chapter'
                      Ref={register(
                        {
                          max:{value:56,message:'56-dan çox ola bilməz'},
                          min:{value:1,message:'1-dən az ola bilməz'}
                       })}
                      labelName='Fəsil'
                      placeholder='max 56'
                      type='number'
                      min={1}
                      max={56}
                     />
                </Col>

            </Row>

            <Row>
                 <Col lg={6}>
                {/* <div className='d-flex justify-content-around align-items-center'> */}

                <Row>
                  <Col lg={9}>
                    <AutoComplete
                       name='reference_id'
                       labelName='İstinad'
                       onChange={refOnChange}
                       getItem={getRef}
                       data={autocompleteRef}
                       clearAutocomplete={clearAutocompleteRef}
                    />
                  </Col>
                  <Col lg={3} className='pl-0'>
                    <Input 
                          className='ml-1 w-25' 
                          labelName='Səhifə' 
                          name='page' Ref={register()}
                          tooltipTitle='Sözün istinaddakı səhifəsi'  
                          type='number'/>
                  </Col>
                </Row>
                 
                 {/* </div> */}
                <input name='reference_id' type='hidden' value={refId} ref={register()}/>
                <div className='d-flex justify-content-end'>
                    <button onClick={tog_center} type='button' className='ref-btn'><img className='mr-1' src={require('../../assets/images/icons/addRef.svg')} alt=''/><span>İstinad əlavə et</span></button>
                </div>
                 </Col>
                 <Col lg={6}>
                      <Input className='mr-1' name='etymology' Ref={register()} labelName='Etimologiya'/>  
                 </Col>
              </Row>
              <Row>
            <Col lg={6}>
                <FormGroup className=''>
                <Label className='position-relative lbl-star'>Status</Label>
                   <div className='d-flex'>
                     <FormGroup className='d-flex align-items-center mr-3'>
                        <input onChange={inputOnChange} className="mr-2" type="radio" name="status" id="statusRadios1" value={1} />
                        <label className="form-check-label" htmlFor="statusRadios1">
                            Tərcümə olunub
                        </label>
                     </FormGroup>
                     <FormGroup className='d-flex align-items-center mr-3'>
                     <input onChange={inputOnChange} className="mr-2" type="radio" name="status" id="statusRadios2" value={0} />
                     <label className="form-check-label" htmlFor="statusRadios2">
                     Tərcümə olunmayıb
                     </label>
                  </FormGroup>
                  <FormGroup className='d-flex align-items-center mr-3'>
                  <input onChange={inputOnChange} className="mr-2" type="radio" name="status" id="statusRadios3" value={2} />
                  <label className="form-check-label" htmlFor="statusRadios3">
                      Təsdiqlənib
                  </label>
               </FormGroup>
                    <input name='status' type='hidden' value={datas.status} ref={register({required:{value:true,message:'status məcburidir!'}})} />
                   </div>
                   <ErrorLabel text={errors.status&&errors.status.message}/>
                </FormGroup>
                <FormGroup>
                <Label className=' position-relative lbl-star'>Lüğətdə varmı?</Label>
                <div className='d-flex'>
                <FormGroup className='d-flex align-items-center mr-3'>
                   <input onChange={inputOnChange} className="mr-2" type="radio" name="in_glossary" id="abRadios1" value={1} />
                   <label className="form-check-label" htmlFor="abRadios1">
                       Var
                   </label>
                </FormGroup>
                <FormGroup className='d-flex align-items-center mr-3'>
                <input onChange={inputOnChange} className="mr-2" type="radio" name="in_glossary" id="abRadios1" value={2} />
                <label className="form-check-label" htmlFor="abRadios1">
                    Yox
                </label>
             </FormGroup>
             <FormGroup className='d-flex align-items-center mr-3'>
                <input onChange={inputOnChange} className="mr-2" type="radio" name="in_glossary" id="abRadios1" value={0} />
                <label className="form-check-label" htmlFor="abRadios1">
                    Təyin edilməyib
                </label>
             </FormGroup>
             <input name='in_glossary' type='hidden' value={datas.in_glossary} ref={register({required:{value:true,message:'glossary məcburidir!'}})} />
              </div>
              <ErrorLabel text={errors.in_glossary?errors.in_glossary.message:null}/>
                </FormGroup>
            </Col>
            <Col lg={6}>
            <TextArea
              labelName='Qeyd'
              name='note'
              Ref={register()}
            />
           </Col>
            </Row>
            <Button className='mt-1 btn mr-2' color='primary' type='submit'>Əlavə et</Button>
            <Button className='mt-1 btn' onClick={()=>document.getElementById('wordCreateFrom').reset()}>Ləğv et</Button>
        </Form>
    </Container>
        </CardBody>
        </Card>

        {/* <Card>
           <CardBody>
             <Container>
               <Row>
                 <Col lg={12}>
                   <Form onSubmit={handleSubmit2(onSubmitFile)} className='d-flex align-items-center'>
                    <FormGroup className='m-0 w-50 mr-3'>
                      <div className="custom-file">
                       <input name='file' ref={register2({required:{value:true,message:'file mecburidir'}})} type="file" className="custom-file-input" id="customFile" />
                       <label className="custom-file-label"  htmlFor="customFile">Excel faylı seçin</label>
                       </div>
                    </FormGroup>
                    <Button className='btn' color='primary' type='submit'>Əlavə et</Button>
                   </Form>
                 </Col>
               </Row>
             </Container>
           </CardBody>
        </Card> */}
        </div>
        <Col sm={8} md={4} xl={3} className="mt-4"  >

        <Modal
            isOpen={modal_center}
            toggle={tog_center}
            centered={true}
            className='modal-lg'
        >
            <div className="modal-header">
                <h5 className="modal-title mt-0">İSTİNAD ƏLAVƏ ET</h5>
                <button
                    type="button"
                    onClick={tog_center}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true"><img src={require('../../assets/images/icons/x-w-icon.svg')} alt=''/></span>
                </button>
            </div>
            <div className="modal-body p-0">
               <CreateReferance toggleModal={tog_center}/>
            </div>
        </Modal>
    </Col>
    </>
    )
}

export default AddWord
