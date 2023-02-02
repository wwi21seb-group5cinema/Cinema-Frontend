import React from 'react';
import { Carousel } from 'antd';
interface Props {
    Movies: React.ReactElement[]
}

const MovieCarousel: React.FC<Props> = ({ Movies }) => (

    <Carousel autoplay>
        {Movies}
    </Carousel>

);

export default MovieCarousel;