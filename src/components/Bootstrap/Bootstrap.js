import React from 'react'
//We want to use react-bootstrap components in this Bootstrap.js component. first we install with 'npm install react-bootstrap'
//After installing the package, we must import the react-bootstrap components we wish to use
import { Carousel, Container, Row, Col, Accordion} from 'react-bootstrap'

//Below are the images for our Carousel
import image from '../../images/background.jpg'
import image2 from '../../images/background2.jpg'
import image3 from '../../images/background3.jpg'

import './Bootstrap.css'

//style
import './Bootstrap.css'

export default function Bootstrap() {
  return (
    <section className='bootstrap'>
        <main>
            {/* We can pass optional props that further customize the Carousel */}
            <Carousel controls={false} fade>
                <Carousel.Item>
                    {/* Carousel item has an image and a caption */}
                    <img src={image} alt='First Slide' className='d-block w-100'/>
                    <Carousel.Caption>
                        <h3>First Slide</h3>
                        <p>This is an example caption</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* Carousel item has an image and a caption */}
                    <img src={image2} alt='Second Slide' className='d-block w-100'/>
                    <Carousel.Caption>
                        <h3>Second Slide</h3>
                        <p>This is an example caption</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* Carousel item has an image and a caption */}
                    <img src={image3} alt='Third Slide' className='d-block w-100'/>
                    <Carousel.Caption>
                        <h3>Third Slide</h3>
                        <p>This is an example caption</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </main>
    </section>
  )
}
