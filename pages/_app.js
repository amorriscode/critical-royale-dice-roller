import React from 'react';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';

import '../styles/main.css';

class CriticalRoyaleApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <DefaultSeo
          openGraph={{
            title: 'Critical Royale Dice Roller',
            description: 'Choose your weapon. Roll some dice on your next adventure!',
            type: 'website',
            url: 'https://roll.criticalroyale.com',
            site_name: 'Critical Royale Dice Roller',
            images: [
              {
                url: `https://roll.criticalroyale.com/og.png`,
                width: 800,
                height: 600,
                alt: 'Only the dice can decide your fate!',
              },
            ],
          }}
          twitter={{
            handle: '@criticalroyale',
            site: '@criticalroyale',
            cardType: 'summary_large_image',
          }}
        />

        <Component {...pageProps} />
      </>
    );
  }
}

export default CriticalRoyaleApp;
