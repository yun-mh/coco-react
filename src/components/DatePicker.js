import React from "react";
import { DatePicker as Picker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import ja from "date-fns/locale/ja";
import CalendarButton from "./CalendarButton";

const DatePicker = ({
    birthdate,
    setBirthdate,
    open,
    toggleOpen
  }) => {
    return (
      <>
        <CalendarButton type="button" title={moment(birthdate).format("YYYY-MM-DD")} onClick={() => toggleOpen(true)} />
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
      </>
    );
  };

export default DatePicker;