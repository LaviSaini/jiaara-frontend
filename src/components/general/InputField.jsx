'use client';

import { useFormContext } from "react-hook-form";

import { Controller } from "react-hook-form";

import Content from "@/components/general/Icon";
const Icon = Content;


export default function InputField({
  className = "",
  onClick = () => { },

  input = {
    id: "",
    inputName: "",
    type: "text",
    className: "",
    placeholder: "",
    value: "",
    icon: {
      className: "",
      theIcon: <></>,
    },
    options: [
      {
        inputGroupClassName: "",
        value: "",
        label: {
          className: "",
          textClassName: "",
          text: "",
        },
        disabled: false,
      },
    ],
    autoComplete: "on",
    autoFocus: false,
    required: false,
    minLength: undefined,
    maxLength: undefined,
    min: undefined,
    max: undefined,
    readOnly: false,
    rows: 4,
  },

  label = {
    className: "",
    text: "",
    require: false
  },

  validation = {
    isEnabled: false,
    className: "",
    messages: {
      required: "This field is required",
      invalidEmail: "Invalid email address",
      maxLength: "Exceeds maximum length",
      min: "Value is too low",
      max: "Value is too high",
    },
  },

  control = null
}) {

  const methods = useFormContext();

  const validationRules = {
    ...(validation?.isEnabled && input?.required && {
      required: validation?.messages?.required,
    }),
    ...(input?.type === "email" && validation?.isEnabled && {
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: validation?.messages?.invalidEmail,
      },
    }),
    ...(input?.minLength && {
      minLength: {
        value: input?.minLength,
        message: validation?.messages?.minLength,
      },
    }),
    ...(input?.maxLength && {
      maxLength: {
        value: input?.maxLength,
        message: validation?.messages?.maxLength,
      },
    }),
    ...(input?.min !== undefined && {
      min: {
        value: input?.min,
        message: validation?.messages?.min,
      },
    }),
    ...(input?.max !== undefined && {
      max: {
        value: input?.max,
        message: validation?.messages?.max,
      },
    }),
  };


  return (
    <div
      className={`input-group flex flex-col gap-2 ${className}`}
      onClick={onClick}
    >
      {label?.text && (
        <label className={`${label?.className}`} htmlFor={input?.id}>
          {label?.text}
          {
            label?.require ?
              <>
                <span style={{ color: 'red' }}>*</span>
              </>
              :
              ''
          }
        </label>

      )}


      {/* Render controlled components using Controller */}
      {(methods?.control || control) ? (
        <Controller
          name={input?.inputName}
          control={methods?.control || control}
          rules={validationRules}
          defaultValue={input?.value || ""}
          render={({ field, fieldState: { error } }) => (
            <>
              {/* Checkbox and Radio */}
              {(input?.type === "checkbox" || input?.type === "radio") &&
                input?.options.map(option => (
                  <div
                    key={option?.value}
                    className={`flex items-center ${option?.inputGroupClassName}`}
                  >
                    <input
                      {...field}
                      id={option?.value}
                      name={`${input?.inputName}[]`}
                      type={input?.type}
                      value={option?.value}
                      className={`${input?.className}`}
                      disabled={option.disabled}
                      onChange={event => {
                        const currentValue = event.target.value;
                        const isChecked = event.target.checked;

                        const newValue = isChecked
                          ? [...(field.value || []), currentValue]
                          : (field.value || []).filter(value => value !== currentValue);

                        field.onChange(newValue);
                      }}
                    />
                    <label
                      htmlFor={option?.value}
                      className={`${option?.label?.className}`}
                    >
                      <Content
                        className={`${option?.label?.textClassName}`}
                        icon={option?.label?.text}
                      />
                    </label>
                  </div>
                ))}

              {/* Textarea */}
              {input?.type === "textarea" && (
                <textarea
                  {...field}
                  id={input?.id}
                  name={input?.inputName}
                  className={`${input?.className} outline-none hover:ring-1 focus:ring-1`}
                  placeholder={input?.placeholder}
                  rows={input?.rows}
                  autoComplete={input?.autoComplete}
                  autoFocus={input?.autoFocus}
                  readOnly={input?.readOnly}
                />
              )}

              {/* Standard Input */}
              {input?.type !== "checkbox" &&
                input?.type !== "radio" &&
                input?.type !== "textarea" && (
                  <div className="wrapper w-full relative flex items-center">
                    <input
                      {...field}
                      id={input?.id}
                      name={input?.inputName}
                      type={input?.type}
                      className={`${input?.className} outline-none hover:ring-1 focus:ring-1`}
                      placeholder={input?.placeholder}
                      autoComplete={input?.autoComplete}
                      autoFocus={input?.autoFocus}
                      readOnly={input?.readOnly}
                    />
                    {input?.icon?.theIcon && (
                      <Icon
                        className={`${input?.icon?.className} absolute right-[0.8rem]`}
                        icon={input?.icon?.theIcon}
                      />
                    )}
                  </div>
                )}

              {/* Validation Error */}
              {error && (
                <p className={`error ${validation?.className ? validation?.className : "text-red-500 text-xs"}`}>
                  {error.message}
                </p>
              )}
            </>
          )}
        />
      )
        :
        (
          <div className="wrapper w-full relative flex items-center">
            <input
              id={input?.id}
              name={input?.inputName}
              type={input?.type}
              className={`${input?.className} outline-none hover:ring-1 focus:ring-1`}
              value={input?.value}
              placeholder={input?.placeholder}
              autoComplete={input?.autoComplete}
              autoFocus={input?.autoFocus}
              readOnly={input?.readOnly}
            />
            {input?.icon?.theIcon && (
              <Icon
                className={`${input?.icon?.className} absolute right-[0.8rem]`}
                icon={input?.icon?.theIcon}
              />
            )}
          </div>
        )}
    </div>
  );
}