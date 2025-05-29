import React from 'react'

export const Footer = () => {
  return (
    <footer className="relative z-10 bg-black/60 backdrop-blur-sm py-12 px-8">
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">
                <span className="editable-text">Terra</span>
                <span className="text-primary">
                    <span className="editable-text">Registry</span>
                </span>
                </h3>
                <p className="text-white/60">
                <span className="editable-text">Securing property rights through blockchain technology</span>
                </p>
            </div>

            <div className="flex flex-col w-full sm:max-w-md md:flex-row gap-8 md:gap-16">
                <div>
                <h4 className="text-white font-medium mb-4">
                    <span className="editable-text">Platform</span>
                </h4>
                <ul className="space-y-2 text-white/70">
                    <li><span className="editable-text">Features</span></li>
                    <li><span className="editable-text">Security</span></li>
                    <li><span className="editable-text">Pricing</span></li>
                    <li><span className="editable-text">FAQ</span></li>
                </ul>
                </div>

                <div>
                <h4 className="text-white font-medium mb-4">
                    <span className="editable-text">Company</span>
                </h4>
                <ul className="space-y-2 text-white/70">
                    <li><span className="editable-text">About Us</span></li>
                    <li><span className="editable-text">Blog</span></li>
                    <li><span className="editable-text">Careers</span></li>
                    <li><span className="editable-text">Contact</span></li>
                </ul>
                </div>

                <div>
                <h4 className="text-white font-medium mb-4">
                    <span className="editable-text">Legal</span>
                </h4>
                <ul className="space-y-2 text-white/70">
                    <li><span className="editable-text">Privacy Policy</span></li>
                    <li><span className="editable-text">Terms of Service</span></li>
                    <li><span className="editable-text">Cookie Policy</span></li>
                </ul>
                </div>
            </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50">
            <span className="editable-text">&copy; </span>{new Date().getFullYear()}
            <span className="editable-text"> Terra Registry. All rights reserved.</span>
            </div>
        </div>
    </footer>
  )
}
