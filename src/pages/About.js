import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiBorderRadius } from "react-icons/bi";

import "../styles/About.css"
import { TypeAnimation } from "react-type-animation";

const About = () => {

  const about = ` Rahul Kumar Singh is the driving
   force behind . With his passion for entrepreneurship and his deep understanding of the e-commerce industry, he has steered the company towards success.Rahul Kumar Singh    brings his expertise in relevant field  and a commitment to delivering the best products and services to our valued customers. He is constantly exploring new opportunities, partnerships, and technologies to ensure  Apna Bazar remains at the forefront of the industry.`

  return (
    <div className="about-wraper">

      <div className="about-container">

        <div className="left">

          <img
            src="/images/about.png"
            alt="contactus"
          />

        </div>

        <div className="right">
          <div className="content">

            <div className="heading">Meet the Owner</div>
            <div className="subheading">Rahul Kumar Singh - Founder and CEO</div>

            <div className="text">
              <TypeAnimation
                sequence={[
                  about , 3000 , ""
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{
                  display: 'block'
                }}
                omitDeletionAnimation={true}
              />

            </div>

          </div>
        </div>

      </div>

    </div>

    // </Layout>
  );
};

export default About;
