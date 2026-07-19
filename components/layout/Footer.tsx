import Link from "next/link";

const links = {
  Platform: [
    { label: "The Collection", href: "#templates" },
    { label: "Capabilities", href: "#features" },
    { label: "Investment", href: "#pricing" },
    { label: "Inquiries", href: "#faq" },
  ],
  Studio: [
    { label: "Our Ethos", href: "#" },
    { label: "Journal", href: "#" },
    { label: "Privacy Core", href: "#" },
    { label: "Terms", href: "#" },
  ],
  Connect: [
    { label: "studio@mohotha.lk", href: "mailto:studio@mohotha.lk" },
    { label: "WhatsApp Desk", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <div className="py-20 grid grid-cols-2 gap-12 lg:grid-cols-4 border-t border-[#111111]">
          
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="heading-font text-2xl tracking-[0.2em] text-white hover:text-[#CBA365] transition-colors"
            >
              MOHOTHA
            </Link>
            <p className="mt-6 text-xs leading-relaxed text-[#5c5c5c] max-w-xs uppercase tracking-widest">
              Digital Event Curation
              <br />
              Colombo, Sri Lanka
            </p>
          </div>
          
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="mb-8 text-[10px] font-medium uppercase tracking-[0.3em] text-[#CBA365]">
                {cat}
              </h4>
              <ul className="space-y-4">
                {items.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#a3a3a3] hover:text-white transition-colors font-light tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
        </div>
        
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#111111] py-8 sm:flex-row">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c5c5c]">
            © {new Date().getFullYear()} Mohotha Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#CBA365]" />
             <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c5c5c]">
               Engineered in Sri Lanka
             </p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
