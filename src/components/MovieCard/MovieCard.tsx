import React from 'react';
import { Card, Col, ConfigProvider, Row, theme } from 'antd';

const styles = {
    movie: {
        margin: 20,
        backgroundColor: "#555555",
        borderColor: "#61dafb",
        color: "white"
        }
};

interface Props {
  imageUrl: string;
  title: string;
  description: string;
}

const MovieCard: React.FC<Props> = ({ imageUrl, title, description }) => {
  return (
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
        <Card 
        title="Movie" 
        style={styles.movie} 
        headStyle={{color: "white"}}
        >
        <Row>
            <Col span={12}>
            <img src={imageUrl} alt={title} />
            </Col>
            <Col span={12}>
            <h3>{title}</h3>
            <p>{description}</p>
            </Col>
        </Row>
        </Card>
    </ConfigProvider>
  );
};

export default MovieCard;
