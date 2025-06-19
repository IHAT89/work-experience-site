import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Work Experience Site - Payroll Simplified</title>
        <meta name="description" content="Expert payroll solutions for your business." />
      </Head>

      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Payroll, Simplified.</h1>
          <p className="hero-subtitle">
            Focus on growing your business. Let us handle the complexities of payroll with our expert, reliable services.
          </p>
          <Link href="/services" className="hero-cta-button">
            Explore Our Service
          </Link>
        </div>
        <div className="hero-image">
          <Image
            src="/HoneyBeeKissingHeart.jpg"
            alt="Illustration of a honeybee kissing a heart, symbolizing care and dedication."
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </>
  );
}