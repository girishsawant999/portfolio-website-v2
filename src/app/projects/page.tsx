const Projects = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-medium text-[#181717] mb-8">
            Hello, I&apos;m Mehmet Akif.
          </h1>
          <div className="flex justify-start mt-4">
            <svg
              width={34}
              height={39}
              viewBox="0 0 34 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M19.2187 0.181824H14.4176V29.2102L3.31959 18.1122L0.0326538 21.4361L16.8182 38.2216L33.6406 21.4361L30.2798 18.1122L19.2187 29.2102V0.181824Z"
                fill="#181717"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[32px] text-[#606060]">
            A passionate senior-year design student specializing in 3D modeling
            and texturing, constantly exploring new techniques and creative
            possibilities.
          </p>
        </div>
      </section>

      {/* Project 1 */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <h2 className="text-lg font-medium text-[#181717]">
              01 / PROJECT NAME
            </h2>
            <p className="text-lg text-[#181717]">
              Goblin concept digital sculpture with human-like skin. Learned a
              lot of quick tips and look development.
            </p>
            <p className="text-sm text-[#606060]">
              Sculpted in ZBrush, Retopologized and UVs done in Maya, Textured
              in Mari, Rendered using Arnold.
            </p>
            <div className="flex-grow"></div>
            <a href="#" className="text-lg font-medium text-[#181717]">
              More shots from this project ↗
            </a>
          </div>
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] bg-[#606060]"></div>
          </div>
        </div>
        <div className="w-full border-b-[1.5px] border-[#181717] mt-6"></div>
      </section>

      {/* Project 2 */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <h2 className="text-lg font-medium text-[#181717]">
              02 / PROJECT NAME
            </h2>
            <p className="text-lg text-[#181717]">
              Subsurface weight, specular roughness, diffuse maps generated with
              the procedure and manual techniques.
            </p>
            <div className="flex-grow"></div>
            <a href="#" className="text-lg font-medium text-[#181717]">
              See case study →
            </a>
          </div>
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] bg-[#606060]"></div>
          </div>
        </div>
        <div className="w-full border-b-[1.5px] border-[#181717] mt-6"></div>
      </section>

      {/* Project 3 */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <h2 className="text-lg font-medium text-[#181717]">
              03 / PROJECT NAME
            </h2>
            <p className="text-lg text-[#181717]">
              Experimental creature modeling for school project.
            </p>
            <div className="flex-grow"></div>
            <p className="text-lg font-medium text-[#606060]">Project WIP</p>
          </div>
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/9] bg-[#606060]"></div>
          </div>
        </div>
        <div className="w-full border-b-[1.5px] border-[#181717] mt-6"></div>
      </section>
    </div>
  );
};

export default Projects;
