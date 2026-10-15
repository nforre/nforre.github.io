export interface EducationItem {
  id: string;
  institution: string;
  period: string;
  description: string;
  isWide?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  link?: {
    label: string;
    url: string;
  };
  isUpcoming?: boolean;
}

export const portfolioData = {
  name: "Journey Forrest",
  role: "Computer Science student at Texas State University",
  status: "Currently looking for internship opportunities :)",
  email: "journforr3@gmail.com",
  links: {
    github: "https://github.com/nforre",
    linkedin: "https://www.linkedin.com/in/journey-forrest-1b4225169",
  },
  education: [
    {
      id: "txst",
      institution: "Texas State University",
      period: "Aug 2025 to present",
      description: "B.S. in Computer Science. Minors in Business Administration and Applied Mathematics. 3.6 GPA.",
      isWide: true,
    },
    {
      id: "tcc",
      institution: "Tarrant County College",
      period: "Aug 2024 to May 2025",
      description: "Coursework toward a B.S. in Computer Science.",
    },
    {
      id: "uh",
      institution: "University of Houston",
      period: "Aug 2023 to May 2024",
      description: "Coursework toward a B.S. in Computer Science, then transferred to Texas State.",
    },
  ] as EducationItem[],
  certifications: [
    "IT Programming 1 Certificate, Tarrant County College (May 2025)",
    "TABC Certification",
    "Food Handlers Certification",
  ],
  skills: [
    {
      title: "Programming",
      skills: ["C++", "Java", "Python", "HTML", "AI development"],
    },
    {
      title: "Creative",
      skills: ["Adobe After Effects", "Video editing", "Graphic design", "Game development"],
    },
    {
      title: "Other",
      skills: ["Microsoft Excel", "Technical theatre (sound and lights)", "Spanish"],
    },
  ] as SkillCategory[],
  experiences: [
    {
      id: "chills",
      role: "Front of House",
      company: "Chills on the Creek",
      period: "Aug 2025 to present",
      description: "Customer service and daily front-of-house operations.",
    },
    {
      id: "sicilian",
      role: "Barista",
      company: "The Sicilian Butcher",
      period: "Jul 2024 to Aug 2025",
      description: "Made drinks, ran the register and kept service moving in a fast-paced setting.",
    },
    {
      id: "mooyah",
      role: "Team Member",
      company: "Mooyah Burgers and Shakes",
      period: "Aug 2022 to Aug 2023",
      description: "Register, food prep, and opening and closing procedures.",
    },
    {
      id: "hawaiian",
      role: "Crew Member",
      company: "Hawaiian Bros Island Grill",
      period: "Aug 2021 to May 2022",
      description: "Dining room, order-taking, drive-thru and food prep.",
    },
  ] as ExperienceItem[],
  projects: [
    {
      id: "cs3354",
      title: "CS 3354 Object-Oriented Programming",
      description: "Coursework from my fall 2026 OOP class, covering design and implementation of object-oriented programs.",
      tags: ["OOP", "Coursework"],
      link: {
        label: "View code",
        url: "https://github.com/nforre/CS_3354_OOP",
      },
    },
    {
      id: "next-up",
      title: "Next up",
      description: "Mini projects are on the way. A small game, an animation reel and a tool I use myself are the first three.",
      isUpcoming: true,
    },
  ] as ProjectItem[],
};
