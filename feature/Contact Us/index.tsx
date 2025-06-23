"use client";

import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-16 ">
     <div className="max-w-[1000px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-[1.75rem] font-bold text-[#a87f30]">
            CONTACT US
          </h2>
        </div>

        {/* PHẦN CẦN THÊM BACKGROUND WHITE */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start bg-white p-6 rounded shadow-md">
          {/* FORM */}
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="bg-[#bb8d38] hover:bg-[#a87f30] text-white px-6 py-2 rounded transition duration-200"
              >
                SEND
              </button>
            </form>
          </div>

          {/* GOOGLE MAP */}
          <div className="md:w-1/2">
            <div className="w-full h-[345px] rounded overflow-hidden shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9632.571746529398!2d105.890096!3d20.9933415!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac07d0294019%3A0x4119b83b77498208!2zQ8O0bmcgVHkgVE5ISCBNw7QgSMOsbmggVmnhu4d0!5e1!3m2!1sen!2s!4v1735198932832!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
