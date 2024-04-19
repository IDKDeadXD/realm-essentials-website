import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
const supabase = createClient("https://gjqsznhwkjsanuvlryxe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcXN6bmh3a2pzYW51dmxyeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1MjUwNjUsImV4cCI6MjAyODEwMTA2NX0.v4z-KTl5mK7jAWcZveJ-_WzKN5FT6FpeCW7KszDHUbc");

function HomepageHeader() {

  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docs
          </Link>
        </div>
      </div>

    </header>
  );
}

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [downloadLinks, setDownloadLinks] = useState({});

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("DownloadMetadata").select();
    let i = -1;
    console.log(data)
    for (const link of data) {
      i++;
      // let publicURL = await supabase.storage.from("Downloads").getPublicUrl(`Downloads/${link.id}`).data.publicUrl
      console.log(link.id)
      let downloadData = await supabase.storage.from("Downloads").download(`Downloads/${link.id}.mcaddon`)
      data[i].downloadData = downloadData.data;
    }
    setCountries(data);
  }

  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
 
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
      </main>
      <hr style={{
        opacity: "0"
      }}></hr>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "10px"
      }}>
        <div style={{
          width: '90%',
          display: 'flex',
          gap: '10px',
          margin: '10px'
        }} className='mobile-card-list'>
          <div className="card feature-card">
    <div className="card__body">
      <h4>Custom Commands</h4>
      <small>
       
        there is alot of custom commands in this add-on, so i recommend you take a look at out docs!
      </small>
    </div>
    <div className="card__footer">
    <a href="./docs/custom_commands">
      <button className="button button--primary button--block">View Documentation</button>
      </a>
    </div>
  </div>
  <div className="card feature-card">
    <div className="card__body">
      <h4>Wanted System</h4>
      <small>
       Our add-on has a custom wanted System, there is alot of customization to it!
      </small>
    </div>
    <div className="card__footer">
      <a href="./docs/">
      <button className="button button--primary button--block">View Documentation</button>
      </a>
    </div>
  </div>

  </div>
       

        <h6 style={{
          "opacity": "0.5"
        }}></h6>
      </div>
    </Layout>
  );
}
