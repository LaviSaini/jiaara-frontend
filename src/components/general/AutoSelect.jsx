'use client';

import Link from "next/link";

import { useState, useRef, useEffect } from "react";

import { useFormContext } from "react-hook-form";

import InputField from "@/components/general/InputField";
import Icon from "@/components/general/Icon";

import useScrollIntoView from "@/utils/hooks/general/useScrollIntoView";
import useClickOutside from "@/utils/hooks/general/useClickOutside";


const AutoSelect = ({
  className = "",
  isLinkMode = false,
  inputGroupClassName = "",
  label = {},
  input = {},
  validation = {},
  dropdownClassName = "",
  optionClassName = {
    default: "",
    hover: "",
    selection: "",
    link: ""
  },
  defaultOption = "",
  options = [],
  arrowDropdownIcon: ArrowDropdown = ({
    className = "", size = 20, stroke = "", fill = "none", onClick = () => { }
  }) =>
    <svg
      className={`arrow-drop-down-icon ${className}`}
      width={size}
      height={size}
      onClick={onClick}
      stroke={stroke}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 20l10 10 10-10z" />
      <path d="M0 0h48v48h-48z" fill={fill} />
    </svg>
}) => {
  // console.log('options', options)
  const methods = useFormContext();
  const inputValue = methods?.watch(input?.inputName) ?? input?.defaultValue;

  const [filteredOptions, setFilteredOptions] = useState(options);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState(() => {
    methods?.setValue(input?.inputName, defaultOption);
    return defaultOption;
  });

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { scrollRef, scrollIntoView }
    = useScrollIntoView({ behavior: "instant", block: "nearest", mode: "manual" });


  useEffect(() => {

    function initializeFilteredOptions() {

      if (options && options?.length > 0) {
        setFilteredOptions(options);
      }
    }

    initializeFilteredOptions();
  }, [options]);


  useEffect(() => {

    if (isLinkMode) return;

    if (options.length <= 0) return;

    function handleInputValue() {

      const filtered = options.filter(option =>
        option.toLowerCase().includes(inputValue?.toLowerCase())
      );
      setFilteredOptions(filtered);
    }

    handleInputValue();

  }, [isLinkMode, inputValue, options]);


  const handleSelect = option => {

    setDropdownVisible(false);

    if (isLinkMode) return;

    methods?.setValue(input?.inputName, option);
    setSelectedOption(option);
    setFilteredOptions(options);
  };


  const toggleDropdown = (isVisible = null) => {

    if (isLinkMode) {
      setDropdownVisible(isVisible);
      return;
    }

    if (isDropdownVisible) {
      inputRef.current?.blur();
    }

    setDropdownVisible(!isDropdownVisible);

    setFilteredOptions(options);
  };


  useEffect(() => {

    if (isLinkMode) return;

    if (isDropdownVisible) {
      scrollIntoView();
    }
  }, [isLinkMode, isDropdownVisible, scrollRef, scrollIntoView]);


  useClickOutside(dropdownRef, () => {

    setDropdownVisible(false);
    inputRef.current?.blur();
  });


  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      onMouseOver={() => isLinkMode && toggleDropdown(true)}
      onMouseLeave={() => isLinkMode && toggleDropdown(false)}
    >
      <InputField
        className={`${inputGroupClassName}`}
        onClick={toggleDropdown}

        input={{
          ref: inputRef,
          icon: {
            className: `${isDropdownVisible ? 'rotate-180' : ''} ${input?.icon?.className}`,
            theIcon: input?.icon?.theIcon ?
              <Icon icon={input?.icon?.theIcon} /> : <Icon icon={<ArrowDropdown />} />
          },
          value: inputValue,
          ...input
        }}

        label={{
          ...label
        }}

        validation={{
          ...validation
        }}
      />

      {isDropdownVisible && filteredOptions.length > 0 && (
        <ul className={`${dropdownClassName} absolute top-[97.9%] inset-x-0 mt-0.5 z-10 select-none`}>
          {filteredOptions.map((option, index) =>
            <li
              key={option?.id || index}
              ref={selectedOption === option ? scrollRef : null}
              className={`
                cursor-pointer px-3 py-2
                ${optionClassName?.default ? optionClassName?.default : ""}
                ${selectedOption === option ? optionClassName?.selection : ""}
                ${selectedOption !== option ? optionClassName?.hover : ""}
              `}
              onClick={() => handleSelect(option)}
            >
              {isLinkMode ? (
                <Link className={optionClassName?.link} href={option?.url}>
                  {option?.name &&
                    <div className={`${option?.slug} text-wrap break-words`}>
                      {option?.name}
                    </div>
                  }
                  {option?.count &&
                    <div className={`${option?.slug}-count-${option?.count}`}>
                      {`(${option?.count})`}
                    </div>
                  }
                </Link>
              ) : (
                option
              )}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoSelect;
