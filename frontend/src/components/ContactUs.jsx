import React from "react";

const ContactUs = () => {
  return (
    <section id="message" className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto bg-gray-50 shadow-lg rounded-xl p-10">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Left Column - Contact Form */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <h3 className="text-xl font-semibold text-gray-600 mb-6">Send Us A Message</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219D80]" />
                <input type="text" placeholder="Last Name" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219D80]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="email" placeholder="Your Email" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219D80]" />
                <input type="tel" placeholder="Phone Number" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219D80]" />
              </div>

              <textarea placeholder="Type Your Message Here..." className="w-full p-4 border border-gray-300 rounded-lg min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#219D80]"></textarea>

              <button className="w-full bg-[#219D80] text-white py-4 rounded-lg hover:bg-[#1B866A] transition-all shadow-lg">
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column - Address */}
          <div className="bg-[#E3F6F1] p-8 rounded-lg shadow-md flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Contact Information</h3>
            
            <p className="text-gray-700 text-lg mb-2">📍 04, Kalyanikar Hall, Kailash Nagar,</p>
            <p className="text-gray-700 text-lg mb-2">Nr.03, Road, Near Tulsi Ram Judh Bungalow, Reti Bunder,</p>
            <p className="text-gray-700 text-lg mb-2">RBI Colony, Dombivli West, Mumbai, Maharashtra 421202</p>

            <div className="mt-6">
              <p className="text-gray-800 font-medium text-lg">📞 Phone: <span className="font-normal">+91 9773478432</span></p>
              <p className="text-gray-800 font-medium text-lg">✉️ Email: <span className="font-normal">sujil.nadar@gmail.com</span></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;
