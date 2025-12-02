import React from "react";

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-background p-6 rounded-xl shadow-lg border border-border">
    <h2 className="text-xl font-bold text-foreground border-b border-border pb-3 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

export default SectionCard;
