import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiBorderRadius } from "react-icons/bi";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "60%", height:500 , borderRadius:80}}
          />
        </div>
        <div className="col-md-4">
          <div className="text-justify mt-2">
       

            <p>
              <h3>Meet the Owner</h3>

              <h5>Rahul Kumar Singh - Founder and CEO</h5>

 
             <strong>Rahul Kumar Singh</strong> is the driving force behind . With his passion for entrepreneurship and his deep understanding of the e-commerce industry, he has steered the company towards success.

             <strong>Rahul Kumar Singh</strong>    brings his expertise in relevant field  and a commitment to delivering the best products and services to our valued customers. He is constantly exploring new opportunities, partnerships, and technologies to ensure <strong>Apna Bazar</strong>remains at the forefront of the industry.
            </p>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
