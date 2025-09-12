
import logo from "@/assets/favicon.svg";

const Logo = () => {
  return (
    <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()} title="Go to Home" style={{ height: '64px', alignItems: 'center' }}>
      <img
        src={logo}
        alt="Aldorino Rrushi Logo"
        style={{ height: '64px', width: 'auto', maxWidth: '180px', objectFit: 'contain', display: 'block', verticalAlign: 'middle' }}
      />
    </div>
  );
};

export default Logo;