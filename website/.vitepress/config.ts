import { getTemplate } from './utils/sidebar';

const templateSidebar = getTemplate();

export default {
  lang: 'en-US',
  title: 'Poster Friendly',
  description:
    'A complete solution for GitHub (Gitee) Issue and Discussion templates.',

  lastUpdated: true,
  cleanUrls: 'with-subfolders',

  cacheDir: '../.cache',

  themeConfig: {
    nav: [{ text: 'Guide', link: '/guide' }, ...(templateSidebar || [])],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/stevending1st/poster-friendly',
      },
    ],

    sidebar: {
      '/template/': templateSidebar,
    },
  },
};
