import "./About.css"

import {facilities, testimonials} from "../Constant/facilities";

function Star() {
  return (
    <span className={`material-symbols-rounded star text-amber-400`}>
			star
		</span>
  )
}

export default function About() {
  return (
    <section className="w-full">
      <div className="about-bg h-[50vh] w-full mx-auto flex items-center justify-center bg-cover bg-fixed flex-col">
        <div className="w-1/2 z-10">
          <p className="uppercase">Luxury Hotel</p>
          <h1 className="text-5xl font-medium gilda">About Us</h1>
        </div>
      </div>

      <div className="bg-darker py-24">
        <div className="px-20 md:px-10 w-full">
          <div className="flex flex-col items-center md:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <div>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <p className="text-beg-color uppercase tracking-widest">
                The Hilton Luxury Hotel
              </p>
              <h2 className="gilda text-4xl">
                Enjoy a Luxury Experience
              </h2>
              <p className="text-sm font-thin text-dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
              </p>
            </div>
            <div className="w-full md:w-1/2 flex gap-8">
              <div className="mt-16">
                <img src="../../assets/1.jpg"
                     className=""
                     alt="" />
              </div>
              <div className="">
                <img src="../../assets/2.jpg"
                     alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-darkest py-24">
        <div className="px-20 md:px-10 w-full">
          <div className="flex gap-4 flex-row max-md:flex-col max-md:gap-8">
            <div className="basis-1/3">
              <p className="text-beg-color uppercase tracking-widest font-thin text-sm mb-3">
                Best Practice
              </p>
              <h2 className="gilda text-3xl mb-5">
                Extra Services
              </h2>
              <p className="font-thin text-dark text-sm mb-6">
                The best prices for your relaxing vacation. The utanislen quam
                nestibulum ac quame odion elementum sceisue the aucan.
                <br /> <br />
                Orci varius natoque penatibus et magnis disney parturient monte
                nascete ridiculus mus nellen etesque habitant morbine.
              </p>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-beg-color">phone_in_talk</span>
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
            </div>
            <div className="basis-2/3 flex flex-col gap-4">
              <div className="flex flex-row bg-darker justify-between overflow-hidden">
                <div className="w-1/2">
                  <img src="8.jpg"
                       alt=""
                       className="w-full"
                  />
                </div>
                <div className="w-1/2 px-5 py-1 flex flex-col justify-center">
                  <p className="gilda text-xl">
                    Safe & Secure
                  </p>
                  <p className="gilda text-beg-color text-2xl">
                    $15 <span className="font-thin text-dark text-sm barlow">/daily</span>
                  </p>
                  <ul>
                    <li className="flex items-center gap-2 font-thin text-xs">
                      <span className="material-symbols-rounded text-sm text-beg-color">done</span>
                      Hotel ut nisan the duru
                    </li>
                    <li className="flex items-center gap-2 font-thin text-xs">
                      <span className="material-symbols-rounded text-sm text-beg-color">done</span>
                      Orci miss natoque vasa ince
                    </li>
                    <li className="flex items-center gap-2 font-thin text-xs">
                      <span className="material-symbols-rounded text-sm text-dark">close</span>
                      Clean sorem ipsum morbin
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-row bg-darker justify-between overflow-hidden">
                <div className="w-1/2">
                  <img src="8.jpg"
                       alt=""
                       className="w-full"
                  />
                </div>
                <div className="w-1/2 px-5 py-1 flex flex-col justify-center">
                  <p className="gilda text-xl">
                    Safe & Secure
                  </p>
                  <p className="gilda text-beg-color text-2xl">
                    $15 <span className="font-thin text-dark text-sm barlow">/daily</span>
                  </p>
                  <ul>
                    <li className="flex items-center gap-2 font-thin text-xs">
                      <span className="material-symbols-rounded text-sm text-beg-color">done</span>
                      Hotel ut nisan the duru
                    </li>
                    <li className="flex items-center gap-2 font-thin text-xs">
                      <span className="material-symbols-rounded text-sm text-beg-color">done</span>
                      Orci miss natoque vasa ince
                    </li>
                    <li className="flex items-center gap-2 font-thin text-xs">
                      <span className="material-symbols-rounded text-sm text-dark">close</span>
                      Clean sorem ipsum morbin
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-darker py-24">
        <div className="px-20 md:px-10 w-full">
          <p className="text-beg-color uppercase tracking-widest font-thin text-sm mb-3">
            Our Services
          </p>
          <h2 className="gilda text-3xl mb-5">
            Hotel Facilities
          </h2>
          <div className="grid sm:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {facilities.map(facility => (
              <div key={facility.title}
                   className="border-2 rounded-md border-opacity-5 border-gray-500 px-4 py-4">
                <img src={facility.img}
                     alt={facility.title}
                     className="w-8 mb-4"
                />
                <h2 className="gilda mb-4 text-xl">
                  {facility.title}
                </h2>
                <p className="text-sm text-dark">
                  {facility.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="bg-darkest py-24">
        <div className="px-20 md:px-10 w-full">
          <p className="text-beg-color uppercase tracking-widest font-thin text-sm mb-3">
            Professionals
          </p>
          <h2 className="gilda text-3xl mb-5">
            Meet The Team
          </h2>
          <div className="flex mx-auto gap-14 w-[600px] overflow-hidden">
            <div className="overflow-hidden rounded-md teamImg">
              <div>
                <img src="husam.jpg"
                     alt="" />
              </div>
              <div className="text-center bg-[#2b2b2b] py-5 relative teamImg transition-transform">
                <p className="gilda text-xl tracking-wider mb-2">
                  Hüsam
                </p>
                <p className="text-dark tracking-widest">
                  Full-Stack Developer
                </p>

                <div className="flex justify-center gap-2 flex-col bg-[#2b2b2b] absolute transition-transform duration-500 teamSocialMedia w-full py-4">
                  <div className="flex flex-row justify-center gap-3">
                    <a href="https://twitter.com/husamahmud"
                       className="hover:scale-110 transition-transform">
                      <img src="twitter.svg"
                           alt="twitter"
                           className="w-8"
                      />
                    </a>
                    <a href="https://www.linkedin.com/in/husamahmud/"
                       className="hover:scale-110 transition-transform">
                      <img src="linkedin.svg"
                           alt="linkedin"
                           className="w-8"
                      />
                    </a>
                  </div>
                  <p className="text-sm text-dark font-light">
                    devhusam@outlook.com
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-md teamImg">
              <div>
                <img src="husam.jpg"
                     alt="" />
              </div>
              <div className="text-center bg-[#2b2b2b] py-5 relative teamImg transition-transform">
                <p className="gilda text-xl tracking-wider mb-2">
                  Kholoud
                </p>
                <p className="text-dark tracking-widest">
                  Full-Stack Developer
                </p>

                <div className="flex justify-center gap-2 flex-col bg-[#2b2b2b] absolute transition-transform duration-500 teamSocialMedia w-full py-4">
                  <div className="flex flex-row justify-center gap-3">
                    <a href="https://twitter.com/husamahmud"
                       className="hover:scale-110 transition-transform">
                      <img src="twitter.svg"
                           alt="twitter"
                           className="w-8"
                      />
                    </a>
                    <a href="https://www.linkedin.com/in/husamahmud/"
                       className="hover:scale-110 transition-transform">
                      <img src="linkedin.svg"
                           alt="linkedin"
                           className="w-8"
                      />
                    </a>
                  </div>
                  <p className="text-sm text-dark font-light">
                    kfattem@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-darker">
        <div className="testimonials-bg h-[50vh] to-white w-full mx-auto flex items-center justify-center bg-cover bg-fixed flex-col">
          <div className="z-10 mb-5">
            <p className="text-dark font-thin tracking-widest">
              Testimonial
            </p>
            <h2 className="gilda text-3xl">
              What Client's Say?
            </h2>
            <hr className="w-1/2" />
          </div>
          <div className="z-10 w-4/6 flex gap-8">
            {testimonials.map(testimonial => (
              <div>
                <p className="text-xs font-thin leading-5 mb-6">
                  {testimonial.review}
                </p>
                <div className="flex gap-4 items-center">
                  <div className="overflow-hidden">
                    <img src={testimonial.img}
                         className="w-12 aspect-square rounded-full"
                         alt={testimonial.img} />
                  </div>
                  <div>
                    <div>
                      {Array.from({length: testimonial.rate}, (_, i) => (
                        <span key={testimonial.name}
                              className={`material-symbols-rounded star text-amber-300 text-sm`}>star</span>
                      ))}
                    </div>
                    <div>
                      <p className="font-thin text-sm leading-3 tracking-widest">{testimonial.name}</p>
                      <span className="font-thin text-xs tracking-widest">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
