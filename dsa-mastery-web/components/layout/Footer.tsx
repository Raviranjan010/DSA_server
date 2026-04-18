import Link from 'next/link';
import { Github, Book, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f1419] border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-white font-bold text-xl">DSA Mastery</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Master Data Structures and Algorithms through pattern-based learning, 
              real-world examples, and guided practice. From zero to interview-ready in 60 days.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/topics" className="text-gray-400 hover:text-white transition-colors">
                  All Topics
                </Link>
              </li>
              <li>
                <Link href="/topics/arrays" className="text-gray-400 hover:text-white transition-colors">
                  Arrays & Strings
                </Link>
              </li>
              <li>
                <Link href="/topics/linked-lists" className="text-gray-400 hover:text-white transition-colors">
                  Linked Lists
                </Link>
              </li>
              <li>
                <Link href="/topics/dynamic-programming" className="text-gray-400 hover:text-white transition-colors">
                  Dynamic Programming
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/60-day-roadmap" className="text-gray-400 hover:text-white transition-colors">
                  60-Day Roadmap
                </Link>
              </li>
              <li>
                <Link href="/patterns" className="text-gray-400 hover:text-white transition-colors">
                  Pattern Library
                </Link>
              </li>
              <li>
                <Link href="/mock-interview" className="text-gray-400 hover:text-white transition-colors">
                  Mock Interviews
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername/DSA-Mastery-Platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 DSA Mastery Platform. Built with <Heart className="w-4 h-4 inline text-red-500" /> for learners.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
