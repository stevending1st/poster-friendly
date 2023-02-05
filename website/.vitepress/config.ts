import { getTemplate } from './utils/sidebar';

const templateSidebar = getTemplate();

export default {
  lang: 'en-US',
  title: 'Poster Friendly',
  description:
    'A complete solution for GitHub (Gitee) Issue and Discussion templates.',

  base: '/poster-friendly/',

  lastUpdated: true,
  cleanUrls: 'with-subfolders',

  cacheDir: '../.cache',

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      ...(templateSidebar || []),
      {
        text: 'About',
        items: [
          {
            text: 'Contributing',
            link: 'https://github.com/stevending1st/poster-friendly/blob/main/CONTRIBUTING.md',
          },
          {
            text: 'Code of conduct',
            link: 'https://github.com/stevending1st/poster-friendly/blob/main/CODE_OF_CONDUCT.md',
          },
          {
            text: 'License',
            link: 'https://github.com/stevending1st/poster-friendly/blob/main/LICENSE',
          },
          {
            text: 'Security policy',
            link: 'https://github.com/stevending1st/poster-friendly/blob/main/SECURITY.md',
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/stevending1st/poster-friendly',
      },
      {
        icon: {
          svg: '<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>',
        },
        link: 'https://gitee.com/stevending1st/poster-friendly',
      },
    ],

    sidebar: {
      '/template/': templateSidebar,
    },
  },
};
