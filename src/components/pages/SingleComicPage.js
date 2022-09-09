import './singleComic.scss';
import {useParams,Link} from 'react-router-dom';
import MarvelService from '../../services/MarvelService';
import { useEffect,useState } from 'react';


const SingleComicPage = () => {

    let {comicId} =useParams()
    const [comic,setComic] =useState([])
    const {getComic} = MarvelService();
    
    useEffect(() => {
        updateComic()
    }, [comicId])
    
    
    
    
     const  updateComic = () => {
         getComic(comicId)
         .then(OncomicLoaded)
        }
    
      const  OncomicLoaded = (comic) => {
         setComic(comic);
        }

        const content = <View comic={comic}/> ;
    return (
        <div>
      {content}
      </div>
    )

}
const View= ({comic}) =>{
    const {title, description, pageCount, thumbnail, language, price} = comic;
    return(
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;