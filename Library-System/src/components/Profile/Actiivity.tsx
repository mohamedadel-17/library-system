import React from "react";
import type { User } from "../../types/user";
import SectionCard from "./SectionCard";

const activityItems = [
  { time: "1 hour ago", description: "Updated profile bio and image." },
  { time: "4 hours ago", description: 'Completed "Introduction to Tailwind" course.' },
  { time: "Yesterday", description: 'Created new project: "E-commerce Redesign Prototype".' },
  { time: "3 days ago", description: "Posted 3 new code snippets." },
];

const GeneralInfo: React.FC<{ user: User }> = ({ user }) => (
  <div className="space-y-6">
    <SectionCard title="Activity">
      <ul className="space-y-4">
        {activityItems.map((item, index) => (
          <li key={index} className="flex items-start space-x-3">
            <svg
              className="h-5 w-5 text-yellow-700 mt-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <circle cx="10" cy="10" r="8" />
            </svg>
            <div className="text-sm">
              <p className="font-semibold text-gray-800">{item.description}</p>
              <p className="text-gray-500 text-xs">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  </div>
);

export default GeneralInfo;
