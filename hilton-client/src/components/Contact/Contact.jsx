import React from 'react'

import './Contact.css'

function Star() {
  return (
    <span className={`material-symbols-rounded star text-amber-400`}>
			star
		</span>
  )
}

export default function Contact() {
  return (
    <section className="w-full">
      <div className="contact-bg h-[50vh] w-full mx-auto flex items-center justify-center bg-cover bg-fixed flex-col">
        <div className="w-1/2 z-10">
          <p className="uppercase">Get In Touch</p>
          <h1 className="text-5xl font-medium gilda">Contact Us</h1>
        </div>
      </div>

      <div className="bg-darker py-24">
        <div className="px-20 md:px-10 w-full">
          <div className="flex flex-col pb-14 justify-between md:flex-row gap-10">
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <h2 className="gilda text-2xl">
                Enjoy a Luxury Experience
              </h2>
              <p className="text-sm font-thin text-dark">
                Hotel ut nisl quam nestibulum ac quam nec odio elementum sceisue
                the aucan ligula. Orci varius natoque penatibus et magnis dis
                parturient monte nascete ridiculus mus nellentesque habitant
                morbine.
              </p>
              <div className="flex items-center gap-3">
                <span className="material-symbols-rounded text-4xl text-beg-color">phone_in_talk</span>
                <div className="flex flex-col">
									<span className="text-xs tracking-widest text-dark">
										For information
									</span>
                  <a href="/"
                     className="text-beg-color tracking-wider">
                    18001234567
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-rounded text-4xl text-beg-color">mail</span>
                <div className="flex flex-col">
									<span className="text-xs tracking-widest text-dark">
										Email info
									</span>
                  <a href="/"
                     className="text-beg-color tracking-wider">
                    hiltonhotel.organization@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-rounded text-4xl text-beg-color">location_on</span>
                <div className="flex flex-col">
									<span className="text-xs tracking-widest text-dark">
										Adress
									</span>
                  <p className="text-xs tracking-widest text-dark">
                    1616 Broadway NY, New York 10001
                    United States of America
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <h2 className="gilda text-2xl">
                Get in touch
              </h2>
              <form className="w-full flex flex-col gap-6">
                <div className="flex gap-4 w-full ">
                  <input className="bg-transparent border-b border-b-dark focus:border-b-beg-color outline-0 placeholder-darkest-color font-thin w-1/2 pb-2"
                         name="name"
                         placeholder="Your Name*" />
                  <input className="bg-transparent border-b border-b-dark focus:border-b-beg-color outline-0 placeholder-darkest-color font-thin w-1/2 pb-2"
                         name="email"
                         placeholder="Your Email*" />
                </div>
                <div className="flex gap-4">
                  <input className="bg-transparent border-b border-b-dark focus:border-b-beg-color outline-0 placeholder-darkest-color font-thin w-1/2 pb-2"
                         name="name"
                         placeholder="Your Number*" />
                  <input className="bg-transparent border-b border-b-dark focus:border-b-beg-color outline-0 placeholder-darkest-color font-thin w-1/2 pb-2"
                         name="email"
                         placeholder="Subject*" />
                </div>
                <div className="w-full">
                  <textarea className="bg-transparent border-b border-b-dark focus:border-b-beg-color outline-0 placeholder-darkest-color font-thin w-full pb-1 h-20"
                            placeholder="Message*" />
                </div>
                <button className="tracking-widest w-36 py-3 bg-beg-color font-thin">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="w-full">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.0520372550063!2d55.235500911913036!3d25.100099777680917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6f4210cbdfed%3A0x643e7fb584b78af2!2sDubai%20Hills%20Mall!5e0!3m2!1sen!2str!4v1711955942740!5m2!1sen!2str"
                    className="w-full h-[34rem]"
                    title="map"
                    style={{ border: 'none' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>

      <div className="booking-bg h-[60vh] max-md:h-[80vh] w-full mx-auto flex items-center justify-center bg-cover bg-fixed flex-col">
        <div className="px-20 py-6 w-full flex gap-16 md:px-10 max-md:flex-col max-md:gap-4">
          <div className="flex flex-col gap-6 w-1/2">
            <div>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <h2 className="gilda text-2xl">
              Each of our guest rooms feature a private bath, wi-fi, cable
              television and include full breakfast.
            </h2>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-white">phone_in_talk</span>
              <div className="flex flex-col ">
									<span className="text-xs tracking-widest text-white">
										For information
									</span>
                <a href="/"
                   className="tracking-wider text-white">
                  18001234567
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-rounded">done</span>
              <span>Call us, it's toll-free.</span>
            </div>
          </div>
          <div className="flex justify-start flex-col gap-4 w-1/2">
            <div className="w-[400px] bg-darkest px-8 py-12">
              <div className="mb-8">
                <p className="text-beg-color text-sm font-thin tracking-widest mb-3">
                  ROOMS & SUITES
                </p>
                <h2 className="gilda text-3xl">
                  Hotel Booking Form
                </h2>
              </div>

              <form className="flex flex-col gap-8">
                <div className="flex items-center justify-between gap-6 bg-darker px-5 py-5">
                  <label className="text-dark">Check In</label>
                  <input className="bg-transparent text-dark"
                         type="date" />
                </div>
                <div className="flex items-center justify-between gap-6 bg-darker px-5 py-5">
                  <label className="text-dark">Check Out</label>
                  <input className="bg-transparent text-dark"
                         type="date" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="px-8 py-4 bg-darker">
                    <select className=" bg-transparent">
                      <option>Adults</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                  <div className="px-8 py-4 bg-darker">
                    <select className="bg-transparent">
                      <option>Children</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
