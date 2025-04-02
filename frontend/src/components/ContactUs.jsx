import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessMessage("Message sent successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          });
          setFormErrors({});
        } else {
          const errorData = await response.json();
          console.error("Error sending message:", errorData);
          setFormErrors({ general: errorData.message || "Failed to send message" });
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setFormErrors({ general: "Failed to send message" });
      }
    }
  };

  const address =
    "04, Kalyanikar Hall, Kailash Nagar, Nr.03, Road, Near Tulsi Ram Judh Bungalow, Reti Bunder, RBI Colony, Dombivli West, Mumbai, Maharashtra 421202";
  const googleMapsUrl = `https://www.google.com/maps/place/Blessings+children+Home/@19.2184587,73.0780337,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7be1855555555:0xf3c8a6d0e9e6d727!8m2!3d19.2184537!4d73.0806086!16s%2Fg%2F11pdr44ck6?entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D`;

  return (
    <section id="message" className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto bg-gray-50 shadow-lg rounded-xl p-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Get In Touch
            </h2>
            <h3 className="text-xl font-semibold text-gray-600 mb-6">
              Send Us A Message
            </h3>

            {successMessage && (
              <div className="text-green-500 mb-4">{successMessage}</div>
            )}

            {formErrors.general && (
              <div className="text-red-500 mb-4">{formErrors.general}</div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-4 border ${
                      formErrors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219D80]`}
                  />
                  {formErrors.firstName && (
                    <div className="text-red-500 mt-1">
                      {formErrors.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-4 border ${
                      formErrors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219D80]`}
                  />
                  {formErrors.lastName && (
                    <div className="text-red-500 mt-1">
                      {formErrors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-4 border ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219D80]`}
                  />
                  {formErrors.email && (
                    <div className="text-red-500 mt-1">{formErrors.email}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219D80]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Type Your Message Here...
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Type Your Message Here..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-4 border ${
                    formErrors.message ? "border-red-500" : "border-gray-300"
                  } rounded-lg min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#219D80]`}
                ></textarea>
                {formErrors.message && (
                  <div className="text-red-500 mt-1">{formErrors.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#219D80] text-white py-4 rounded-lg hover:bg-[#1B866A] transition-all shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column - Google Maps Link */}
          <div className="bg-[#E3F6F1] p-8 rounded-lg shadow-md flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              Contact Information
            </h3>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 text-lg mb-2"
            >
              <FaMapMarkerAlt className="mr-2 text-[#219D80]" />
              {address}
            </a>

            <div className="mt-6">
              <p className="text-gray-800 font-medium text-lg">
                📞 Phone: <span className="font-normal">+91 9773478432</span>
              </p>
              <p className="text-gray-800 font-medium text-lg">
                ✉️ Email: <span className="font-normal">sujil.nadar@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;