import logo from "@/assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src={logo} 
        alt="Aldorino Rrushi - Marketing Automation & Web Development" 
        className="h-10 w-10 object-contain"
      />
    </div>
  );
};

export default Logo;