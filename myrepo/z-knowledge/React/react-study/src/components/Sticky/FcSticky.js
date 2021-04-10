import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const FcSticky = () => {
    
}

FcSticky.propTypes = {
    topOffset: PropTypes.number,
    bottomOffset: PropTypes.number,
    relative: PropTypes.bool,
    children: PropTypes.func.isRequired
}

FcSticky.defaultProps = {
    relative: false,
    topOffset: 0,
    bottomOffset: 0,
    disableCompensation: false,
    disableHardwareAcceleration: false
}

export default FcSticky