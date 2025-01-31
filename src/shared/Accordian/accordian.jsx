import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CircleArrowDown from "../../assets/icons/vmAccordianIcon.svg";
import AccordionCloseIcon from "../../assets/icons/accordionCloseIcon.svg";

const CustomAccordian = ({
  title,
  children,
  defaultValue,
  isCloseBtn = false,
  handleCloseBtn = () => false,
  titleColor = "#232323"
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultValue);
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight); // Measure the full height of the content
    }
  }, [children]);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        borderRadius: "8px",
        overflow: "hidden",
        mb: 2,
        transition: "box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Accordion Header */}
      <Box
        onClick={toggleAccordion}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          px: 3,
          py: 2,
          transition: "background-color 0.3s ease",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            color: titleColor ?? "#232323",
          }}
        >
          {title}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {isCloseBtn && (
            <Box onClick={(e) => handleCloseBtn(e)}>
              <img src={AccordionCloseIcon} alt="AccordionCloseIcon" />
            </Box>
          )}
          <Box
            component="span"
            sx={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <img src={CircleArrowDown} alt="" />
          </Box>
        </Stack>
      </Box>

      {/* Accordion Content */}
      <Box
        sx={{
          height: isOpen ? `${contentHeight}px` : "0px",
          overflow: "hidden",
          transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "height",
          marginBottom: isOpen ? "20px" : "0px",
        }}
      >
        <Box
          ref={contentRef}
          sx={{
            px: 3,
            py: 2,
            backgroundColor: "#fff",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomAccordian;
