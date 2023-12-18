import img from '../../public/assets/img.png'

function About() {
  return (
    <div
      id="about"
      className="flex flex-col midlarge:flex-row  justify-center items-center mt-28"
    >
      <img
        className="w-96 midlarge:w-auto lg:h-64"
        src={img}
      />
      <div className="lg:max-w-lg sm:max-w-md max-w-md ml-5">
        <h2 className="mt-4 text-sm font-bold text-center midlarge:text-left lg:text-sm">
          ABOUT ME
        </h2>
        <h3 className="font-semibold text-base mt-2 mb-3 lg:text-lg text-center midlarge:text-left">
          I am a front-end developer who loves to learn and improve, always
          looking for new challenges and opportunities.🚀
        </h3>
        <p className="text-center midlarge:text-left  text-sm font-medium  text-slate-600 lg:text-base">
          Hello! I&apos;m Omer, a software developer who is constantly improving
          myself in the field of front-end development. I work with technologies
          such as HTML, CSS, JavaScript, React, Bootstrap and Tailwind CSS and
          develop projects using the modern front-end framework React. Through
          personal projects and online courses I keep myself updated and
          constantly learn new skills. I love coding because it makes me happy
          to see the websites I design come to life and be used in the real
          world.
        </p>
      </div>
    </div>
  )
}

export default About
