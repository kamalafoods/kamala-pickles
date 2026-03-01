import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-royal-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-gold-gradient font-heading text-2xl font-bold mb-4">
              Kamala Pickle
            </h3>
            <p className="text-primary-foreground/70 font-body text-sm leading-relaxed">
              Handcrafted with love, tradition, and the finest spices from the heart of Andhra Pradesh.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-gold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "Products", "About Us"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-primary-foreground/60 hover:text-gold transition-colors text-sm font-body"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-gold">Policies</h4>
            <div className="flex flex-col gap-2">
              {["Shipping", "Returns", "Privacy Policy"].map((item) => (
                <span
                  key={item}
                  className="text-primary-foreground/60 text-sm font-body cursor-pointer hover:text-gold transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-gold">Contact</h4>
            <div className="flex flex-col gap-2 text-primary-foreground/60 text-sm font-body">
              <span>hello@royalpickle.com</span>
              <span>+91 7251073544</span>
              <span>Hyderabad, Telangana</span>
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 mb-6" />
        <p className="text-center text-primary-foreground/40 text-xs font-body">
          © 2026 AV Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
