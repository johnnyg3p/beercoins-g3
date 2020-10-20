import React from "react";
import { Avatar, makeStyles, createStyles, Theme } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  })
);

const getFirstLetter = (text: string): string => text.charAt(0).toUpperCase();

const GetThumb = (props: IThumb) => {
  const classes = useStyles();
  const { src, text } = props;
  return (
    <div className="get-thumb">
      {props.src ? (
        <Avatar className={(classes.large, "image")} alt={text} src={src} />
      ) : (
        <Avatar className={(classes.large, "text")}>{getFirstLetter(text)}</Avatar>
      )}
    </div>
  );
};

export default GetThumb;
