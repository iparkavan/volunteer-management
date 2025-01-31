import React from "react";
export const ProfileNotes = ({
    data = {}
}) => {
  return (
    <>
      <label
        className="block tracking-wide  text-xs mb-2"
        style={{ color: "rgba(116, 116, 116, 1)" }}
      >
        Notes
      </label>
      <p className="text-[14px] pt-3">{data?.profile_notes ?? "-"}</p>
    </>
  );
};