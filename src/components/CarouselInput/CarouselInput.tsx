import React from 'react';
import "./CaruselInput.css"
import {Link} from "react-router-dom";



interface Props {
    imageUrl: string;
    title: string;
    description: string;
    id:string
}

const CarouselInput: React.FC<Props> = ({ imageUrl, title, description, id }) =>(

    <div className = "carouselElement">
    <div className= "inner">
    <div className="left">
        <Link className="headline" to="/MovieInfo" state={{props: {id}}}>
            {title}
        </Link>
        <p>{(description.length >400 ) ?  (description.substring(0,399))+"..." : description}</p>
    </div>
        <div className="right">

            <img  className ="imageCarousel" src={imageUrl} alt={title} />

        </div>
    </div>
    </div>


);

export default CarouselInput;