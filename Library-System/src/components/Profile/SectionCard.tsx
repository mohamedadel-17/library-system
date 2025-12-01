import React from "react";

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

export default SectionCard;
