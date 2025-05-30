const formControlStyle = {
  "& .MuiInputBase-root": {
    fontSize: "1.4rem",
    fontFamily: "inherit",
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.4rem",
    fontFamily: "inherit",
    color: "rgba(0, 0, 0, 0.6)",
    "&.Mui-focused": {
      color: "var(--primary-color)",
    },
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary-color)",
    },
  },
};

export default formControlStyle;