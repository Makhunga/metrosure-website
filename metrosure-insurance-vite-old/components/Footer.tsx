import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 py-16 text-white border-t border-white/10 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">shield_lock</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Metrosure</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Securing futures with a modern, human-first approach to insurance. We combine technology with empathy to deliver the best protection for what matters most.
            </p>
            <div className="flex gap-4 mt-2">
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#">
                <img alt="X Social" className="w-4 h-4 filter invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUC6qUkYNrCirjXQQbjC4Nm3IujPbtWGsNNyj5gWJXM4-7dYfEf5Ecnzqd3cNOMXmp0dGBJgOzJnWHyBKh2T_uDXubzYrUWdaQWH9kcn-BwQhNEdguJgd3tMb0IjiCi5v6Leqt7YhcEPyZP7tFpmoXtrAq-WV075ohAQZXlRUXbiS-w0aZ-y2_ZLqYMvH9wY2DMc3vIJldD3S67I2e7izpMJIks_nWfe733Tjcxai8w5s5iYmNAoSEDc07wa0biEzXyumGFLK7U5Zl" />
              </a>
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#">
                <img alt="LinkedIn" className="w-4 h-4 filter invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5HgrpsyJlo08D5v5Dhud2ozyzR4urur0sMN4lu48JxyU_6U8Ddrsnmb6YyFTi6zZM9ItsJMCmTkHjy7HpDn5j7IW_W9uKIkXY3bLqD5i8nrLdS7i_4ROPhGdTQQezxH5sgAAu7MEM9sGe_FrOA6EwDGhteLm7nAVjaxXijdAcL170-w1tpkKCtDFexjNHj5mKn0hq6eoL2fpKan7M7BoumeD9x8iHDWotiRO2MkENug7Zm2PRmPH4x_HTILE9S37a6cXekKQwLsya" />
              </a>
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#">
                <img alt="Instagram" className="w-4 h-4 filter invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbgx0wEHgCrqy8lKF1fOEVfaMuzbvNggJ5D2Fohp844EYL5X7V1xVqfomtIDoXZtC7WbDKRvxxj1bcu_MZlfwBx5LmLkZCurQc0cNeY0MSIDvsB3YnWCn84PInkKWoCKXvy349cuQakO6SmyZjsngCgOBxw_cowMmBm7Q8WbIwLNtLIZdNUfkgt74dJlVIIdGnUEgDgVjzpgqsCUziQfTp4MVQTHp-FpZEQkIsYO1nYrMOFKWAyeTq2qQULNSuFhzvcehLaw00fadR" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white">Insurance</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a className="hover:text-primary transition-colors" href="#">Home & Property</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Auto & Vehicle</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Life & Health</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Business</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">File a Claim</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Policy Management</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Legal</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Metrosure Insurance. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;