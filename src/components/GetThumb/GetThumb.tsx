import React from "react";
import { Avatar } from "@material-ui/core";
import "./GetThumb.scss";

const getFirstLetter = (text?: string): string => {
  if (!text) return "";
  var initials = "";
  var words = text.split(" ");
  for (let index = 0; index < 2; index++) {
    initials += words[index].charAt(0).toUpperCase();
  }
  return initials;
};

const GetThumb = (props: IThumb) => {
  const { size, src, text } = props;
  return (
    <div className={`get-thumb ${size}`}>
      {props.src ? (
        <Avatar className="get-thumb-image" alt={text} src={src} />
      ) : (
        <Avatar className="get-thumb-text">{getFirstLetter(text)}</Avatar>
      )}
    </div>
  );
};

export default GetThumb;
