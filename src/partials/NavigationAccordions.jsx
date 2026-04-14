import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavigationAccordions = ({ subNavList = [], item }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={()=>setIsOpen(!isOpen)}
        className="w-full px-4 py-1 hover:bg-gray-50/10 flex items-center justify-between gap-2 uppercase"
      >
        <div className="flex items-center gap-2">
          {item.icon} {item.label}
        </div>
        <FaChevronDown />
      </button>

      {isOpen && (
        <ul className="self-start w-full">
          {subNavList.map((item, key)=>{

            return (
                <li key={key} className="w-full">
                <Link to={item.path} className="block w-full hover:bg-gray-50/10 pl-10">
                {item.label}
                </Link>
                </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default NavigationAccordions;