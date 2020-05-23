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
            description: 'Choose your weapon. Roll some dice for your next great adventure!',
            type: 'website',
            url: 'https://dice.criticalroyale.com',
            site_name: 'Critical Royale Dice Roller',
            images: [
              // {
              //   url: `https://dummyimage.com/800x600/${getRandomHexColor()}/fff.png&text=id8`,
              //   width: 800,
              //   height: 600,
              //   alt: 'id8 is like bingo... a riot!',
              // },
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
