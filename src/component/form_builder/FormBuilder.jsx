import React, { useState } from "react";
import {
  Plus,
  Calendar,
  Search,
  Type,
  Hash,
  FileText,
  Image,
  Mail,
  Phone,
  MapPin,
  Star,
  Palette,
  SlidersHorizontal,
  KeyRound,
  Section,
  Bell,
  Share2,
  Code,
  Clock,
} from "lucide-react";
import getInitialProperties from "./getInitialProperties";
import PreviewMode from "./PreviewMode";
import FormElementPreview from "./FormElementPreview";
import PropertyInputs from "./PropertyInputs";
import OtherElements from "./OtherElementsModal";
import GroupModal from "./GroupModal";
import { useNavigate, useParams } from "react-router-dom";
import "./colors.css";
import SuccessGradientMessage from "./SuccessGradientMessage";
import Properties from '../../assets/images/Properties.png'
import Text from "../../assets/images/Text.png"
import TextArea from "../../assets/images/TextArea.png";
import Dropdown from '../../assets/images/Dropdown.png'
import RadioButton from '../../assets/images/RadioButton.png';
import Number from "../../assets/images/Number.png"
import DateImage from "../../assets/images/DateImage.png";
import Time from "../../assets/images/Time.png";
import Attachment from "../../assets/images/Attachment.png";
import Picture from "../../assets/images/Picture.png";
import { useGetFormQuery, usePostFormMutation } from "../../features/formBuilder/formBuilderSlice";
import { Backdrop, CircularProgress } from "@mui/material";

const FormBuilder = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const { action } = useParams();
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOtherElements, setSelectedOtherElements] = useState([]);
  const [selectedElementProperty, setSelectedElementProperty] = useState(null);
  const [showOtherElements, setShowOtherElements] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [elementGroups, setElementGroups] = useState([]);
  const [tempProperties, setTempProperties] = useState({});
  const [draggedElement, setDraggedElement] = useState(null);
  const [formJson, setFormJson] = useState({
    form_name: "",
    number_of_columns: "2",
    fields: [],
    status: true,
    created_by: "admin",
    form_data: {},
  });
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  const [
    postForm,
    { isLoading: isPostFormLoading, isSuccess: isPostFormSuccess },
  ] = usePostFormMutation();

  React.useEffect(() => {
    if (isPostFormSuccess) {
      setIsBackdropOpen(true);
      setTimeout(() => {
        setIsBackdropOpen(false);
        handleCancel();
      }, 2000);
    }
  }, [isPostFormSuccess])

  const {
    data: form,
    isLoading: isGetFormLoading,
    error,
    isError,
    isSuccess
  } = useGetFormQuery(action);

  React.useEffect(() => {
    if (action != "add") {
      console.log(form)
      setFormJson(form)
    }
  }, [action, isGetFormLoading, error, form, isError, isSuccess]);

  // React.useEffect(() => {
  //   if (action !== "add" && formJson?.fields) {
  //     const initialTempProperties = {};
  //     formJson?.fields.forEach((field) => {
  //       initialTempProperties[field.id] = { ...field.field_info };
  //     });
  //     setTempProperties(initialTempProperties);
  //   }
  // }, [formJson?.fields, action,form, isLoading, isError, error]);

  const elements = {
    textElements: [
      {
        id: "text",
        name: "Single line",
        icon: <img src={Text} alt="text" />
      },
      {
        id: "textarea",
        name: "Text Area",
        icon: <img src={TextArea} alt="textarea" />,
      },
      {
        id: "number",
        name: "Number",
        icon: <img src={Number} alt="number" />,
      },
    ],
    dateElements: [
      {
        id: "date",
        name: "Date",
        icon: <img src={DateImage} alt="date" />,
      },
      {
        id: "time",
        name: "Time",
        icon: <img src={Time} alt="time" />,
      },
    ],
    multiElements: [
      {
        id: "select",
        name: "Dropdown",
        icon: (
          <img src={Dropdown} alt="dropdown" />
        ),
      },
      {
        id: "radio",
        name: "Radio button",
        icon: (
          <img src={RadioButton} alt="radio" />
        ),
      },
    ],
    mediaElements: [
      {
        id: "file",
        name: "Attachments",
        icon: <img src={Attachment} alt="file" />,
      },
      {
        id: "image",
        name: "Image",
        icon: <img src={Picture} alt="image" />,
      },
    ],
    otherElements: [
      {
        id: "email",
        name: "Email",
        icon: <Mail size={18} className="text-gray-600" />,
      },
      {
        id: "mobile",
        name: "Mobile",
        icon: <Phone size={18} className="text-gray-600" />,
      },
      {
        id: "address",
        name: "Address",
        icon: <MapPin size={18} className="text-gray-600" />,
      },
      {
        id: "rating-scale",
        name: "Rating Scale",
        icon: <Star size={18} className="text-gray-600" />,
      },
      {
        id: "colors",
        name: "Colors",
        icon: <Palette size={18} className="text-gray-600" />,
      },
      {
        id: "slider-control",
        name: "Slider Control",
        icon: <SlidersHorizontal size={18} className="text-gray-600" />,
      },
      {
        id: "section-break",
        name: "Section Break",
        icon: <Section size={18} className="text-gray-600" />,
      },
      {
        id: "html-block",
        name: "HTML Block",
        icon: <Code size={18} className="text-gray-600" />,
      },
      {
        id: "formula-cal",
        name: "Formula/Cal",
        icon: <Hash size={18} className="text-gray-600" />,
      },
      {
        id: "signature",
        name: "Signature",
        icon: <FileText size={18} className="text-gray-600" />,
      },
      {
        id: "current-location",
        name: "Current Location",
        icon: <MapPin size={18} className="text-gray-600" />,
      },
      {
        id: "passwords",
        name: "Passwords",
        icon: <KeyRound size={18} className="text-gray-600" />,
      },
      {
        id: "reminder",
        name: "Reminder",
        icon: <Bell size={18} className="text-gray-600" />,
      },
      {
        id: "share",
        name: "Share",
        icon: <Share2 size={18} className="text-gray-600" />,
      },
    ],
  };

  const checkDuplicateLabels = () => {
    const labels = formJson?.fields
      .filter((field) => field.field_info && field.field_info.label)
      .map((field) => field.field_info.label.toLowerCase());
    const duplicateLabels = labels.filter(
      (label, index) => labels.indexOf(label) !== index
    );

    if (duplicateLabels.length > 0) {
      return true;
    }
    return false;
  };

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex !== null) {
      setDragOverIndex(index);
    }
  };

  const handleFieldDragEnd = () => {
    if (draggedItemIndex !== null && dragOverIndex !== null) {
      setFormJson((prev) => {
        const newFields = [...prev.fields];
        const [draggedItem] = newFields.splice(draggedItemIndex, 1);
        newFields.splice(dragOverIndex, 0, draggedItem);
        return { ...prev, fields: newFields };
      });
    }
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("text");
    if (elementType) {
      const baseLabel =
        elementType.charAt(0).toUpperCase() + elementType.slice(1);
      let newLabel = baseLabel;
      let counter = 1;

      while (
        formJson?.fields.some(
          (field) =>
            field.field_info?.label?.toLowerCase() === newLabel.toLowerCase()
        )
      ) {
        newLabel = `${baseLabel} ${counter}`;
        counter++;
      }

      const initialProperties = getInitialProperties(elementType);
      const newElement = {
        type: elementType,
        id: Date.now(),
        field_info: {
          ...initialProperties,
          label: "",
        },
      };

      setFormJson((prev) => {
        if (draggedItemIndex === null) {
          const updatedForm = {
            ...prev,
            fields: [...prev.fields, newElement],
          };

          setTimeout(() => {
            const formContainer = document.querySelector(".form-container");
            const lastElement = formContainer?.lastElementChild;
            lastElement?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);

          return updatedForm;
        }
        return prev;
      });
    }
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handlePropertyChange = (elementId, propertyName, value) => {
    setTempProperties((prev) => {
      const currentElementProps = prev[elementId] || {};
      const existingFieldInfo =
        formJson?.fields.find((f) => f.id === elementId)?.field_info || {};

      return {
        ...prev,
        [elementId]: {
          ...existingFieldInfo,
          ...currentElementProps,
          [propertyName]: value,
        },
      };
    });
  };

  const handleSave = (elementId) => {
    const newLabel = tempProperties[elementId]?.label?.toLowerCase();
    if (!newLabel?.trim()) {
      return;
    }

    const duplicateExists = formJson?.fields.some(
      (field) =>
        field.id !== elementId &&
        field.field_info?.label?.toLowerCase() === newLabel
    );

    if (duplicateExists) {
      return;
    }

    setFormJson((prev) => ({
      ...prev,
      fields: prev.fields.map((element) => {
        if (element.id === elementId) {
          return {
            ...element,
            field_info: {
              ...element.field_info,
              ...tempProperties[elementId],
            },
          };
        }
        return element;
      }),
    }));
  };

  const handleClear = (elementId) => {
    setTempProperties((prev) => ({
      ...prev,
      [elementId]: {
        label: "",
        is_required: false,
        min_length: "",
        max_length: "",
        pattern: "",
        options: [],
        displayType: "horizontal",
      },
    }));
  };

  const handleGroupSubmit = (name) => {
    if (selectedOtherElements.length > 0) {
      const newGroup = {
        id: `group-${Date.now()}`,
        name: name,
        elements: selectedOtherElements.map((elementId) => {
          const element = elements.otherElements.find(
            (e) => e.id === elementId
          );
          return (
            element || {
              id: elementId,
              name: elementId.charAt(0).toUpperCase() + elementId.slice(1),
              icon: <FileText size={18} className="text-gray-600" />,
            }
          );
        }),
      };

      setElementGroups((prevGroups) => [...prevGroups, newGroup]);
      setSelectedOtherElements([]);
      setSelectedItems([]);
      setShowGroupModal(false);
    }
  };

  const handleDeleteElement = (elementId) => {
    setFormJson((prev) => ({
      ...prev,
      fields: prev.fields.filter((el) => el.id !== elementId),
    }));

    if (selectedElementProperty && selectedElementProperty.id === elementId) {
      setSelectedElementProperty(null);
    }
  };

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);

    if (formJson?.form_name.length < 2) {
      return;
    }

    const emptyLabels = formJson?.fields.filter(
      (field) => !field.field_info?.label?.trim()
    );
    if (emptyLabels.length > 0) {
      return;
    }

    if (checkDuplicateLabels()) {
      return;
    }
    postForm({ action: action == 'add' ? 'add' : 'edit', data: formJson });
  };

  function handleCancel() {
    setFormJson({
      form_name: "",
      number_of_columns: "2",
      fields: [],
      status: true,
      created_by: "admin",
    });
    setSelectedElementProperty(null);
    navigate("/form_builder");
  }

  const renderElementGroup = (title, items, bgColor = "bg-gray-50") => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredItems.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-sm text-teal-600 mb-2 font-jakarta">{title}</h3>
        <div className="grid grid-cols-2 gap-2">
          {filteredItems.map((item) => {
            const isBeingDragged = draggedElement === item.id;
            const elementStyle = isBeingDragged
              ? "bg-teal-50 border-2 border-teal-500"
              : `${bgColor} hover:bg-gray-100`;

            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text", item.id);
                  setDraggedElement(item.id);
                }}
                onDragEnd={() => setDraggedElement(null)}
                className={`flex items-center p-2 rounded-lg cursor-move transition-colors ${isBeingDragged
                  ? "bg-blue-100"
                  : "bg-indigo-50 hover:bg-teal-400"
                  }`}
              >
                {item.icon}
                <span className="text-sm ml-2">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (previewMode) {
    return (
      <PreviewMode
        formJson={formJson}
        setFormJson={setFormJson}
        open={previewMode}
        handleClose={() => setPreviewMode(false)}
        action="view"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="flex">
          <div className="w-80 border-r p-4 border-gray-200">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Select element"
                className="w-full p-2 pl-8 border rounded"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {renderElementGroup("Text Elements", elements.textElements)}
              {renderElementGroup("Date Elements", elements.dateElements)}
              {renderElementGroup("Multi Elements", elements.multiElements)}
              {renderElementGroup("Media Elements", elements.mediaElements)}
              {elementGroups.map((group) =>
                renderElementGroup(group.name, group.elements, "bg-gray-50")
              )}
            </div>

            <button
              onClick={() => setShowOtherElements(true)}
              className="w-full p-2 mt-4 border-2 border-dashed border-teal-500 rounded-lg text-teal-500 flex items-center justify-center hover:bg-teal-50"
            >
              <Plus size={18} className="mr-2" />
              Other elements
            </button>
          </div>

          <div className="flex-1 p-4">
            <div className="bg-gray-50 p-4 mb-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Form name"
                    className="w-full p-2 border-gray-400"
                    value={formJson?.form_name}
                    onChange={(e) =>
                      setFormJson((prev) => ({
                        ...prev,
                        form_name: e.target.value,
                      }))
                    }
                  />
                  {formJson?.form_name.length <= 2 && isFormSubmitted && (
                    <p className="text-red-500 text-sm mt-1">
                      Form name should at least have 3 characters
                    </p>
                  )}
                </div>
                <div>
                  <select
                    className="w-full p-2"
                    value={formJson?.number_of_columns}
                    onChange={(e) =>
                      setFormJson((prev) => ({
                        ...prev,
                        number_of_columns: e.target.value,
                      }))
                    }
                  >
                    <option value="1">1 Column</option>
                    <option value="2">2 Columns</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className="min-h-[400px] bg-white p-4 border rounded-lg form-container"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {formJson?.fields.length === 0 ? (
                <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center text-gray-500">
                    <div className="mb-2">Select an element to add</div>
                    <div className="text-sm">Drag and drop here</div>
                  </div>
                </div>
              ) : (
                <div
                  className={`grid grid-cols-${formJson?.number_of_columns} gap-4`}
                >
                  {formJson?.fields.map((element, index) => (
                    <div
                      key={element.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleFieldDragEnd}
                      className={`relative ${dragOverIndex === index
                        ? "border-2 border-teal-500"
                        : ""
                        }`}
                    >
                      {dragOverIndex === index && (
                        <div className="absolute inset-0 bg-teal-50 opacity-50 pointer-events-none" />
                      )}
                      <FormElementPreview
                        element={element}
                        field_info={element.field_info || {}}
                        isSelected={selectedElementProperty?.id === element.id}
                        onSelect={setSelectedElementProperty}
                        onDelete={handleDeleteElement}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="px-4 py-2 border border-red-500 text-red-500 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded"
                onClick={() => {
                  setFormJson({
                    form_name: "",
                    number_of_columns: "2",
                    fields: [],
                    status: true,
                    created_by: "admin",
                  });
                  setSelectedElementProperty(null);
                }}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 bg-orange-500 text-white rounded"
                onClick={() => setPreviewMode(true)}
              >
                Preview
              </button>
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="w-64 border-l border-gray-200">
            {selectedElementProperty ? (
              <div className="p-4">
                <h2 className="text-lg font-medium mb-4">
                  {selectedElementProperty.type.charAt(0).toUpperCase() +
                    selectedElementProperty.type.slice(1)}{" "}
                  Properties
                </h2>
                <PropertyInputs
                  element={selectedElementProperty}
                  field_info={
                    tempProperties[selectedElementProperty.id] ||
                    selectedElementProperty.field_info
                  }
                  onPropertyChange={handlePropertyChange}
                  onSave={handleSave}
                  onClear={handleClear}
                  onDelete={handleDeleteElement}
                />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <img src={Properties} alt="" />
                <p className="mt-4 text-sm text-center">
                  Add or select element and
                  <br />
                  set properties here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showOtherElements && (
        <OtherElements
          onClose={() => setShowOtherElements(false)}
          onDone={() => {
            if (selectedItems.length === 0) {
              return;
            }
            setShowGroupModal(true);
            setShowOtherElements(false);
          }}
          setSelectedOtherElements={setSelectedOtherElements}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      )}

      {showGroupModal && (
        <GroupModal
          onClose={() => setShowGroupModal(false)}
          onSubmit={handleGroupSubmit}
        />
      )}

      <SuccessGradientMessage
        message={
          action == "add"
            ? "Form submitted successfully"
            : "Form edited successfully"
        }
        isBackdropOpen={isBackdropOpen}
        setIsBackdropOpen={setIsBackdropOpen}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isGetFormLoading || isPostFormLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default FormBuilder;
