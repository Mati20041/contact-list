import clsx from "clsx";
import React, {useCallback} from "react";

interface Props {
    data: {
        id: string;
        firstNameLastName: string;
        jobTitle: string;
        emailAddress: string;
    };
    handleSelect: (id: string) => any;
    selected?: boolean;
}

const PersonInfo = ({ data, handleSelect, selected }: Props) => {
    const handleClick = useCallback(() => handleSelect(data.id), [data.id]);
  return (
    <div
      style={{
        display: "flex",
        height: "100px",
        justifyContent: "center",
        flexDirection: "column",
        padding: "32px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        margin: "10px 0",
        background: "#fff",
        cursor: "pointer",
      }}
      className={clsx("person-info", selected && "selected-person")}
      onClick={handleClick}
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
};

export default PersonInfo;
