import React, { useState } from "react";

export default function Import() {
  const [fileName, setFileName] = useState("No File Chosen");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("No File Chosen");
    }
  };

  return (
    <div className="relative  h-[598px] w-full">
      {/* Heading + Description Wrapper */}
      <div className="absolute w-[636px] h-[119px] left-[194px] top-[95px] flex flex-col items-center justify-center">
        {/* Title */}
        <h1
          className="font-[Poppins] font-semibold text-[32px] leading-[62px] text-center"
          style={{ letterSpacing: "0px" }}
        >
          Import Data
        </h1>

        {/* Subtitle */}
        <p
          className="font-[Poppins] w-[541px] h-[60px] font-normal text-[16px] leading-[30px] text-center mt-2"
          style={{ letterSpacing: "0px" }}
        >
          Select your .JSON file and click the Import button to upload the data
          to the database.
        </p>
      </div>

      {/* File Upload Box */}
      <div
        className="absolute w-[328.81px] h-[119.9px] flex flex-col items-center justify-between"
        style={{ left: "363px", top: "267px" }}
      >
        {/* Choose Files Row */}
        <div className="flex items-center space-x-4">
          {/* Hidden input */}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".json"
            onChange={handleFileChange}
          />

          {/* Custom Button */}
          <label
            htmlFor="fileInput"
            className="w-[100px] h-[28px] bg-gray-200 cursor-pointer flex items-center justify-center 
                       font-[Poppins] font-semibold text-[16px] leading-[28px] tracking-[-0.2px] text-center"
          >
            Choose Files
          </label>

          {/* File Name */}
          <span
            className="w-[117px] h-[28px] flex items-center justify-center
                       font-[Poppins] font-semibold text-[16px] leading-[28px] tracking-[-0.2px] text-center"
          >
            {fileName}
          </span>
        </div>

        {/* Import Button */}
        <button
          className="w-[329px] h-[42px] bg-[#7ED321] text-white font-[Poppins] text-[16px] rounded-[9px] 
                     hover:bg-[#6CC11B] transition"
        >
          Import Data
        </button>
      </div>
    </div>
  );
}
