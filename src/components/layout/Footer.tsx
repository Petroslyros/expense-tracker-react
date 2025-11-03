// src/components/Footer.tsx
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/Petroslyros",
            icon: Github,
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/petros-lyros-5285a4279/",
            icon: Linkedin,
        },
        {
            name: "Email",
            url: "mailto:petrosluros@gmail.com",
            icon: Mail,
        },
    ];

    return (
        <footer className="bg-[#222831] text-gray-200 border-t border-gray-700">
            <div className="container mx-auto px-6 py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="text-center md:text-left">
                        <h3 className="text-white font-semibold text-lg mb-2">
                            Expense Tracker
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Manage your finances with ease
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                        <div className="flex flex-col gap-2 text-sm">
                            <a
                                href="https://github.com/Petroslyros/ExpensesTrackerApp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition duration-200"
                            >
                                Backend Repo
                            </a>
                            <a
                                href="https://github.com/Petroslyros/expense-tracker-react"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition duration-200"
                            >
                                Frontend Repo
                            </a>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="text-center md:text-right">
                        <h4 className="text-white font-semibold mb-3">Connect</h4>
                        <div className="flex gap-4 justify-center md:justify-end">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition duration-200 hover:scale-110 transform"
                                        aria-label={link.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 pt-6">
                    {/* Bottom Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <div>
                            © {currentYear}{" "}
                            <span className="font-medium text-white">
                                Petros Lyros
                            </span>
                            . All Rights Reserved.
                        </div>
                        <div className="text-xs text-gray-500">
                            Built with React • TypeScript • ASP.NET Core
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;