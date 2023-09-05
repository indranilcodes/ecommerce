import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

import "../styles/Contactus.css"

const Contact = () => {
  return (

      <div className="row contactus ">

        <div className="col-md-6 ">
         
          <img
            src="/images/contact.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />

        </div>

        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
             <BiMailSend /> 
             
              <a style={{ textDecoration: 'none' }} href="mailto:rahulsingh8556kumar@gmail.com">rahulsingh8556kumar@gmail.com</a>
            
          </p>
          <p className="mt-3">
            <p className="mt-3">
              <BiPhoneCall />
              <a style={{ textDecoration: 'none' }} href="tel:9335344202"> +919335344202</a>
            </p>
          </p>
          <p className="mt-3">
            <BiSupport /> <a style={{ textDecoration: 'none' }} href="tel:8115456218"> +918115456218</a>
          </p>
        </div>
      </div>
   
  );
};

export default Contact;
