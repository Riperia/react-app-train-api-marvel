import './charList.scss';
import {useState,useEffect,useRef} from 'react';
import MarvelService from '../../services/MarvelService';




const  CharList =(props)=> {
const [charlist,setList]=useState([]);
const [offset,setOffset]=useState(210);

   const  marvelService = MarvelService();

    useEffect(()=>{
/*         window.addEventListener('scroll', showModalByScroll); */
        onRequest();  
        /* return () => {
            window.removeEventListener('scroll', showModalByScroll);
        }  */
    },[])

   
  
   


    const onRequest = (offset)=>{
        marvelService.getAllCharacters(offset)
        .then(onCharListLoaded) 
    }
    const onCharListLoaded = (newcharlist) => {
        setList(charlist=>[...charlist, ...newcharlist]);
        setOffset(offset=>offset+9);
    }
    const  showModalByScroll=()=> {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            onRequest(offset);
        }
    }
    const  itemRefs = useRef([]);
 

   const  focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    function renderItems(arr) {
        
        const items =  arr.map((item,i)=> {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li 
                    tabIndex={0}
                    ref={el=>itemRefs.current[i]=el}
                    className="char__item"
                    key={item.id}
                    onClick={()=> {
                        props.onCharSelected(item.id)
                        focusOnItem(i)}}>
                        <img src={item.thumbnail} alt={item.name} style ={imgStyle} />
                        <div className="char__name">{item.name}</div>
                        
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    const itemsa = renderItems(charlist);
    return (
        <div className="char__list">
            {itemsa}
            <button  className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
   
}

export default CharList;