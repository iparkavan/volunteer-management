import React from "react";
import './colors.css';
import Email from "../../assets/images/Email.png";
import Address from "../../assets/images/Address.png";
import Colors from "../../assets/images/Colors.png";
import CurrentLocation from "../../assets/images/CurrentLocation.png";
import Formula from "../../assets/images/Formula.png";
import HtmlBlock from "../../assets/images/HtmlBlock.png";
import Reminder from "../../assets/images/Reminder.png";
import RatingScale from "../../assets/images/RatingScale.png";
import SectionBreak from "../../assets/images/SectionBreak.png";
import Signature from "../../assets/images/Signature.png";
import SliderControl from "../../assets/images/SliderControl.png";
import Mobile from "../../assets/images/Mobile.png";

import Password from "../../assets/images/Password.png";

import Share from "../../assets/images/Share.png";

const OtherElements = ({
  onClose,
  onDone,
  setSelectedOtherElements,
  setSelectedItems,
  selectedItems,
}) => {
  const elements = [
    { id: "email", name: "Email", icon: <img src={Email} alt="email"/> },
    { id: "mobile", name: "Mobile", icon: <img src={Mobile} alt="mobile"/> },
    { id: "address", name: "Address", icon: <img src={Address} alt="address"/>},
    { id: "rating", name: "Rating Scale", icon: <img src={RatingScale} alt="rating"/> },
    { id: "colors", name: "Colors", icon: <img src={Colors} alt=""/> },
    { id: "slider", name: "Slider Control", icon:  <img src={SliderControl} alt=""/> },
    { id: "section", name: "Section Break", icon:  <img src={SectionBreak} alt=""/> },
    { id: "html", name: "HTML Block", icon:  <img src={HtmlBlock} alt=""/> },
    { id: "formula", name: "Formula/Calc", icon:  <img src={Formula} alt=""/> },
    { id: "signature", name: "Signature", icon:  <img src={Signature} alt=""/> },
    { id: "location", name: "Current Location", icon:  <img src={CurrentLocation} alt=""/> },
    { id: "password", name: "Passwords", icon:  <img src={Password} alt="Password"/>},
    { id: "reminder", name: "Reminder", icon:  <img src={Reminder} alt="reminder"/> },
    { id: "share", name: "Share", icon:  <img src={Share} alt="share"/> },
  ];

  // Updated handleSelect function to handle checkbox change
  const handleCheckboxChange = (id) => {
    const selectedElement = document.getElementById(id);
    if (selectedElement && selectedElement.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Other Elements
        </h3>

        {/* Elements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {elements.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 bg-indigo-50 border rounded-md hover:shadow"
            >
              
              <input
                type="checkbox"
                id={item.id}
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
                className="mr-2 h-5 w-5 text-orange-600 rounded focus:ring focus:ring-orange-500"
              />
              <label
                htmlFor={item.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <span>{item.icon}</span>
                <span className="text-gray-700">{item.name}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => {
              setSelectedItems([]);
              onClose();
            }}
            className="px-4 py-2 border border-gray-300 rounded "
          >
            Clear
          </button>
          <button
            onClick={() => {
              if (selectedItems.length === 0) {
                return;
              }
              setSelectedOtherElements(selectedItems);
              onDone();
            }}
            className="px-4 py-2 bg-teal-500 text-white rounded "
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherElements;
