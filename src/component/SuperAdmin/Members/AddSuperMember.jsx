import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelIcon from "../../../assets/images/cancel1x.png";
import { Button } from "../../../shared";
import protectedApi from "../../../services/api";
import SuccessTik from "../../../assets/images/blue_tik1x.png";
import MuiModal from "../../../shared/Modal";
import MultiSelectElement from "../../MultiSelectElement/MultiSelectElement";


function AddSuperMember() {
  const [taskSuccess, setTaskSuccess] = useState(false);
  const [formDetail, setFormDetail] = useState({
    FirstName: "",
    LastName: "",
    // UserName: "",
    PrimaryPhoneNumber: "",
    SecondaryPhoneNumber: "",
    EmailId: "",
    OrgEmailId: "",
    Category: [],
  });
  const navigate = useNavigate();
  const [errFields, setErrFields] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories from API
    setLoading(true);
    protectedApi
      .get("/category")
      .then((response) => {
        setCategories(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value)

    // Clear error for this field when user changes the value
    setErrFields((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error for the specific field
    }));
    if (name === "FirstName") {
      setFormDetail((prevDetail) => ({
        ...prevDetail,
        [name]: value,
        OrgEmailId: `${value}${prevDetail?.LastName}@socialroots.ai`
      }));
    } else if (name === "LastName") {
      setFormDetail((prevDetail) => ({
        ...prevDetail,
        [name]: value,
        OrgEmailId: `${prevDetail?.FirstName}${value}@socialroots.ai`
      }));
    } else if (type === "select-one") {
      // For single select, store the value as an array
      setFormDetail((prevDetail) => ({
        ...prevDetail,
        [name]: [Number(value)], // Store as an array of numbers
      }));
    } else {
      // For other form fields, just store the value as usual
      setFormDetail((prevDetail) => ({
        ...prevDetail,
        [name]: value,
      }));
    }
  };
  const handledropChange = (selectedOptions) => {
    // Handle the selection change for multi-select
    setErrFields((prevErrors) => ({
      ...prevErrors,
      Category: "", // Clear error for the specific field
    }));

    // Update the Category state with the selected category IDs
    setFormDetail((prevDetail) => ({
      ...prevDetail,
      Category: selectedOptions ? selectedOptions.map(option => option.value) : [], // Update with selected IDs
    }));
  };
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    let firstInvalidField = null;

    let mandatoryFields = [
      "FirstName",
      "LastName",
      "EmailId",
      "PrimaryPhoneNumber",
      "Category",
    ];

    // Check for missing mandatory fields
    mandatoryFields.forEach((field) => {
      if (!formDetail[field]) {
        errors[field] = `${field} is required`;
        if (!firstInvalidField) {
          firstInvalidField = field;
        }
        isValid = false;
      }
    });

    // Set errors if any
    setErrFields(errors);

    // Focus on the first invalid field, if any
    if (firstInvalidField) {
      // Instead of refs, we can use the name attribute directly to focus on the invalid field
      document.getElementsByName(firstInvalidField)[0]?.focus();
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (validateForm()) {

      // Prepare the data to send in the API request
      const data = {
        first_name: formDetail.FirstName,
        last_name: formDetail.LastName,
        personal_email: formDetail.EmailId,
        email: formDetail.OrgEmailId,
        phone_number: formDetail.PrimaryPhoneNumber,
        secondary_phone_number: formDetail.SecondaryPhoneNumber,
        is_staff: true,
        role: "admin",
        categories: formDetail.Category, // Make sure this is an array of IDs
      };
      setLoading(true);
      protectedApi
        .post("/register", data)
        .then((response) => {
          if (response.status === 200 && response.data?.error) {
            alert(response.data.error);
          } else {
            console.log("Successfully created new org admin:", response.data);
            setTaskSuccess(true);
            setTimeout(() => {
              navigate("/super-members");
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error creating new org admin:", error);
          alert("Something went wrong, please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="px-9 my-6 grid">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div
        className="grid mb-10"
        style={{
          boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)",
          borderRadius: "5px",
        }}
      >
        <div className="breadcrum">
          <nav
            className="flex px-7 pt-6 pb-5 mx-2 border-b-2 justify-between"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <h2>Add New Supervisor</h2>
              </li>
            </ol>
            <img
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              src={CancelIcon}
              alt="CancelIcon"
            />
          </nav>
        </div>
        <div className="content px-8">
          <div className="py-9">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-6">
                  <FormField label="First Name" required>
                    <input
                      name="FirstName"
                      value={formDetail.FirstName}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                      placeholder="Enter First Name"
                    //   style={{
                    //     border: `1px solid ${
                    //       !errFields.FirstName ? "1d5bbf0d" : "red"
                    //     }`,
                    //     fontSize: "14px",
                    //   }}
                    />
                    {errFields.FirstName && (
                      <p className="mt-1 ms-1 text-xs text-red-400">
                        {errFields.FirstName}
                      </p>
                    )}
                  </FormField>
                </div>

                <div className="col-span-6">
                  <FormField label="Last Name" required>
                    <input
                      name="LastName"
                      value={formDetail.LastName}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                      placeholder="Enter Last Name"
                    />
                    {errFields.LastName && (
                      <p className="mt-1 ms-1 text-xs text-red-400">
                        {errFields.LastName}
                      </p>
                    )}
                  </FormField>
                </div>

                <div className="col-span-6">
                  <FormField label="Personal Email Id" required>
                    <input
                      name="EmailId"
                      value={formDetail.EmailId}
                      onChange={handleInputChange}
                      type="email"
                      className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                      placeholder="Enter Email Id"
                    //   style={{
                    //     border: `1px solid ${
                    //       !errFields.UserName ? "1d5bbf0d" : "red"
                    //     }`,
                    //     fontSize: "14px",
                    //   }}
                    />
                    {errFields.EmailId && (
                      <p className="mt-1 ms-1 text-xs text-red-400">
                        {errFields.EmailId}
                      </p>
                    )}
                  </FormField>
                </div>

                <div className="col-span-6">
                  <FormField label="User ID">
                    <input
                      name="OrgEmailId"
                      value={formDetail.OrgEmailId}
                      onChange={handleInputChange}
                      type="email"
                      className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                      placeholder="Enter Organization Email ID"
                      disabled={true}
                    //   style={{
                    //     border: `1px solid ${
                    //       !errFields.EmailId ? "1d5bbf0d" : "red"
                    //     }`,
                    //     fontSize: "14px",
                    //   }}
                    />
                    {errFields.OrgEmailId && (
                      <p className="mt-1 ms-1 text-xs text-red-400">
                        {errFields.OrgEmailId}
                      </p>
                    )}
                  </FormField>
                </div>

                <div className="col-span-6">
                  <FormField label="Primary Phone Number" required>
                    <input
                      name="PrimaryPhoneNumber"
                      value={formDetail.PrimaryPhoneNumber}
                      onInput={handleInputChange} // Handle phone number input
                      type="number"
                      inputMode="numeric" // Allows numeric input on mobile devices
                      pattern="[0-9]*" // Restricts input to numbers only
                      className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                      placeholder="Enter Primary Phone Number"
                    //   style={{
                    //     border: `1px solid ${
                    //       !errFields.PrimaryPhoneNumber ? "1d5bbf0d" : "red"
                    //     }`,
                    //     fontSize: "14px",
                    //   }}
                    />
                    {errFields.PrimaryPhoneNumber && (
                      <p className="mt-1 ms-1 text-xs text-red-400">
                        {errFields.PrimaryPhoneNumber}
                      </p>
                    )}
                  </FormField>
                </div>

                <div className="col-span-6">
                  <FormField label="Secondary Phone Number">
                    <input
                      name="SecondaryPhoneNumber"
                      value={formDetail.SecondaryPhoneNumber}
                      onInput={handleInputChange} // Handle phone number input
                      type="number"
                      inputMode="numeric" // Allows numeric input on mobile devices
                      pattern="[0-9]*" // Restricts input to numbers only
                      className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                      placeholder="Enter Secondary Phone Number"
                    />
                  </FormField>
                </div>

                <div className="col-span-12">
                  <FormField label="Select Category" required>
                    {/* <select
                      name="Category"
                      value={formDetail.Category[0] || ""} // Access the first value of the array
                      onChange={handleInputChange}
                      className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select> */}
                    <MultiSelectElement
                      name="Category"
                      value={categories
                        .filter((category) =>
                          formDetail.Category.includes(category.id)
                        )
                        .map((category) => ({
                          label: category.name,
                          value: category.id,
                        }))} // Make sure this matches the options format
                      onChange={handledropChange}
                      options={categories.map((category) => ({
                        label: category.name,
                        value: category.id,
                      }))}
                      className="content-center w-full border-none py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                      placeholder="Select categories"
                      required

                    />
                    {errFields.Category && (
                      <p className="mt-1 ms-1 text-xs text-red-400">
                        {errFields.Category}
                      </p>
                    )}
                  </FormField>
                </div>
              </div>

              <div className="flex gap-6 justify-center align-middle py-16">
                <Button
                  btnName="Cancel"
                  btnCls="w-[18%]"
                  btnCategory="secondary"
                  onClick={() => navigate("/certificates")}
                />
                <Button
                  btnType="submit"
                  btnCls="w-[18%]"
                  btnName="Add New Supervisor"
                  btnCategory="primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <MuiModal
        modalOpen={taskSuccess}
        modalClose={() => setTaskSuccess(false)}
        noheader
      >
        <div className='px-5 py-1 flex justify-center items-center'>
          <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
            style={{ background: '#fff', borderRadius: '10px' }}>
            <img src={SuccessTik} alt="SuccessTik" />
            <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
              style={{
                fontWeight: 600
              }}
            >New Org Supervisor successfully created!</p>
          </div>

        </div>
      </MuiModal>
    </div>
  );
}

function FormField({ required = false, label = "", error, children }) {
  return (
    <>
      {label && (
        <p className="block tracking-wide text-gray-700 text-xs font-bold mb-4">
          <span>{label}</span>
          {required && <span className="text-red-400">*</span>}
        </p>
      )}
      {children}
      {error && <p className="mt-1 ms-1 text-xs text-red-400">{error}</p>}
    </>
  );
}

export default AddSuperMember;
