import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";

export default function PropertyInputs({ element, field_info, onPropertyChange, onSave, onClear, onDelete }) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [showOptionsMap, setShowOptionsMap] = useState({});
  const [labelError, setLabelError] = useState("");

  useEffect(() => {
    if (element?.id && field_info?.options?.length > 0) {
      setShowOptionsMap((prev) => ({
        ...prev,
        [element.id]: true,
      }));
    }
  }, [element?.id, field_info?.options]);

  if (!element) return null;

  const showOptions = showOptionsMap[element.id] || false;

  const validateLabel = (newLabel) => {
    setLabelError("");
    if (!newLabel.trim()) return true;
    if (field_info.options) {
      const duplicateOption = field_info.options.some(option => 
        option.label.toLowerCase() === newLabel.toLowerCase()
      );
      if (duplicateOption) {
        setLabelError("This label already exists in the options");
        return false;
      }
    }
    return true;
  };

  const renderCommonFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Enter Label</label>
        <input
          type="text"
          className={`w-full p-2 border rounded ${labelError ? 'border-red-500' : ''}`}
          value={field_info.label || ""}
          onChange={(e) => {
            const newLabel = e.target.value;
            if (validateLabel(newLabel)) {
              onPropertyChange(element.id, "label", newLabel);
            }
          }}
          placeholder="Enter label"
        />
        {labelError && <p className="text-red-500 text-sm mt-1">{labelError}</p>}
      </div>

      <div className="mt-3 flex items-center" onMouseEnter={() => setShowDeleteIcon(true)} onMouseLeave={() => setShowDeleteIcon(false)}>
        <input
          type="checkbox"
          className="mr-2"
          checked={field_info.is_required || false}
          onChange={(e) => onPropertyChange(element.id, "is_required", e.target.checked)}
        />
        <span>Is Required</span>
      </div>
    </>
  );

  const renderOptionsField = () => (
    <div className="mt-4">
      {!showOptions ? (
        <button
          className="w-full p-2 border-2 border-dashed border-teal-500 rounded-lg text-teal-500 flex items-center justify-center hover:bg-teal-50"
          onClick={() => {
            setShowOptionsMap((prev) => ({
              ...prev,
              [element.id]: true,
            }));
            if (!field_info.options || field_info.options.length === 0) {
              onPropertyChange(element.id, "options", [{ label: "", value: "" }]);
            }
          }}
        >
          <Plus size={16} className="mr-1" />
          Add Option
        </button>
      ) : (
        <div className="space-y-4">
          {(field_info.options || []).map((option, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded relative border"
              onMouseEnter={() => setShowDeleteIcon(true)}
              onMouseLeave={() => setShowDeleteIcon(false)}
            >
              <div className="mb-2">
                <label className="block text-sm mb-1">Option Label</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={option.label || ""}
                  placeholder="Enter label"
                  onChange={(e) => {
                    const newLabel = e.target.value;
                    const isDuplicate = field_info.options.some((opt, i) => 
                      i !== index && opt.label.toLowerCase() === newLabel.toLowerCase()
                    );
                    
                    if (isDuplicate) {
                      return;
                    }

                    const newOptions = [...field_info.options];
                    newOptions[index] = {
                      ...option,
                      label: newLabel,
                    };
                    onPropertyChange(element.id, "options", newOptions);
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm mb-1">Value</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={option.value || ""}
                  placeholder="Enter value"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const newOptions = [...field_info.options];
                    newOptions[index] = {
                      ...option,
                      value: newValue,
                    };
                    onPropertyChange(element.id, "options", newOptions);
                  }}
                />
              </div>
              {showDeleteIcon && field_info.options.length > 1 && (
                <Trash
                  size={16}
                  className="text-gray-500 cursor-pointer absolute top-3 right-3"
                  onClick={() => {
                    const newOptions = field_info.options.filter((_, i) => i !== index);
                    onPropertyChange(element.id, "options", newOptions);
                    if (newOptions.length === 0) {
                      setShowOptionsMap((prev) => ({
                        ...prev,
                        [element.id]: false,
                      }));
                    }
                  }}
                />
              )}
            </div>
          ))}
          <button
            className="w-full p-2 border-2 border-dashed border-teal-500 rounded-lg text-teal-500 flex items-center justify-center hover:bg-teal-50"
            onClick={() => {
              const newOptions = [...(field_info.options || []), { label: "", value: "" }];
              onPropertyChange(element.id, "options", newOptions);
            }}
          >
            <Plus size={16} className="mr-1" />
            Add Another Option
          </button>
        </div>
      )}
    </div>
  );

  const renderFieldsByType = () => {
    switch (element.type) {
      case "radio":
      case "select":
        return (
          <div className="space-y-4">
            {renderCommonFields()}
            {renderOptionsField()}
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            {renderCommonFields()}
            <div>
              <label className="block text-sm font-medium mb-1">Min Length</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter min length"
                value={field_info.min_length || ""}
                onChange={(e) => onPropertyChange(element.id, "min_length", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Length</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter max length"
                value={field_info.max_length || ""}
                onChange={(e) => onPropertyChange(element.id, "max_length", e.target.value)}
              />
            </div>
          </div>
        );

      case "number":
        return (
          <div className="space-y-4">
            {renderCommonFields()}
            <div>
              <label className="block text-sm font-medium mb-1">Min</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter min value"
                value={field_info.min || ""}
                onChange={(e) => onPropertyChange(element.id, "min", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter max value"
                value={field_info.max || ""}
                onChange={(e) => onPropertyChange(element.id, "max", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Step</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter step value"
                value={field_info.step || ""}
                onChange={(e) => onPropertyChange(element.id, "step", e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return <div className="space-y-4">{renderCommonFields()}</div>;
    }
  };

  return (
    <div className="space-y-4">
      {renderFieldsByType()}
      <div className="flex justify-center space-x-2 pt-4">
        <button
          className="px-4 py-2 border rounded"
          onClick={() => {
            setShowOptionsMap((prev) => ({
              ...prev,
              [element.id]: false,
            }));
            onClear(element.id);
          }}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded"
          onClick={() => {
            if (!field_info.label?.trim()) {
              setLabelError("Label is required");
              return;
            }
            onSave(element.id);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}