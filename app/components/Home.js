import React from 'react'

const Home = () => {
  return (
    <section id="hero">
      <div className="hero-container">
        <div id="heroCarousel" className="carousel slide carousel-fade" data-ride="carousel">

          {/* <ol className="carousel-indicators" id="hero-carousel-indicators"></ol> */}

          <div className="carousel-inner" role="listbox">

            {/* <!-- Slide 1 --> */}
            <div className="carousel-item active">
              <div className="carousel-container">
                <div className="carousel-content container">
                  <h2 className="animate__animated animate__fadeInDown">Welcome to <span>Dog Academy</span></h2>
                  <p className="animate__animated animate__fadeInUp">Dog Academy's mission is to improve canine-human relationships through educational outreach.</p>
                </div>
              </div>
            </div>

            {/* <!-- Slide 2 -->
            <div className="carousel-item" style={{backgroundImage: "url(https://looklocalmagazine.com/newmarketaurora/wp-content/uploads/sites/4/2018/08/SFTails2014-206.jpg)"}}>
              <div className="carousel-container">
                <div className="carousel-content container">
                  <h2 className="animate__animated animate__fadeInDown">Our Community</h2>
                  <p className="animate__animated animate__fadeInUp">We work closely with local veterinarians, rescues, dog trainers, and the general public. Contact us if you are interested in workshops, consultations, foster programs, monthly socials, or partnerships.</p>
                </div>
              </div>
            </div>

            <!-- Slide 3 -->
            <div className="carousel-item" style={{backgroundImage: "url(https://secureservercdn.net/198.71.233.109/17m.4af.myftpupload.com/wp-content/uploads/2016/08/485947173.jpg)"}}>
              <div className="carousel-container">
                <div className="carousel-content container">
                  <h2 className="animate__animated animate__fadeInDown">Education</h2>
                  <p className="animate__animated animate__fadeInUp">Our school is licensed through the state of Oregon and offers certificate programs in dog training and dog handling. We also host opportunities for continuing education and specialized workshops.</p>
                </div>
              </div>
            </div> */}

          </div>

          {/* <a className="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon icofont-rounded-left" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon icofont-rounded-right" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a> */}

        </div>
      </div>
    </section>
  )
}

export default Home
