import React from "react";
import { DatePicker as Picker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import ja from "date-fns/locale/ja";
import CalendarButton from "./CalendarButton";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#FED771",
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "rgb(118, 198, 188)",
        color: "white",
      },
      current: {
        color: "rgb(118, 198, 188)",
      },
    },
  },
});

const DatePicker = ({
    birthdate,
    setBirthdate,
    open,
    toggleOpen
  }) => {
    return (
      <>
        <CalendarButton type="button" title={moment(birthdate).format("YYYY-MM-DD")} onClick={() => toggleOpen(true)} />
        <ThemeProvider theme={materialTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
            <Picker
              autoOk
              disableFuture={true}
              className="invisible"
              variant="inline" 
              open={open} 
              onOpen={() => toggleOpen(true)} 
              onClose={() => toggleOpen(false)} 
              value={birthdate}
              onChange={setBirthdate} 
              format="yyyy-MM-dd"
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </>
    );
  };

export default DatePicker;