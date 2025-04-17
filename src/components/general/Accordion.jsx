import "@/styles/accordion-animations.css";

import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Icon from "./Icon";

const Content = Icon;


const Accordion = ({
  className = "",
  title = "",
  titleClassName = "",
  defaultState = false,
  divider = {
    upper: {
      className: "",
      isEnabled: false
    },
    bottom: {
      className: "",
      isEnabled: false
    }
  },
  content = <></>,
  contentClassName = "",
  openIcon = "+",
  closeIcon = "-",
  iconClassName = "",
  timeout = 300,
  unmountOnExit = true
}) => {


  const [isOpen, setIsOpen] = useState(defaultState);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className={`accordion ${className} flex flex-col`}>
      <button
        onClick={toggleAccordion}
        className={`
          toggle-button
          w-full
          flex justify-between items-center py-4
          text-left
          focus:outline-none
        `}
      >
        <span className={`accordion-title ${titleClassName}`}>
          {title}
        </span>
        <span className={`accordion-toggle-icon-cont ${iconClassName}`}>
          {!isOpen ? <Icon icon={openIcon} /> : <Icon icon={closeIcon} />}
        </span>
      </button>

      {divider?.upper?.isEnabled &&
        <hr className={`w-full ${divider.upper.className}`} />
      }

      <CSSTransition
        in={isOpen}
        timeout={timeout}
        classNames="accordion"
        unmountOnExit={unmountOnExit}
      >
        <Content
          className={`
            ${contentClassName}
            ${(isOpen) ? "block" : "hidden"}
          `}
          icon={content}
        />
      </CSSTransition>

      {(isOpen && divider?.bottom?.isEnabled) &&
        <hr className={`w-full ${divider.bottom.className}`} />
      }
    </div>
  );
};


export default Accordion;