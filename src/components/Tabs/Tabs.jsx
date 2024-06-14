import React, { useState } from "react";

export function Tabs({ children }) {
  function findActiveTab(tabs) {
    return tabs.reduce((accumulator, currentValue, i) => {
      if (currentValue.props.active) {
        return i;
      }
      return accumulator;
    }, 0);
  }

  function tabValidator(tab) {
    return tab.type.displayName === "Tab";
  }

  const [activeTab, setActiveTab] = useState(findActiveTab(children));

  return (
    <>
      <div className="overflow-x-auto whitespace-nowrap border-b border-gray-400">
        <div className="inline-flex gap-8 justify-start bg-[#2C2D35] p-2">
          {children.map((item, i) => (
            tabValidator(item) && (
              <Tab
                key={`tab-${i}`}
                currentTab={i}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                {item.props.children}
              </Tab>
            )
          ))}
        </div>
      </div>

      <div className="p-5 max-w-[500px] mx-auto">
        {children.map((item, i) => (
          <div key={`content-${i}`} className={`${i === activeTab ? "visible" : "hidden"}`}>
            {item.props.component}
          </div>
        ))}
      </div>
    </>
  );
}

export function Tab({ children, activeTab, currentTab, setActiveTab }) {
  return (
    <div
      className={`px-5 py-3 cursor-pointer ${activeTab === currentTab ? "text-white border-b-2 border-blue-500" : "text-gray-500"}`}
      onClick={() => setActiveTab(currentTab)}
    >
      {children}
    </div>
  );
}

Tab.displayName = "Tab";
