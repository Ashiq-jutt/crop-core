const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export type PolicyDoc = { title: string; sections: { heading: string; body: string }[] };

export type PolicyId = 'privacy' | 'terms' | 'about';

export const policies: Record<PolicyId, PolicyDoc> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { heading: '1. Types of Data We Collect', body: LOREM },
      { heading: '2. Use of Your Personal Data', body: LOREM },
      { heading: '3. Disclosure of Your Personal Data', body: LOREM },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [{ heading: '1. Terms and Condtion', body: LOREM }],
  },
  about: {
    title: 'About App',
    sections: [{ heading: '1. Our Vision & Mission', body: LOREM }],
  },
};
