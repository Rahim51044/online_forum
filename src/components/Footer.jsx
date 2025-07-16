const Footer = () => {
  return (
    <footer className="bg-orange-300 text-black mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Site Info with logo */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968860.png"
              alt="Forum Logo"
              className="w-8 h-8"
            />
            <h2 className="text-2xl font-bold">Online Forum</h2>
          </div>
          <p className="text-sm text-gray-700">
            A modern discussion platform for sharing ideas, knowledge, and opinions. Join and be part of the community.
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-700">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/membership" className="hover:underline">Membership</a></li>
            <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect with us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="w-6 h-6" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" className="w-6 h-6" alt="Twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" className="w-6 h-6" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-base-300 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Online Forum. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
