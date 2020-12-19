import React, { useRef, useEffect, useState } from 'react'
import './tt-autocomplete-input.scss'
import TTLIstItem from './tt-autocomplete-list-item'
import Input from '../Input/Input.jsx'
import { Label } from "reactstrap";

function TTAutocomplete({style,name,validation,getItem,helper,id,labelName,Ref,onChange,placeHolder,data,clearAutocomplete,value}) {

  //const [autocomplete,setavtocomplete]=useState([]);

   const ttInputRef=useRef();
   const autocompleteItems=useRef();
   const autocompleteItem=useRef([]);
   let currentFocus=''

//    let searchchange=(e)=>{
//     fetch(`${process.env.REACT_APP_API_URL}/${e.target.value}`)
//     .then(async res=>{
//       let data=await res.json();
//       if(Array.isArray(data.results)){
//         setavtocomplete([
//           ...data.results
//         ])
//       }
//     })
// }

   function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  };


  // function closeAllLists(elmnt){

  //    console.log(setavtocomplete)
  //   //setavtocomplete();

  // }

  function removeActive(x) {
   /*a function to remove the "active" class from all autocomplete items:*/
   for (var i = 0; i < x.length; i++) {
     x[i].classList.remove("autocomplete-active");
   }
 };

    const inputKeydown=(e)=>{
     var x = autocompleteItems.current;
     if (x) x = x.getElementsByTagName("div");
     if (e.keyCode == 40) {
       /*If the arrow DOWN key is pressed,
       increase the currentFocus variable:*/
       currentFocus++;
       /*and and make the current item more visible:*/
       addActive(x);
     } else if (e.keyCode == 38) { //up
       /*If the arrow UP key is pressed,
       decrease the currentFocus variable:*/
       currentFocus--;
       /*and and make the current item more visible:*/
       addActive(x);
     } else if (e.keyCode == 13) {
       /*If the ENTER key is pressed, prevent the form from being submitted,*/
       e.preventDefault();
       if (currentFocus > -1) {
         /*and simulate a click on the "active" item:*/
         if (x) x[currentFocus].click();
       }
     }
    }

    const itemEventListener=(ttInputRef,e)=>{
       let name = e.target.getAttribute('data-name')
       let id =e.target.getAttribute('data-id');
       console.log("name",name)
       ttInputRef.current.value = name;
       getItem(name,id)
        //closeAllLists()
        clearAutocomplete()
    }

   useEffect(()=>{
    document.addEventListener("click", function (e) {
     //closeAllLists(e.target);
 });
   })
   console.log('data',data)
 return (

  <div className="autocomplete w-100" style={{"width":"100%"},style}>
    <Input 
           Ref={(e)=>{ttInputRef.current=e}}
           labelName={labelName}
           onKeyDown={inputKeydown}
           onChange={onChange}
           value={value}
           id={id} 
           type="text" 
           name={name}
           placeholder={placeHolder}/>

    <div className='autocomplete-items' ref={autocompleteItems}>
      {
        data.status===true?
        data.data.map((x,i)=>{
         return(
           <TTLIstItem key={i}
                       val={ttInputRef.current.value} 
                       x={x}
                       reff={(e)=>autocompleteItem.current.push(e)}
                       refProp={ttInputRef} 
                       click={itemEventListener}/>
         )
        })
        :null
      }
    </div>
  </div>
 )
}

export default React.memo(TTAutocomplete)
