import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Manage() {
  return (
    <div className="admin-manage">
      <div className="manage-services">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="اسم الخدمة باللغة العربية"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="اسم الخدمة باللغة الانجليزية"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="معرف الخدمة"
            variant="outlined"
          />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              تنشيط؟
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="true"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="true" control={<Radio />} label="نعم" />
              <FormControlLabel value="false" control={<Radio />} label="لا" />
            </RadioGroup>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}

export default Manage;
