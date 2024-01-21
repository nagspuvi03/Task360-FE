import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import AuthSlider from '../AuthenticationInner/authCarousel';
import withRouter from "../../Components/Common/withRouter";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetLoginFlag } from '../../slices/thunks';
import { createSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState(false);

    const selectLayoutState = (state) => state;
    const loginpageData = createSelector(
        selectLayoutState,
        (state) => ({
            user: state.Account.user,
            error: state.Login.error,
            loading: state.Login.loading,
            errorMsg: state.Login.errorMsg,
        })
    );

    const {
        user, error, loading, errorMsg
    } = useSelector(loginpageData);

    const validation = useFormik({
        initialValues: {
            userId: '',
            password: '',
        },
        validationSchema: Yup.object({
            userId: Yup.string().required("Please Enter Your User ID"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, navigate));
        }
    });

    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, errorMsg]);

    document.title = "Login | Task360";

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-2 pb-lg-2" style={{ minHeight: '50vh '}}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div style={{ marginBottom: '72px' }}>
                                                    <h5 className="text-primary">Welcome Back !</h5>
                                                    <p className="text-muted">Sign in to continue to Task360.</p>
                                                </div>
                                                {errorMsg && (<Alert color="danger"> {errorMsg} </Alert>)}

                                                <div className="mt-4">
                                                    <Form onSubmit={validation.handleSubmit}>

                                                        <div className="mb-4">
                                                            <Label htmlFor="userId" className="form-label">User ID</Label>
                                                            <Input
                                                                name='userId'
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Enter User ID"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.userId}
                                                                invalid={
                                                                    validation.touched.userId && !!validation.errors.userId
                                                                } 
                                                            />
                                                            {validation.touched.userId && validation.errors.userId ? (
                                                                <FormFeedback type="invalid">{validation.errors.userId}</FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-4">
                                                            {/* <div className="float-end">
                                                                <Link to="/auth-pass-reset-cover" className="text-muted">Forgot password?</Link>
                                                            </div> */}
                                                            <Label className="form-label" htmlFor="password-input">Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    name='password'
                                                                    value={validation.values.password || ""}
                                                                    type={passwordShow ? "text" : "password"} 
                                                                    className="form-control pe-5 password-input"
                                                                    placeholder="Enter password" 
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    invalid={
                                                                        validation.touched.password && !!validation.errors.password
                                                                    }
                                                                />
                                                                {validation.touched.password && validation.errors.password ? (
                                                                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                                ) : null}
                                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-5">
                                                            <Button color="success" disabled={loading}  className="btn btn-success w-100" type="submit">
                                                                {loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}
                                                                Sign In
                                                            </Button>
                                                        </div>

                                                    </Form>
                                                </div>

                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <footer className="footer">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Akranta Software Technologies Private Limited. </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>

            </div>
        </React.Fragment>
    );
};

export default Login;