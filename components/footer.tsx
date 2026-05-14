import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'API Docs'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Resources: [
    'Documentation',
    'Help Center',
    'Community',
    'Templates',
    'Partners',
  ],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

export function Footer() {
  return (
    <footer className="border-border/30 bg-card/20 border-t">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 pb-2">
              <Image
                src="/FlowAI.svg"
                alt="FlowAI Logo"
                width={32}
                height={32}
                className="rounded-lg"
                priority
              />

              <span className="text-foreground text-lg font-semibold">
                FlowAI
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 text-sm">
              The intelligence layer for modern workflows.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-foreground mb-4 font-medium">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border/30 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} FlowAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
