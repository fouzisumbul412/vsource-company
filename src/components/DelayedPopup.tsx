import React, { useEffect, useRef, useState } from "react";

const ADMIN_BASE_URL = "/admin";

const DelayedPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const hasPopupShown = useRef(false);

  const options = [
    "Masters in abroad",
    "B.Tech in Naac A, A+, A++ UNIVERSITIES",
    "MBBS in abroad",
    "Education Loan Guidance",
  ];

  useEffect(() => {
    if (sessionStorage.getItem("popup_canceled") !== "true") {
      hasPopupShown.current = false;
    }

    const formSubmitted =
      localStorage.getItem("vsource_form_submitted") === "true";

    if (formSubmitted) return;

    const checkScrollPosition = () => {
      if (sessionStorage.getItem("popup_canceled") === "true") return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercentage > 75 && !hasPopupShown.current && !showPopup) {
        setShowPopup(true);
        hasPopupShown.current = true;
      }
    };

    checkScrollPosition();

    window.addEventListener("scroll", checkScrollPosition);

    const handleShowPopupEvent = (event: Event) => {
      const customEvent = event as CustomEvent;

      setShowPopup(true);
      setErrorMessage("");
      setSuccessMessage("");

      if (customEvent.detail && customEvent.detail.selectedOption) {
        setSelectedOption(customEvent.detail.selectedOption);
      }
    };

    window.addEventListener("showCallbackPopup", handleShowPopupEvent);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("showCallbackPopup", handleShowPopupEvent);
    };
  }, [showPopup]);

  const handleClose = () => {
    setShowPopup(false);
    setShowDropdown(false);
    sessionStorage.setItem("popup_canceled", "true");
  };

  const resetForm = () => {
    setName("");
    setPhoneNumber("");
    setSelectedOption("");
    setShowDropdown(false);
  };

  const validatePhoneNumber = (phone: string) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const trimmedName = name.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedName) {
      setErrorMessage("Please enter student name.");
      return;
    }

    if (!validatePhoneNumber(trimmedPhone)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!selectedOption) {
      setErrorMessage("Please select the service required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${ADMIN_BASE_URL}/submit_callback.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          selectedOption: selectedOption,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error("Failed to submit callback request.");
      }

      if (result.status === "success") {
        setSuccessMessage("Thank you! We'll call you back shortly.");
        localStorage.setItem("vsource_form_submitted", "true");
        resetForm();

        setTimeout(() => {
          setShowPopup(false);
          setSuccessMessage("");
        }, 1800);
      } else {
        setErrorMessage(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Unable to submit your request right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
    setErrorMessage("");
  };

  const handlePhoneChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    setPhoneNumber(onlyNumbers.slice(0, 10));
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        <div className="bg-white p-6 text-gray-800 rounded-2xl">
          <div className="bg-blue-500 text-white py-4 px-6 -mx-6 -mt-6 mb-6 text-center relative rounded-t-2xl">
            <h2 className="text-xl font-bold mb-1">Save</h2>

            <p className="text-xl font-semibold">
              big on your application fees!
            </p>

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-white hover:text-gray-200 transition-colors"
              aria-label="Close"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="text-center text-gray-700 mb-6 text-lg">
            We are just a call away from making your{" "}
            <span className="font-bold">dreams into reality!!</span>
          </p>

          {successMessage && (
            <div className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name input */}
            <input
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMessage("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              required
            />

            {/* Phone input */}
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <div className="bg-gray-100 text-gray-700 px-4 py-3 flex items-center font-medium border-r rounded-l-md">
                +91
              </div>

              <input
                type="tel"
                placeholder="Mobile Number"
                value={phoneNumber}
                onChange={(e) => {
                  handlePhoneChange(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full px-4 py-3 text-gray-700 focus:outline-none"
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </div>

            {/* Dropdown */}
            <div className="relative">
              <div
                className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 flex justify-between items-center cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span>{selectedOption || "Select Service Required"}</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {showDropdown && (
                <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white font-medium py-3 px-4 rounded-md transition duration-150 shadow-md ${
                isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Request Callback"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left pt-6 border-t border-gray-200">
            <p className="text-base mb-4 md:mb-0">
              You can always reach us on
              <br />
              <span className="font-bold text-lg">+91 99126 11119</span>
            </p>

            <div className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="underline">
                terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelayedPopup;