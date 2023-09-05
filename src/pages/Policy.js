import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
  
        <h1>Personal Information:</h1>
        <p>When you create an account, place an order, or contact us, we may collect personal information such as your name, email address, shipping address, billing address, and telephone number. We only collect the information necessary to fulfill your order or provide customer support.</p>

        <h1>Payment Information:</h1>
        <p>For payment processing, we may collect and store your payment card details or other financial information. Please note that we do not directly process or store your payment information. We utilize trusted third-party payment processors who comply with industry standards for secure payment processing.</p>



        </div>
      </div>
  );
};

export default Policy;
