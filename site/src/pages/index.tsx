import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import * as React from 'react';
import Logo from '../components/Logo';

import styles from './index.module.css';

const HomepageHeader = (): JSX.Element => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className='container'>
                <Logo viewBox='-110 700 2000 600' />
                <h1 className='hero__title'>{siteConfig.title}</h1>
                <p className='hero__subtitle'>
                    {/* TODO(dnguyen0304): Fix missing cohesion. */}
                    The <em>fastest</em> docs platform
                </p>
                <div className={styles.buttons}>
                    <Link
                        className='button button--secondary button--lg'
                        to='/docs/intro'>
                        Docusaurus Tutorial - 5min ⏱️
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={`${siteConfig.tagline}`}
            description={`${siteConfig.tagline}`}
        >
            <HomepageHeader />
        </Layout>
    );
};
