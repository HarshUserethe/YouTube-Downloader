import "../App.css";
import Logo from "../logo.png";
const About = () => {
  return (
    <div className="about">
      <div
        className="logo"
        
        style={{ width: "30vw", height: "10vh", marginTop: "2vw" }}
      >
        <img src={Logo} alt="" />
      </div>
      <div className="section">
        <p>
          <b>Media Magent</b> is an educational project
          developed by a passionate fullstack developer, aimed at providing
          users with a seamless experience in downloading high-quality videos
          from various social media platforms. With a focus on user convenience
          and a commitment to adhering to policies and guidelines, <b>Media Magent</b>
          allows users to effortlessly download videos without intrusive ads or
          unnecessary redirections. <br /><br /> At <b>Media Magent</b>, we understand the
          importance of respecting intellectual property rights and adhering to
          platform policies. Therefore, while we may reference popular social
          media platforms such as YouTube, Instagram, and Facebook for
          educational purposes, its important to note that we do not claim
          ownership of these platforms. Instead, we aim to provide a valuable
          educational resource for users to explore and understand the mechanics
          of video downloading. <br /><br />Utilizing the power of the MERN stack, our
          website offers a user-friendly interface where users can simply paste
          the URL of the desired video and download it with just one click. By
          prioritizing simplicity and functionality, we strive to enhance the
          learning experience and empower users to explore the intricacies of
          media downloading in a safe and hassle-free environment. <br /><br />Thank you for
          choosing <b>Media Magent</b> as your educational resource for video
          downloading. We are committed to continuously improving our platform
          to meet the needs of our users while upholding the highest standards
          of integrity and compliance with platform policies. <br /><br />
        </p>
      </div>
      <div className="social">
        <a href="" style={{color:"blue"}}><li><i className="ri-linkedin-box-fill"></i> linkedin/harshuserethe</li></a>
        <a href="" style={{color:"blue"}}><li><i className="ri-github-fill"></i> github/harshuserethe</li></a> 
      </div>
    </div>
  );
};

export default About;
