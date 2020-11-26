export default {
  formatDate: (targetDate) => {
    let date = "";
    const today = new Date();
    const messageDate = new Date(targetDate);
    if (today.toDateString() === messageDate.toDateString()) {
      date += messageDate.getHours() + ":";
      date +=
        messageDate.getMinutes().toString().length < 2
          ? "0" + messageDate.getMinutes()
          : messageDate.getMinutes();
    } else if (today.getFullYear() !== messageDate.getFullYear()) {
      date +=
        messageDate.getFullYear() +
        "-" +
        (messageDate.getMonth() + 1) +
        "-" +
        messageDate.getDate();
    } else {
      date += messageDate.getMonth() + 1 + ". " + messageDate.getDate() + ".";
    }
    return date;
  },
  formatTime: (targetDate) => {
    let result = "";
    const messageTime = new Date(targetDate);
    result += messageTime.getHours() + ":";
    result +=
      messageTime.getMinutes().toString().length < 2
        ? "0" + messageTime.getMinutes()
        : messageTime.getMinutes();
    return result;
  },
  compare: (a, b) => {
    const aDate = a.createdAt;
    const bDate = b.createdAt;

    let result = 0;
    if (aDate > bDate) {
      result = -1;
    } else if (aDate < bDate) {
      result = 1;
    }
    return result;
  },
  splitExtension: (image) => {
    const regEx = /(?:\.([^.]+))?$/;
    return regEx.exec(image);
  },
  truncateText: (text, limit = 10, ending = "...") => {
    if (text.length > limit) {
      return text.substring(0, limit) + ending;
    } else {
      return text;
    }
  } 
};
