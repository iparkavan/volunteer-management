import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { ReactComponent as ArrowRight } from "../../assets/icons/arrowRight.svg";
import { ReactComponent as PreviousIcon } from "../../assets/icons/previousIcon.svg";
import { ReactComponent as NextIcon } from "../../assets/icons/nextIcon.svg";
import ArrorwRightIcon from '../../assets/icons/ArrorRight.svg'
import ArrorwLeftIcon from '../../assets/icons/ArrowLeft.svg'
import './stepper.css'

export const Stepper = ({ steps, currentStep = 0, btnTypeAction,handleStepClick  }) => {
  const [iconsVisibility, setIconsVisibility] = useState({ prevIcon: false, nextIcon: true })
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      const stepWidth = slider.scrollWidth / steps.length;
      const newScrollLeft = slider.scrollLeft - stepWidth;

      slider.scrollTo({ left: newScrollLeft, behavior: 'smooth' });

      setIconsVisibility({
        prevIcon: newScrollLeft > 0,
        nextIcon: newScrollLeft + slider.clientWidth < slider.scrollWidth,
      });
    }
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      const stepWidth = slider.scrollWidth / steps.length;
      const newScrollLeft = slider.scrollLeft + stepWidth;

      slider.scrollTo({ left: newScrollLeft, behavior: 'smooth' });

      setIconsVisibility({
        prevIcon: newScrollLeft > 0,
        nextIcon: newScrollLeft + slider.clientWidth < slider.scrollWidth,
      });
    }
  };

  useEffect(() => {
    const slider = document.getElementById('slider');
    if (slider) {
      const stepWidth = slider.scrollWidth / steps.length;
      const scrollTo = currentStep === 1 
        ? 0 
        : stepWidth * (currentStep - 1) - stepWidth / 2;
  
      slider.scrollTo({ 
        left: scrollTo, 
        behavior: currentStep === 1 ? 'auto' : 'smooth' 
      });
  
      setIconsVisibility({
        prevIcon: scrollTo > 0,
        nextIcon: scrollTo + slider.clientWidth < slider.scrollWidth,
      });
    }
  }, [currentStep, steps]);
  

  return (
    <Box sx={{ width: '100%' }} className="relative">
      {
        iconsVisibility.prevIcon && <div className='previousIcon absolute cursor-pointer' onClick={slideLeft}> <img src={ArrorwLeftIcon} alt="ArrorwLeftIcon" /></div>
      }
      <div
        id='slider'
        className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide no-scrollbar'
      >
        <ol
          className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center 
          text-gray-500 bg-white  rounded-lg shadow-sm 
          sm:text-base  sm:p-4 sm:space-x-4 
          rtl:space-x-reverse gap-12"
        >
          {
            steps.map((step, index) => {
              const currentIndex = parseInt(index)
              const fieldView = step.status === 'In-Progress' ? 'opacity-100' : 'opacity-100'
             
              return (
                <li className="flex flex-row cursor-pointer items-center" style={{ color: `${currentStep >= currentIndex + 1 ? 'rgba(29, 91, 191, 1)' : '#000'}` }} key={index}  
                onClick={(e) =>   { e.preventDefault()
                  e.stopPropagation();
                 handleStepClick(index + 1,e)}} >
                  <span className={`flex items-center justify-center w-5 h-5 me-2 text-sm border rounded-2xl px-4 py-4 ${fieldView}`}
                    style={{
                      background: `${currentStep >= currentIndex + 1 ? '#FE634E' : 'rgba(217, 228, 242, 1)'}`,
                      color: `${currentStep >= currentIndex + 1 ? '#fff' : 'rgba(24, 40, 61, 1)'}`
                    }}
                  >
                    {index + 1}
                  </span>
                  <div className="flex flex-col text-left pr-4">
                    <div className={
                     `
                      ${step.status === 'In-Progress' ? 'opacity-100' : '!text-font-primary-main'} 
                
                      font-medium`
                      }>{step.name}</div>
                    <div className={`text-xs ${fieldView}  ${step.status === 'In-Progress' ? 'text-red-500' : ''} `}>{step.status}</div>
                  </div>
                  { currentIndex !== steps.length-1 ? <ArrowRight /> : null }
                </li>
              )
            })
          }
        </ol>
      </div>
      {
        iconsVisibility.nextIcon && <div className='nextIcon absolute cursor-pointer' onClick={slideRight}> <img src={ArrorwRightIcon} alt="ArrorwRightIcon" />  </div>
      }

    </Box>
  );
}

