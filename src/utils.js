export default {
  isEmail: (email) => {
    const regEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regEx.test(email);
  },
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
};
