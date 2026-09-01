const services = [
  { number: "01", title: "ERPNext Implementation", text: "End-to-end ERPNext deployment, tailored workflows, data migration, user training, and a confident go-live." },
  { number: "02", title: "ERP Consultation", text: "Practical guidance to select, improve, or scale your ERP—grounded in your operations, not generic advice." },
  { number: "03", title: "Business Consultation", text: "Process review and strategic recommendations that connect people, systems, and performance." },
];

const steps = [
  ["Discover", "We map your business, priorities, and operational gaps."],
  ["Design", "We shape a practical solution around how your teams work."],
  ["Deliver", "We configure, validate, train, and guide your go-live."],
  ["Improve", "We support adoption and keep optimizing what matters."],
];

export default function Home() {
  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Proxima Digital home"><span className="brand-mark">P</span><span>PROXIMA <b>DIGITAL</b></span></a>
        <nav aria-label="Main navigation"><a href="#services">Services</a><a href="#approach">Approach</a><a href="#contact">Contact</a></nav>
        <a className="nav-cta" href="#contact">Start a conversation <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> ERPNext &amp; Business Consulting</p>
          <h1>Digital systems.<br/><em>Human clarity.</em></h1>
          <p className="hero-lead">We turn complex operations into connected, practical systems—helping ambitious businesses implement ERPNext and make better decisions.</p>
          <div className="hero-actions"><a className="button primary" href="#contact">Book a consultation <span>→</span></a><a className="text-link" href="#services">Explore our services <span>↓</span></a></div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-one"><i /></div><div className="orbit orbit-two"><i /></div>
          <div className="core"><span>ERP</span><small>CONNECTED</small></div>
          <p className="orbit-label label-a">PROCESS</p><p className="orbit-label label-b">PEOPLE</p><p className="orbit-label label-c">INSIGHT</p>
        </div>
        <div className="hero-footer"><span>IMPLEMENT WITH PURPOSE</span><span>OPERATE WITH CONFIDENCE</span><span>GROW WITH CLARITY</span></div>
      </section>

      <section className="intro section-wrap">
        <p className="section-kicker">WHY PROXIMA</p>
        <div><h2>Technology should make your<br/>business feel <em>simpler.</em></h2><p>Proxima Digital brings ERP expertise and business thinking together. We listen first, design around reality, and deliver solutions your people can actually use.</p></div>
      </section>

      <section className="services section-wrap" id="services">
        <div className="section-heading"><div><p className="section-kicker">WHAT WE DO</p><h2>Expertise that moves<br/>your business forward.</h2></div><p>From first assessment to continuous improvement, we stay focused on measurable value and lasting adoption.</p></div>
        <div className="service-list">
          {services.map((service) => <article key={service.number}><span className="service-number">{service.number}</span><div className="service-icon" aria-hidden="true">{service.number === "01" ? "⌘" : service.number === "02" ? "◇" : "◎"}</div><div><h3>{service.title}</h3><p>{service.text}</p></div><span className="arrow" aria-hidden="true">↗</span></article>)}
        </div>
      </section>

      <section className="approach" id="approach"><div className="section-wrap">
        <p className="section-kicker light">HOW WE WORK</p>
        <div className="approach-title"><h2>A clear path from<br/><em>complexity to control.</em></h2><p>Structured enough to be reliable. Flexible enough to fit your business.</p></div>
        <div className="steps">{steps.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>

      <section className="contact section-wrap" id="contact">
        <div className="contact-card"><p className="section-kicker light">LET’S TALK</p><h2>Ready to make your<br/>business work <em>better?</em></h2><p>Speak with Mr. Adil Usman about your ERPNext implementation, operational challenges, or next phase of growth.</p><div className="contact-actions"><a className="button light-button" href="mailto:adilgud1@gmail.com?subject=Consultation%20with%20Proxima%20Digital">Send an email <span>→</span></a><a className="phone-link" href="tel:+923132662225">Call 0313 2662225</a></div></div>
        <div className="contact-side"><span className="brand-mark large">P</span><div><p>YOUR CONSULTANT</p><h3>Mr. Adil Usman</h3><span>ERPNext &amp; Business Consultant</span><a href="tel:+923132662225">0313 2662225</a><a href="mailto:adilgud1@gmail.com">adilgud1@gmail.com</a></div></div>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">P</span><span>PROXIMA <b>DIGITAL</b></span></a><p>ERPNext implementation and business consulting.</p><p>© 2026 Proxima Digital</p></footer>
    </main>
  );
}
