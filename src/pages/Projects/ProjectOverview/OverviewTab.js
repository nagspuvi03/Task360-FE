import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';

//import images
import avatar8 from "../../../assets/images/users/avatar-8.jpg";
import avatar10 from "../../../assets/images/users/avatar-10.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import image4 from "../../../assets/images/small/img-4.jpg";
import image5 from "../../../assets/images/small/img-5.jpg";

//SimpleBar
import SimpleBar from "simplebar-react";

const OverviewTab = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xl={9} lg={8}>
                    <Card>
                        <CardBody>
                            <div className="text-muted">
                                <h6 className="mb-3 fw-semibold text-uppercase">Summary</h6>
                                <p>It will be as simple as occidental in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.</p>

                                <ul className="ps-4 vstack gap-2">
                                    <li>Product Design, Figma (Software), Prototype</li>
                                    <li>Four Dashboards : Ecommerce, Analytics, Project,etc.</li>
                                    <li>Create calendar, chat and email app pages.</li>
                                    <li>Add authentication pages.</li>
                                    <li>Content listing.</li>
                                </ul>

                                <div>
                                    <button type="button" className="btn btn-link link-success p-0">Read more</button>
                                </div>

                                <div className="pt-3 border-top border-top-dashed mt-4">
                                    <Row>

                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium">Project Lead :</p>
                                                <h5 className="fs-15 mb-0">Vijayan M</h5>
                                            </div>
                                        </Col>
                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium">Priority :</p>
                                                <div className="badge bg-danger fs-12">High</div>
                                            </div>
                                        </Col>
                                        <Col lg={3} sm={6}>
                                            <div>
                                                <p className="mb-2 text-uppercase fw-medium">Status :</p>
                                                <div className="badge bg-warning fs-12">Inprogress</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </CardBody>

                    </Card>
                </Col>

                <Col xl={3} lg={4}>
                    <Card>
                        <CardHeader className="align-items-center d-flex border-bottom-dashed">
                            <h4 className="card-title mb-0 flex-grow-1">Members</h4>
                            <div className="flex-shrink-0">
                                <button type="button" className="btn btn-soft-danger btn-sm" data-bs-toggle="modal" data-bs-target="#inviteMembersModal"><i className="ri-share-line me-1 align-bottom"></i> Add Member</button>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <SimpleBar data-simplebar style={{ height: "235px" }} className="mx-n3 px-3">
                                <div className="vstack gap-3">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-xs flex-shrink-0 me-3">
                                            <img src={avatar2} alt="" className="img-fluid rounded-circle" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="fs-13 mb-0"><Link to="#" className="text-body d-block">Nancy Martino</Link></h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex align-items-center gap-1">
                                                <button type="button" className="btn btn-light btn-sm">Message</button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle type="button" className="btn btn-icon btn-sm fs-16 text-muted dropdown" tag="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-eye-fill text-muted me-2 align-bottom"></i>View</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-star-fill text-muted me-2 align-bottom"></i>Favourite</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="avatar-xs flex-shrink-0 me-3">
                                            <div className="avatar-title bg-danger-subtle text-danger rounded-circle">
                                                HB
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="fs-13 mb-0"><Link to="#" className="text-body d-block">Henry Baird</Link></h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex align-items-center gap-1">
                                                <button type="button" className="btn btn-light btn-sm">Message</button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle type="button" className="btn btn-icon btn-sm fs-16 text-muted dropdown" tag="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-eye-fill text-muted me-2 align-bottom"></i>View</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-star-fill text-muted me-2 align-bottom"></i>Favourite</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="d-flex align-items-center">
                                        <div className="avatar-xs flex-shrink-0 me-3">
                                            <img src={avatar3} alt="" className="img-fluid rounded-circle" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="fs-13 mb-0"><Link to="#" className="text-body d-block">Frank Hook</Link></h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex align-items-center gap-1">
                                                <button type="button" className="btn btn-light btn-sm">Message</button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle type="button" className="btn btn-icon btn-sm fs-16 text-muted dropdown" tag="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-eye-fill text-muted me-2 align-bottom"></i>View</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-star-fill text-muted me-2 align-bottom"></i>Favourite</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="avatar-xs flex-shrink-0 me-3">
                                            <img src={avatar4} alt="" className="img-fluid rounded-circle" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="fs-13 mb-0"><Link to="#" className="text-body d-block">Jennifer Carter</Link></h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex align-items-center gap-1">
                                                <button type="button" className="btn btn-light btn-sm">Message</button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle type="button" className="btn btn-icon btn-sm fs-16 text-muted dropdown" tag="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-eye-fill text-muted me-2 align-bottom"></i>View</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-star-fill text-muted me-2 align-bottom"></i>Favourite</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="avatar-xs flex-shrink-0 me-3">
                                            <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                                AC
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="fs-13 mb-0"><Link to="#" className="text-body d-block">Alexis Clarke</Link></h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex align-items-center gap-1">
                                                <button type="button" className="btn btn-light btn-sm">Message</button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon btn-sm fs-16 text-muted dropdown">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-eye-fill text-muted me-2 align-bottom"></i>View</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-star-fill text-muted me-2 align-bottom"></i>Favourite</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="d-flex align-items-center">
                                        <div className="avatar-xs flex-shrink-0 me-3">
                                            <img src={avatar7} alt="" className="img-fluid rounded-circle" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="fs-13 mb-0"><Link to="#" className="text-body d-block">Joseph Parker</Link></h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex align-items-center gap-1">
                                                <button type="button" className="btn btn-light btn-sm">Message</button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon btn-sm fs-16 text-muted dropdown">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-eye-fill text-muted me-2 align-bottom"></i>View</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-star-fill text-muted me-2 align-bottom"></i>Favourite</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </SimpleBar>

                        </CardBody>

                    </Card>
                    <Card>
                        <CardHeader className="align-items-center d-flex border-bottom-dashed">
                            <h4 className="card-title mb-0 flex-grow-1">Attachments</h4>
                            <div className="flex-shrink-0">
                                <button type="button" className="btn btn-soft-info btn-sm"><i className="ri-upload-2-fill me-1 align-bottom"></i> Upload</button>
                            </div>
                        </CardHeader>

                        <CardBody>

                            <div className="vstack gap-2">
                                <div className="border rounded border-dashed p-2">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar-sm">
                                                <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                    <i className="ri-folder-zip-line"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="fs-13 mb-1"><Link to="#" className="text-body text-truncate d-block">App-pages.zip</Link></h5>
                                            <div>2.2MB</div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <div className="d-flex gap-1">
                                                <button type="button" className="btn btn-icon text-muted btn-sm fs-18"><i className="ri-download-2-line"></i></button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded border-dashed p-2">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar-sm">
                                                <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                    <i className="ri-file-ppt-2-line"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="fs-13 mb-1"><Link to="#" className="text-body text-truncate d-block">Velzon-admin.ppt</Link></h5>
                                            <div>2.4MB</div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <div className="d-flex gap-1">
                                                <button type="button" className="btn btn-icon text-muted btn-sm fs-18"><i className="ri-download-2-line"></i></button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded border-dashed p-2">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar-sm">
                                                <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                    <i className="ri-folder-zip-line"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="fs-13 mb-1"><Link to="#" className="text-body text-truncate d-block">Images.zip</Link></h5>
                                            <div>1.2MB</div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <div className="d-flex gap-1">
                                                <button type="button" className="btn btn-icon text-muted btn-sm fs-18"><i className="ri-download-2-line"></i></button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded border-dashed p-2">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar-sm">
                                                <div className="avatar-title bg-light text-secondary rounded fs-24">
                                                    <i className="ri-image-2-line"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="fs-13 mb-1"><Link to="#" className="text-body text-truncate d-block">bg-pattern.png</Link></h5>
                                            <div>1.1MB</div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <div className="d-flex gap-1">
                                                <button type="button" className="btn btn-icon text-muted btn-sm fs-18"><i className="ri-download-2-line"></i></button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="button" className="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button">
                                                        <i className="ri-more-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li><DropdownItem><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</DropdownItem></li>
                                                        <li><DropdownItem><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-center">
                                    <button type="button" className="btn btn-success">View more</button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OverviewTab;