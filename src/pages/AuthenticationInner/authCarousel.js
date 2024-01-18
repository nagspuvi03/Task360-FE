import React from "react";
import { Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

// Import Images
import logoLight from "../../assets/images/logo-light.png";

const AuthSlider = () => {
    return (
        <React.Fragment>

            <Col lg={6}>
                <div className="p-lg-5 p-4 auth-one-bg h-100">
                    <div className="bg-overlay"></div>
                    <Link to="/dashboard" className="logo-link" style={{ position: 'absolute', top: '0', left: '0', zIndex: '1000'}}>
                        <img className='logo' src={logoLight} alt="" style={{ height: '200px', width: 'auto' }} />
                    </Link>
                    <div className="position-relative h-100 d-flex flex-column justify-content-between">
                        <div className="mt-auto" style={{ marginTop: '150px', marginBottom: '100px' }}>
                            <div className="mb-3">
                                <i className="ri-double-quotes-l display-4 text-success"></i>
                            </div>

                            <Carousel showThumbs={false} autoPlay={true} showArrows={false} showStatus={false} infiniteLoop={true} className="slide" id="qoutescarouselIndicators">
                                <div className="carousel-inner text-center text-white-50 pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" Empower Your Productivity, Task by Task: Task360 – Where Efficiency Meets Simplicity. "
                                        </p>
                                    </div>
                                </div>
                                <div className="carousel-inner text-center text-white-50 pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" Incentivize Progress, Manage Projects with Precision: A Winning Combination. "
                                        </p>
                                    </div>
                                </div>
                                <div className="carousel-inner text-center text-white-50 pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" Boost Your Workflow, Action by Action: Task360 – Seamlessly Blending Efficiency with Simplicity. "</p>
                                    </div>
                                </div>
                            </Carousel>

                        </div>
                    </div>
                </div>
            </Col>
        </React.Fragment >
    );
};

export default AuthSlider;