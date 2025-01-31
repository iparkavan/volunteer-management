import React from "react";

const NavHead = ({ role, handleLogoClick = () => false }) => {
  const getRoleStyles = (role) => {
    switch (role?.toLowerCase()) {
      case "mentee":
        return {
          text: "Volunteer",
          color: "text-[#4F4F4F]",
        };
      case "mentor":
        return {
          text: "Program Manager",
          color: "text-[#F17925]",
        };
      case "admin":
        return {
          text: "Supervisor",
          color:
            "text-[#BF453A]",
        };
      default:
        return {
          text: "MMA",
          color: "text-gray-800",
        };
    }
  };

  const { text, color } = getRoleStyles(role);

  return (
    <div
      className='site-logo cursor-pointer flex items-center space-x-3 rtl:space-x-reverse'
      onClick={handleLogoClick}
    >
      <span
        className={`self-center ${role === "mentor" ? 'text-2xl' : 'text-3xl'} font-extrabold whitespace-nowrap ${color} transition-colors duration-300`}
      >
        {text}
      </span>
    </div>
  );
};

export default NavHead;
