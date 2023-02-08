import React from 'react';



interface Props {
    imageUrl: string;
    title: string;
    description: string;

}

const CarouselInput: React.FC<Props> = ({ imageUrl, title, description }) =>(

    <div className = "carouselElement">
    <div className= "inner">
    <div className="left">
        <h1 className="headline">{title}</h1>
        <p>{(description.length >400 ) ?  (description.substring(0,399))+"..." : description}</p>
    </div>
        <div className="right">

            <img  className ="imageCarousel" src={imageUrl} alt={title} />

        </div>
    </div>
    </div>


);

export default CarouselInput;