import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  ['home', 'Home'], ['about', 'About'], ['skills', 'Skills'],
  ['experience', 'Experience'], ['education', 'Education'],
  ['projects', 'Projects'], ['contact', 'Contact'],
]

const INTERESTS = [
  'Backend Development',
  'Building REST APIs',
  'Problem Solving',
  'Full Stack Development',
  'Learning New Technologies',
]

function ChangingInterests() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = INTERESTS[index]
    const finishedTyping = !deleting && text.length === current.length
    const delay = finishedTyping ? 1400 : deleting ? 55 : 95

    const timeout = setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true)
      } else if (deleting) {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1))
        } else {
          setDeleting(false)
          setIndex((previous) => (previous + 1) % INTERESTS.length)
        }
      } else {
        setText(current.slice(0, text.length + 1))
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [index, text, deleting])

  return (
    <span className="text-purple-400">
      {text}
      <span className="typing-cursor" aria-hidden="true">|</span>
    </span>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('sobiya-portfolio-theme') === 'light' ? 'light' : 'dark' }
    catch { return 'dark' }
  })
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    try { localStorage.setItem('sobiya-portfolio-theme', theme) } catch { /* storage may be unavailable */ }
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (showIntro) return
    const updateActive = () => {
      const ids = NAV_ITEMS.map(([id]) => id)
      const scrollBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12
      if (scrollBottom) { setActiveSection('contact'); return }
      const offset = window.scrollY + 160
      let current = 'home'
      for (const id of ids) {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= offset) current = id
      }
      setActiveSection(current)
    }
    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [showIntro])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // ==========================================
  // ANIMATED WELCOME SCREEN
  // ==========================================
  if (showIntro) {
    return (
      <main className="intro-screen min-h-screen flex flex-col items-center justify-center bg-[#080b17] text-white px-6">

        <p className="intro-fade text-purple-400 tracking-[0.3em] text-sm mb-5 text-center">
          WELCOME TO MY PORTFOLIO
        </p>

        <h1 className="intro-name text-5xl md:text-7xl font-bold text-center">
          MS. <span className="text-purple-400">SOBIYA M</span>
        </h1>

        <div className="intro-progress mt-10">
          <div className="intro-progress-fill"></div>
        </div>

        <p className="intro-fade text-xl text-slate-300 mt-8">
          Backend Developer
        </p>

      </main>
    )
  }

  // ==========================================
  // MAIN PORTFOLIO
  // ==========================================
  return (
    <main className={`portfolio-root min-h-screen overflow-x-hidden ${theme === 'light' ? 'portfolio-light' : 'portfolio-dark'}`}>

      {/* NAVIGATION */}
      <nav className="portfolio-nav sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-16 border-b backdrop-blur-xl">
        <a href="#home" className="text-2xl font-bold text-purple-400">SM.</a>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Portfolio navigation">
            {NAV_ITEMS.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? 'location' : undefined}
                className={`portfolio-nav-link rounded-lg px-2 py-2 text-xs sm:text-sm transition-colors ${activeSection === id ? 'is-active' : ''}`}
              >{label}</a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
            className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z"/></svg>
            )}
          </button>
          <a href="/Sobiya_M_Resume.pdf" download="Sobiya_M_Resume.pdf" className="cv-nav-button rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors">Download CV ↓</a>
        </div>
      </nav>

      {/* ANIMATED PURPLE NIGHT-SKY HOME */}
      <section id="home" className="hero-night relative isolate min-h-[90vh] overflow-hidden px-6 md:px-20 scroll-mt-24">
        <div className="hero-stars" aria-hidden="true" />
        <div className="hero-moon" aria-hidden="true" />
        <div className="hero-haze" aria-hidden="true" />
        <div className="hero-landscape" aria-hidden="true">
          <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" className="h-full w-full" role="presentation">
            <defs>
              <linearGradient id="farRidge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7554b6" />
                <stop offset="100%" stopColor="#302450" />
              </linearGradient>
              <linearGradient id="nearRidge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#302047" />
                <stop offset="100%" stopColor="#0a0b1c" />
              </linearGradient>
            </defs>
            <path d="M0 295 L125 205 L235 260 L390 105 L555 285 L690 175 L840 280 L1020 105 L1200 250 L1330 150 L1440 225 L1440 420 L0 420Z" fill="url(#farRidge)" opacity=".72" />
            <path d="M0 340 L165 240 L290 345 L485 195 L635 345 L800 225 L965 350 L1175 215 L1335 330 L1440 275 L1440 420 L0 420Z" fill="#211b3c" />
            <path d="M0 375 L145 320 L265 390 L430 285 L625 390 L815 315 L1015 395 L1180 285 L1355 365 L1440 340 L1440 420 L0 420Z" fill="url(#nearRidge)" />
            {Array.from({ length: 23 }, (_, i) => {
              const x = i * 67 - 15
              const h = 35 + ((i * 29) % 65)
              return <path key={i} d={`M${x} 420 v-${h} m-${h * .19} ${h * .48} l${h * .19} -${h * .58} l${h * .19} ${h * .58} m-${h * .49} ${h * .16} l${h * .3} -${h * .48} l${h * .3} ${h * .48}`} stroke="#090c1b" strokeWidth="6" fill="none" strokeLinecap="round" />
            })}
          </svg>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center gap-10 py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:pb-44">
          <div className="hero-content max-w-3xl">
            <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-purple-300">HELLO, I'M</p>
            <h1 className="mb-5 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              Sobiya <span className="text-purple-300">M</span>
            </h1>
            <h2 className="mb-4 text-2xl font-semibold md:text-4xl">I'm a <span className="text-purple-300">Backend Developer</span></h2>
            <div className="mb-7 min-h-16 text-lg text-slate-200 md:text-2xl" aria-label="My interests">
              I love <ChangingInterests />
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-200">
              I develop secure and scalable applications using Python, Flask, NestJS, TypeScript, PostgreSQL and Redis. I enjoy building reliable REST APIs and solving real-world backend engineering challenges.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#projects" className="rounded-xl bg-purple-600 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-600/30">Explore My Projects</a>
              <a href="#contact" className="rounded-xl border border-purple-300/70 px-7 py-3.5 font-semibold transition-all duration-300 hover:bg-purple-500/20">Contact Me</a>
              <a href="https://github.com/Sobiya-25" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/30 px-7 py-3.5 font-semibold transition-all duration-300 hover:border-purple-300">GitHub</a>
              <a href="/Sobiya_M_Resume.pdf" download="Sobiya_M_Resume.pdf" className="rounded-xl border border-purple-300/70 px-7 py-3.5 font-semibold transition-all duration-300 hover:bg-purple-500/20">Download CV ↓</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {['Python', 'Flask', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis'].map((skill) => (
                <span key={skill} className="rounded-full border border-purple-300/30 bg-purple-950/40 px-4 py-2 text-sm text-purple-100 backdrop-blur-sm">{skill}</span>
              ))}
            </div>
          </div>

          <div className="hero-cards relative z-10 grid w-full max-w-sm grid-cols-2 gap-4 self-center lg:w-80 lg:shrink-0" aria-label="Portfolio highlights">
            <div className="hero-float-card col-span-2 rounded-2xl border border-purple-300/30 bg-[#1c1738]/70 p-5 shadow-xl backdrop-blur-lg">
              <p className="mb-2 text-xs uppercase tracking-widest text-purple-300">Specialization</p>
              <p className="text-xl font-semibold">Backend Engineering</p>
              <p className="mt-1 text-sm text-slate-300">APIs · Auth · Real-time</p>
            </div>
            <div className="hero-float-card hero-float-delay rounded-2xl border border-purple-300/30 bg-[#1c1738]/70 p-5 shadow-xl backdrop-blur-lg">
              <p className="mb-2 text-xs uppercase tracking-widest text-purple-300">Education</p>
              <p className="text-lg font-semibold">B.E. CSE</p>
              <p className="mt-1 text-sm text-slate-300">2024</p>
            </div>
            <div className="hero-float-card hero-float-delay-2 rounded-2xl border border-purple-300/30 bg-[#1c1738]/70 p-5 shadow-xl backdrop-blur-lg">
              <p className="mb-2 text-xs uppercase tracking-widest text-purple-300">Featured Work</p>
              <p className="text-lg font-semibold">3 Projects</p>
              <p className="mt-1 text-sm text-slate-300">Including PetSewa</p>
            </div>
          </div>
        </div>
      </section>

{/* ABOUT SECTION */}
<section
  id="about"
  className="relative px-6 md:px-20 py-24 border-t border-white/10"
>
  <div className="grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT SIDE */}
    <div>
      <p className="text-purple-400 tracking-[0.25em] text-sm mb-4">
        GET TO KNOW ME
      </p>

      <h2 className="text-4xl md:text-5xl font-bold mb-8">
        About <span className="text-purple-400">Me</span>
      </h2>

      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        I'm a backend-focused developer and Computer Science
        Engineering graduate passionate about building scalable
        applications and solving real-world engineering challenges.
      </p>

      <p className="text-slate-300 text-lg leading-relaxed mb-9">
        I specialize in developing REST APIs, authentication systems,
        database-driven applications and real-time communication.
        I enjoy writing maintainable code with a focus on
        performance, reliability and security.
      </p>

      {/* INFORMATION CARDS */}
      <div className="grid sm:grid-cols-2 gap-4">

        <div className="rounded-2xl border border-purple-500/20 bg-white/5 p-5">
          <p className="text-purple-400 text-xs tracking-widest mb-3">
            FOCUS
          </p>
          <p className="text-slate-100 font-medium">
            Backend Engineering · REST APIs · Database Design
          </p>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-white/5 p-5">
          <p className="text-purple-400 text-xs tracking-widest mb-3">
            EDUCATION
          </p>
          <p className="text-slate-100 font-medium">
            B.E. CSE · VV College of Engineering · 2024
          </p>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-white/5 p-5">
          <p className="text-purple-400 text-xs tracking-widest mb-3">
            LOCATION
          </p>
          <p className="text-slate-100 font-medium">
            Tamil Nadu, India
          </p>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-white/5 p-5">
          <p className="text-purple-400 text-xs tracking-widest mb-3">
            STATUS
          </p>
          <p className="text-green-400 font-medium">
            Open to Work
          </p>
        </div>

      </div>
    </div>

    {/* RIGHT SIDE — DEVELOPER CODE WINDOW */}
    <div className="rounded-3xl overflow-hidden border border-purple-500/20 bg-[#111827] shadow-2xl shadow-purple-900/20">

      {/* WINDOW HEADER */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">

        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
        </div>

        <span className="font-mono text-sm text-slate-400">
          developer.ts
        </span>
      </div>

      {/* CODE CONTENT */}
      <pre className="p-6 md:p-8 text-xs sm:text-sm leading-7 font-mono overflow-x-auto text-slate-200">
        <code>
          <span className="text-purple-400">const</span>
          {' developer = {\n'}

          {'  name: '}
          <span className="text-green-400">'Sobiya M'</span>
          {',\n'}

          {'  role: '}
          <span className="text-green-400">'Backend Developer'</span>
          {',\n'}

          {'  education: '}
          <span className="text-green-400">'B.E. CSE'</span>
          {',\n'}

          {'  stack: [\n'}
          {'    '}
          <span className="text-green-400">'Python'</span>
          {', '}
          <span className="text-green-400">'NestJS'</span>
          {',\n    '}
          <span className="text-green-400">'TypeScript'</span>
          {', '}
          <span className="text-green-400">'PostgreSQL'</span>
          {',\n    '}
          <span className="text-green-400">'Redis'</span>
          {'\n  ],\n'}

          {'  interests: [\n'}
          {'    '}
          <span className="text-green-400">'REST APIs'</span>
          {', '}
          <span className="text-green-400">'System Design'</span>
          {'\n  ],\n'}

          {'  availableForWork: '}
          <span className="text-orange-400">true</span>
          {'\n};'}
        </code>
      </pre>
    </div>
  </div>
</section>


{/* SKILLS SECTION */}
<section
  id="skills"
  className="px-6 md:px-20 py-24 border-t border-white/10 scroll-mt-24"
>
  <div className="max-w-7xl mx-auto">

    <p className="text-purple-400 tracking-[0.25em] text-sm mb-4">
      WHAT I WORK WITH
    </p>

    <h2 className="text-4xl md:text-5xl font-bold mb-5">
      Technical <span className="text-purple-400">Skills</span>
    </h2>

    <p className="text-slate-400 max-w-2xl mb-12">
      Technologies and tools I have used to develop
      backend systems, web applications, and APIs.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {[
        {
          title: 'Programming Languages',
          icon: '💻',
          skills: ['Python', 'TypeScript', 'JavaScript', 'Java'],
        },
        {
          title: 'Backend Frameworks',
          icon: '⚙️',
          skills: ['Flask', 'NestJS', 'Django', 'Spring Boot'],
        },
        {
          title: 'Frontend Development',
          icon: '🎨',
          skills: ['React', 'HTML', 'CSS', 'Bootstrap'],
        },
        {
          title: 'Databases & Cache',
          icon: '🗄️',
          skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Cloudflare R2'],
        },
        {
          title: 'APIs & Security',
          icon: '🔐',
          skills: ['REST APIs', 'JWT', 'Swagger', 'Socket.IO'],
        },
        {
          title: 'Development Tools',
          icon: '🛠️',
          skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Jest', 'SonarQube'],
        },
      ].map((category) => (
        <article
          key={category.title}
          className="group rounded-2xl border border-purple-500/20 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-900/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{category.icon}</span>

            <h3 className="text-lg font-semibold text-white">
              {category.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-sm text-purple-200 transition-colors group-hover:border-purple-400/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </article>
      ))}

    </div>
  </div>
</section>

      {/* EXPERIENCE SECTION */}
      <section
        id="experience"
        className="relative px-6 md:px-20 py-24 border-t border-white/10 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-purple-400 tracking-[0.25em] text-sm mb-4">
            MY PROFESSIONAL JOURNEY
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Work <span className="text-purple-400">Experience</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mb-12">
            Practical backend engineering experience working on APIs,
            authentication, real-time communication, and infrastructure.
          </p>

          <div className="relative pl-8 md:pl-12 border-l-2 border-purple-500/40">
            <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-purple-400 ring-4 ring-[#080b17]" />

            <article className="rounded-3xl border border-purple-500/25 bg-white/5 p-6 md:p-9 shadow-xl shadow-purple-950/10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-purple-300 text-sm font-semibold mb-2">
                    Backend Development Internship · Remote
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Python Full Stack Intern
                  </h3>
                  <p className="text-slate-300 font-medium">
                    PAWSSEWACARE PRIVATE LIMITED (PetSewa)
                  </p>
                </div>
                <span className="self-start shrink-0 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                  Jul 2026 – Oct 2026
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed mb-6">
                Contributed to the PetSewa backend using NestJS, TypeScript,
                PostgreSQL, and Redis, focusing on core domain APIs and
                real-time infrastructure.
              </p>

              <ul className="space-y-3 text-slate-300 leading-relaxed mb-8 list-disc pl-5 marker:text-purple-400">
                <li>Developed REST APIs for core application features and domain workflows.</li>
                <li>Worked on JWT authentication, refresh tokens, and Redis-based OTP verification.</li>
                <li>Implemented Socket.IO real-time events for messaging, tracking, and notifications.</li>
                <li>Contributed to background job queues and media upload infrastructure.</li>
                <li>Worked with PostgreSQL, API testing, and Git-based collaboration.</li>
              </ul>

              <div className="flex flex-wrap gap-2 mb-7">
                {['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Socket.IO', 'JWT', 'BullMQ', 'Git'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-sm text-purple-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="https://github.com/Sobiya-25/sobiya-backend-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-purple-400 hover:text-purple-300 transition"
              >
                View Public Backend Case Study <span aria-hidden="true">→</span>
              </a>
            </article>
            <article className="relative mt-8 rounded-3xl border border-purple-500/25 bg-white/5 p-6 md:p-9">
              <span className="absolute -left-[41px] md:-left-[57px] top-9 h-4 w-4 rounded-full bg-purple-400 ring-4 ring-[#080b17]" />
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                <div>
                  <p className="text-purple-300 text-sm font-semibold mb-2">Python Development Internship</p>
                  <h3 className="text-2xl font-bold mb-2">Python Development Intern</h3>
                  <p className="text-slate-300">Codveda Technologies</p>
                </div>
                <span className="self-start rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">Aug 2025 – Sep 2025</span>
              </div>
              <ul className="list-disc pl-5 space-y-3 text-slate-300 marker:text-purple-400">
                <li>Developed Python applications and REST APIs integrated with SQL databases.</li>
                <li>Debugged, tested, and optimized application code using Git and GitHub.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* EDUCATION AND CERTIFICATIONS */}
      <section id="education" className="px-6 md:px-20 py-24 border-t border-white/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-purple-400 tracking-[0.25em] text-sm mb-4">ACADEMIC BACKGROUND</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Education &amp; <span className="text-purple-400">Certifications</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="rounded-3xl border border-purple-500/25 bg-white/5 p-7 md:p-9 hover:border-purple-400/60 transition">
              <p className="text-purple-300 text-sm tracking-widest mb-4">EDUCATION · 2024</p>
              <h3 className="text-2xl font-bold mb-3">VV College of Engineering</h3>
              <p className="text-slate-200 mb-5">Bachelor of Engineering in Computer Science and Engineering</p>
              <span className="inline-flex rounded-full bg-purple-500/10 border border-purple-500/25 px-4 py-2 text-purple-200 text-sm">CGPA: 8.07 / 10</span>
            </article>
            <article className="rounded-3xl border border-purple-500/25 bg-white/5 p-7 md:p-9 hover:border-purple-400/60 transition">
              <p className="text-purple-300 text-sm tracking-widest mb-4">COURSE CERTIFICATE</p>
              <h3 className="text-2xl font-bold mb-3">AWS Cloud Computing Fundamentals</h3>
              <p className="text-slate-200 mb-5">Udemy</p>
              <p className="text-slate-400 text-sm leading-relaxed">Cloud computing fundamentals course completion certificate. This is a Udemy certificate, not an AWS-issued certification.</p>
            </article>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="px-6 md:px-20 py-20 border-t border-white/10"
      >

        <p className="text-purple-400 text-sm tracking-widest mb-3">
          MY WORK
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Featured <span className="text-purple-400">Projects</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* PETSEWA */}
          <article className="rounded-2xl border border-purple-500/20 bg-white/5 p-6 hover:border-purple-400/60 transition-all duration-300 hover:-translate-y-1">

            <p className="text-purple-400 text-sm mb-3">
              Internship Project
            </p>

            <h3 className="text-xl font-bold mb-3">
              PetSewa Backend
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              Backend development contributions involving
              REST APIs, JWT authentication, Redis OTP,
              WebSockets and cloud media infrastructure.
            </p>

            <p className="text-xs text-purple-300">
              NestJS • TypeScript • PostgreSQL • Redis
            </p>

            <a
              href="https://github.com/Sobiya-25/sobiya-backend-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-purple-400 hover:text-purple-300"
            >
              View Public Case Study →
            </a>

          </article>

          {/* CARECONNECT */}
          <article className="rounded-2xl border border-purple-500/20 bg-white/5 p-6 hover:border-purple-400/60 transition-all duration-300 hover:-translate-y-1">

            <p className="text-purple-400 text-sm mb-3">
              Personal Project
            </p>

            <h3 className="text-xl font-bold mb-3">
              CareConnect AI
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              Hospital contact management application with
              PostgreSQL, contact directory, authentication
              and AI-assisted features.
            </p>

            <p className="text-xs text-purple-300">
              Python • Flask • PostgreSQL
            </p>

            <a
              href="https://github.com/Sobiya-25/careconnect-ai-hospital-contact-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-purple-400 hover:text-purple-300"
            >
              View GitHub Project →
            </a>

          </article>

          {/* HEALTH PREDICTION */}
          <article className="rounded-2xl border border-purple-500/20 bg-white/5 p-6 hover:border-purple-400/60 transition-all duration-300 hover:-translate-y-1">

            <p className="text-purple-400 text-sm mb-3">
              Personal Project
            </p>

            <h3 className="text-xl font-bold mb-3">
              Blood Test Insight
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              Healthcare dashboard for managing patient
              blood test records with PostgreSQL and
              Gemini AI integration.
            </p>

            <p className="text-xs text-purple-300">
              Python • Flask • PostgreSQL • Gemini AI
            </p>

            <a
              href="https://github.com/Sobiya-25/health-prediction-task2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-purple-400 hover:text-purple-300"
            >
              View GitHub Project →
            </a>

          </article>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="px-6 md:px-20 py-20 border-t border-white/10"
      >

        <p className="text-purple-400 text-sm tracking-widest mb-3">
          LET'S CONNECT
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Contact <span className="text-purple-400">Me</span>
        </h2>

        <p className="text-slate-300 mb-8 max-w-xl">
          I'm interested in backend development opportunities
          and collaborating on meaningful software projects.
        </p>

        <div className="flex flex-wrap gap-4">

          <a
            href="https://github.com/Sobiya-25"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-semibold transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/sobiya-murugesan/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-purple-400 px-6 py-3 rounded-xl font-semibold hover:bg-purple-500/10 transition"
          >
            LinkedIn
          </a>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Sobiya M. All rights reserved.
      </footer>

    </main>
  )
}

export default App
