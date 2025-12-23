import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden bg-surface-card transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-60 animate-grid-flow"></div>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        <div className="flex-1 flex flex-col gap-8 text-left">
          <div className="inline-flex items-center gap-3 py-1.5 px-4 rounded-full bg-surface border border-border-light w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-text-body">Future Proof Insurance</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-text-main">
            Your Future, <br />
            <span className="text-primary">Secured Today.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-text-body max-w-lg leading-relaxed text-balance">
            Insurance designed for the complexities of modern life. Experience peace of mind with security that adapts to you, not just a static policy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="h-14 px-8 rounded-lg bg-primary text-white text-base font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/25">
              Start Your Quote
            </button>
            <button className="h-14 px-8 rounded-lg border border-border-light bg-surface-card text-text-main text-base font-bold hover:bg-surface transition-colors flex items-center gap-2 group">
              <span>Explore Plans</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
          
          <div className="flex items-center gap-6 pt-8 border-t border-border-light mt-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-surface-card bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnRFODdgwz529-yw_iIp2NMv3-dLFvcblN6GUaZmaHhGhT8Lh4qkYodgdyf2_pwRiP2SKwrKULddB_bRX_gEzUE70G07kZO0m_nv4NrDaVPei4dupbfno--o9Cn_52WcXhu8mSZsjVycRvnc6sk5GJhI9AzX2Vd89--c87rdi-1pfAWmtr5tWIOqI_PEdYBvmBYoxc6io3xYcMHg_N2sB_vEY8h-oxBa0v5WM1AxYciiJdL5AEZDUCDfgKTtpQjkMnUzgS3N99tNTi')" }}></div>
              <div className="w-10 h-10 rounded-full border-2 border-surface-card bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfQc3899qIXjGMgpXdryWEiNDnrdJEgF154tbuDtCgjH07JHHf4WmVJJu8tG55YeB95bwKJTxadHmVygzpesDn8w7ORnUoXPfw8oRZdIoBhX0-HlhbraqLLBJn_Vp3aYpxm-bD43WdoKZK21UHn2btEvyM5UMUP8z2RCEm_EU2PYFrgDj4Rab3Wy03VJPuwcX7NMcbA8TUxLYNLCUXCBtqcnjqSTEE9bkzDxvKguz5yJSr8POixoODnX2-oupy4JXbAWCc2PxUAfTc')" }}></div>
              <div className="w-10 h-10 rounded-full border-2 border-surface-card bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrULFoY2k-uQkrJ6NgmPXTsvLUSGDFHFQAhcTHBYjHPnMBPJtFkS-I5liqZGyBqmjSh3dp3fDtn5pAiPrClLjDB4uJTbkIS73M1EtramP9t15Q1-QRkS8tcXKM7IyW6HdVjDaGL5KPstOZ3cRJmOBHwbGDYY0eMFK4lX-NmrW3Ym57U5qrDrF1lWg9AjROHcRcfZjSq3V6qArqAAK3hun2dsbld5xV8q9Ut-CBbaSNX4LYJVuy_AqgbIknqUMl_xQnuE821HqTOe6V')" }}></div>
              <div className="w-10 h-10 rounded-full border-2 border-surface-card bg-primary flex items-center justify-center text-xs font-bold text-white">+2k</div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
              </div>
              <span className="text-sm font-medium text-text-body">Trusted by 2,000+ families</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="relative rounded-2xl overflow-hidden border border-border-light shadow-2xl bg-surface-card aspect-[4/3] lg:aspect-square">
            <img alt="Happy family" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACFs_HSAukjBqQqBXBmE56xq5M43xO8Qv4SyJPIMe_ZlYPb2HFGp_WxmgkCp2d1iHHWp6DBfkwCov5ag036hn9L_oOFFUmbcGt7Uktgdt4yfSN-7By4LqrT39u9Mtj7znJJY5NQgBHpAPI0ThNH6kk3NnoUijWl51znNt1qRcr5uzzb6CzIOt1g7l4bmXZgqmsq86soow7FTLk7GQfANNRsURrpAu_N9VaB1OLtdj_58ySzZSCVznLmbauMnUjDSfgtQ1kPaHjYGoN" />
            
            <div className="absolute top-8 left-8 bg-surface-card p-4 rounded-xl border border-border-light shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Status</p>
                  <p className="text-sm font-bold text-text-main">Policy Active</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8 bg-surface-card p-5 rounded-xl border border-border-light shadow-xl max-w-[200px]">
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs text-text-muted font-bold uppercase">Savings</p>
                <span className="text-green-600 text-xs font-bold">+12%</span>
              </div>
              <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-primary w-3/4 rounded-full"></div>
              </div>
              <p className="mt-2 text-lg font-bold text-text-main">$1,240/yr</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;