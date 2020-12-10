import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";

function Breadcrumbs ({title,titleLink,breadcrumbItem,breadcrumbItemLink}) {

        return (
            <React.Fragment>
                <Row>
                    <Col xs="12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 font-size-18">{breadcrumbItem}</h4>
                            <div className="page-title-right">
                                <Breadcrumb listClassName="m-0">
                                    <BreadcrumbItem>
                                        <Link to={titleLink}>{title}</Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem active>
                                        <Link to={breadcrumbItemLink}>{breadcrumbItem}</Link>
                                    </BreadcrumbItem>
                                </Breadcrumb>
                            </div>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }


export default Breadcrumbs;