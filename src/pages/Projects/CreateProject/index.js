import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Dropzone from "react-dropzone";

//Import Images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.jpg";

import SimpleBar from "simplebar-react";

const CreateProject = () => {
    const SingleOptions = [
        { value: 'Watches', label: 'Watches' },
        { value: 'Headset', label: 'Headset' },
        { value: 'Sweatshirt', label: 'Sweatshirt' },
        { value: '20% off', label: '20% off' },
        { value: '4 star', label: '4 star' },
      ];

    const [selectedMulti, setselectedMulti] = useState(null);

    const handleMulti = (selectedMulti) => {
    setselectedMulti(selectedMulti);
    }  
    
    //Dropzone file upload
    const [selectedFiles, setselectedFiles] = useState([]);
  
    const handleAcceptedFiles = (files) => {
      files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size),
        })
      );
      setselectedFiles(files);
    }

        /**
     * Formats the size
     */
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

document.title="Create Project | Task360";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Create Project" pageTitle="Projects" />
                    <Row>
                        <Col lg={8}>
                            <Card>
                                <CardBody>
                                    <div className="mb-3">
                                        <Label className="form-label" htmlFor="project-title-input">Project Title <span className="text-danger">*</span></Label>
                                        <Input type="text" className="form-control" id="project-title-input"
                                            placeholder="Enter project title" required />
                                    </div>

                                    <div className="mb-3">
                                        <Row>
                                            <Col lg={6}>
                                                <div className="mb-3 mb-lg-0">
                                                    <Label className="form-label" htmlFor='project-number-input'>Project Number <span className="text-danger">*</span></Label>
                                                    <Input type="text" className="form-control" id="project-number-input"
                                                    placeholder="Enter project number" required />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-3 mb-lg-0">
                                                    <Label className="form-label" htmlFor='customer-input'>Customer <span className="text-danger">*</span></Label>
                                                    <Input type="text" className="form-control" id="customer-input"
                                                    placeholder="Customer" required />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mb-3">
                                        <Row>
                                            <Col lg={4}>
                                                <div>
                                                    <Label htmlFor="datepicker-startdate-input" className="form-label">Planned Start Date <span className="text-danger">*</span></Label>
                                                    <Flatpickr
                                                        className="form-control"
                                                        options={{
                                                        dateFormat: "d M, Y"
                                                        }}
                                                        placeholder="Select date"
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div>
                                                    <Label htmlFor="datepicker-enddate-input" className="form-label">Planned End Date <span className="text-danger">*</span></Label>
                                                    <Flatpickr
                                                        className="form-control"
                                                        options={{
                                                        dateFormat: "d M, Y"
                                                        }}
                                                        placeholder="Select date"
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mb-3 mb-lg-0">
                                                    <Label htmlFor="choices-project-lead-1-input" className="form-label">Project Lead 1 <span className="text-danger">*</span></Label>
                                                    <select className="form-select" data-choices data-choices-search-false required
                                                        id="choices-project-lead-1-input">
                                                        <option value="">Users</option>
                                                        <option value="Nagappan">Nagappan</option>
                                                        <option value="Vijayan">Vijayan</option>
                                                        <option value="Purushoth">Purushoth</option>
                                                    </select>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    
                                    <Row>
                                        <Col lg={4}>
                                            <div className="mb-3 mb-lg-0">
                                                <Label htmlFor="choices-project-lead-2-input" className="form-label">Project Lead 2</Label>
                                                <select className="form-select" data-choices data-choices-search-false
                                                    id="choices-project-lead-2-input">
                                                    <option value="">Users</option>
                                                    <option value="Nagappan">Nagappan</option>
                                                    <option value="Vijayan">Vijayan</option>
                                                    <option value="Purushoth">Purushoth</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mb-3 mb-lg-0">
                                                <Label htmlFor="choices-project-lead-3-input" className="form-label">Project Lead 3</Label>
                                                <select className="form-select" data-choices data-choices-search-false
                                                    id="choices-project-lead-3-input">
                                                    <option value="">Users</option>
                                                    <option value="Nagappan">Nagappan</option>
                                                    <option value="Vijayan">Vijayan</option>
                                                    <option value="Purushoth">Purushoth</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className='mb-3 mb-lg-0'>
                                                <Label className="form-label" htmlFor='customer-input'>Status</Label>
                                                <Input type="text" className="form-control" id="customer-input"
                                                value='ACTIVE' disabled />
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="mb-3 mt-3">
                                        <Label className="form-label" htmlFor='project-description-input'>Project Description</Label>
                                        <Input type="textarea" className="form-control" id="project-description-input"
                                            placeholder="Enter project description" />
                                    </div>
                                    
                                    <Row>
                                        <Col lg={4}>
                                            <div className="mb-3">
                                                <Label htmlFor="choices-priority-input" className="form-label">Priority</Label>
                                                <select className="form-select" data-choices data-choices-search-false
                                                    id="choices-priority-input">
                                                    <option value="High">High</option>
                                                    <option value="Low">Low</option>
                                                    <option value="Medium">Medium</option>
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <div className="text-end mb-4">
                                <button type="submit" className="btn btn-danger w-sm me-1">Delete</button>
                                <button type="submit" className="btn btn-success w-sm">Create / Update</button>
                            </div>
                        </Col>

                        <Col lg={4}>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CreateProject;