import React, { Component } from 'react';

import { Row, Col, CardBody, Card, Alert,Container } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { loginUser,apiError } from '../../store/actions';

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        // handleValidSubmit
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    // handleValidSubmit
    handleValidSubmit(event, values) {
        this.props.loginUser(values, this.props.history);
    }

    componentDidMount()
    {
        this.props.apiError("");
    }

    render() {

        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark"><i className="bx bx-home h2"></i></Link>
                </div>
                <div className="account-pages my-5 pt-sm-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="overflow-hidden">
                                    <div className="bg-soft-primary">
                                        <Row>
                                            <Col className="col-7">
                                                <div className="text-primary p-4">
                                                    <h5 className="text-primary">Welcome Back !</h5>
                                                    <p>Sign in to continue to Skote.</p>
                                                </div>
                                            </Col>
                                            <Col className="col-5 align-self-end">
                                                <img src={profile} alt="" className="img-fluid" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <CardBody className="pt-0">
                                        <div>
                                            <Link to="/">
                                                <div className="avatar-md profile-user-wid mb-4">
                                                    <span className="avatar-title rounded-circle bg-light">
                                                        <img src={logo} alt="" className="rounded-circle" height="34" />
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="p-2">

                                            <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>

                                                {this.props.error && this.props.error ? <Alert color="danger">{this.props.error}</Alert> : null}

                                                <div className="form-group">
                                                    <AvField name="email" label="Email" value="admin@gmail.com" className="form-control" placeholder="Enter email" type="email" required />
                                                </div>

                                                <div className="form-group">
                                                    <AvField name="password" label="Password" value="123456789" type="password" required placeholder="Enter Password" />
                                                </div>

                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                                </div>

                                                <div className="mt-3">
                                                    <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Log In</button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock mr-1"></i> Forgot your password?</Link>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p>Don't have an account ? <Link to="register" className="font-weight-medium text-primary"> Signup now </Link> </p>
                                    <p>© {new Date().getFullYear()} Skote. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { error } = state.Login;
    return { error };
}

export default withRouter(connect(mapStatetoProps, { loginUser,apiError })(Login));

