import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>$ Work Experience | Payroll & HR Services Singapore</title>
        <meta name="description" content="Simple, reliable payroll and HR services for Singapore SMEs. Focus on your business—we handle the rest." />
        <meta property="og:title" content="$ Work Experience | Payroll & HR Services Singapore" />
        <meta property="og:description" content="Simple, reliable payroll and HR services for Singapore SMEs. Focus on your business—we handle the rest." />
      </Head>
      
      <main>
          <img
            src="/HoneyBeeKissingHeart.jpg"
            alt="Bee preview"
            style={{ width: 192, height: 192 }}
          />

        <section className="hero">
          
          {/* Illustration at the top of the hero */}
          {/*<Image
            src="/images/hero-illustration.png"
            alt="Illustration"
            width={600}
            height={400}
            priority
            className="hero-image"
          />*/}

          <h1 className="hero-title">Payroll Made Simple</h1>
          {/* <h1 className="hero-title">Payroll Made <span style={{color:'#007aff'}}>Simple</span></h1> */}
          <p>
            We handle the complexity so you do not have to. Professional payroll services that give you time back to focus on what matters most—growing your business.
          </p>
          <div className="hero-emoji-transition">
            <div className="emoji-box">😰</div>
            <div className="arrow">↓</div>
            <div className="emoji-box">😌</div>
          </div>
          <Link href="/contact" className="hero-cta">Get Your Free Quote</Link>  
        </section>
      </main>
    </>
  );
}