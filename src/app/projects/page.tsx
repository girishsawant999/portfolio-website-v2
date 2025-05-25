import clsx from "clsx";
import { PROJECTS } from "./constant";

const Projects = () => {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-medium text-[#181717] mb-8">
            Recent Work and Projects
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
          <p className="text-[32px] text-[#606060] body leading-9">
            From concept to execution—here’s a look at what I’ve been building
            lately. Each project reflects my focus on clean design, performance,
            and user experience.
          </p>
        </div>
      </section>

      {PROJECTS.map((project, index) => (
        <section key={project.key} className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <h2 className="text-lg font-medium text-[#181717]">
                {String(index + 1).padStart(2, "0")} / {project.title}
              </h2>
              <p className="text-lg text-[#181717]">{project.description}</p>
              {project.skills && (
                <p className="text-sm text-[#606060]">
                  {Array.isArray(project.skills) && project.skills.length > 0
                    ? project.skills.join(", ")
                    : project.skills}
                </p>
              )}
              <div className="flex-grow"></div>
              <a
                href={project.link}
                target="_blank"
                className={clsx(
                  "text-lg font-medium text-[#181717] flex items-center gap-1 relative w-fit",
                  "before:content-[''] before:rounded-md before:h-px before:bottom-0.5 before:bg-current before:transition-[width] before:ease-in  before:absolute before:left-0 before:w-0",
                  "hover:before:w-full"
                )}
              >
                Preview this project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                </svg>
              </a>
            </div>
            <div className="lg:col-span-7">
              <div className="w-full aspect-[16/9] bg-[#606060]">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={`/projects/${project.key}/image.png`}
                >
                  <source
                    src={`/projects/${project.key}/video.mov`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className="w-full border-b-[1.5px] border-[#181717] mt-6"></div>
        </section>
      ))}
    </>
  );
};

export default Projects;
