# Modern Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. This project showcases professional skills, projects, and provides a way for potential clients or employers to get in touch.

## 🚀 Features

- ⚡ **Blazing Fast** - Built with Vite for optimal performance
- 🎨 **Modern UI** - Clean, responsive design with dark/light mode
- ✨ **Animations** - Smooth animations using Framer Motion
- 📱 **Fully Responsive** - Works on all device sizes
- 🔍 **SEO Optimized** - Built with search engine visibility in mind
- 🛠 **Developer Experience** - TypeScript, ESLint, and Prettier configured
- 🎨 **Theming** - Dark/Light mode with system preference detection
- 📝 **Contact Form** - Functional contact form with reCAPTCHA protection
- 📄 **Resume Download** - One-click download of professional resume/CV

## 🛠 Tech Stack

### Core
- [React 18](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React Router](https://reactrouter.com/) - Client-side routing

### Styling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons

### Form Handling
- [React Hook Form](https://react-hook-form.com/) - Performant, flexible forms
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [React Hot Toast](https://react-hot-toast.com/) - Beautiful notifications
- [React Google reCAPTCHA](https://www.npmjs.com/package/react-google-recaptcha) - Form spam protection

### Data Fetching
- [TanStack Query](https://tanstack.com/query) - Server state management

## 📦 Prerequisites

- Node.js 18+ and npm 9+
- Git for version control

## 🚀 Getting Started

### Prerequisites

- Place your resume PDF file named `abhishekresume.pdf` in the `public` folder for the download functionality to work.
- Ensure all environment variables are properly set up (see [Environment Setup](#-environment-setup)).

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   VITE_API_BASE_URL=your_api_base_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🏗 Building for Production

1. **Create a production build**
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   # or
   yarn preview
   # or
   pnpm preview
   ```

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
# or
pnpm test
```

## 🧱 Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   └── sections/    # Page sections
├── config/          # Application configuration
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and libraries
├── pages/           # Page components
├── styles/          # Global styles and CSS variables
└── types/           # TypeScript type definitions
```

## 🎨 Customization

### Theme

Theming is controlled through Tailwind CSS and CSS variables. You can customize the color scheme by modifying:

- `tailwind.config.ts` - For Tailwind configuration
- `src/styles/globals.css` - For CSS variables and global styles

### Adding Assets

#### Resume/CV
To update the downloadable resume:
1. Replace the file `public/abhishekresume.pdf` with your latest resume
2. Ensure the file is optimized for web (recommended size < 2MB)
3. The download button will automatically link to this file

### Adding New Pages

1. Create a new file in the `src/pages` directory
2. Add a new route in `src/App.tsx`
3. If needed, add the page to the navigation component

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tool
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for the smooth animations
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a0b0d0c2-9933-425a-9aea-c5ad56ad02b2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
