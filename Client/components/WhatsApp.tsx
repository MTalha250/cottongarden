import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { useContactInfoStore } from "@/store/contactInfoStore";

const WhatsApp = () => {
  const { contactInfo } = useContactInfoStore();
  return (
    <a
      className="border fixed bottom-5 md:bottom-4 left-2 md:left-8 bg-primary p-2.5 rounded-full"
      href={`https://wa.me/${contactInfo?.whatsapp.replace(/\s/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        zIndex: 1000,
      }}
    >
      <IoLogoWhatsapp className="text-4xl text-white" />
    </a>
  );
};

export default WhatsApp;
