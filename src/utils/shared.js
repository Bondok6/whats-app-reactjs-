export function chatMessage(data, recieved, img, id = "id") {
  var span = document.createElement("span"),
    span2 = document.createElement("span");
  span.setAttribute("class", "chat__name");
  span.textContent = "time";
  span2.setAttribute("class", "chat__timestamp");
  span2.setAttribute("style", "overflow:hidden");

  span2.textContent = data;
  span.after(data);
  var p;
  span.after(span2);

  if (
    data.endsWith("png") ||
    data.endsWith("jpg") ||
    data.endsWith("PNG") ||
    data.endsWith("JPG") ||
    img === "img"
  ) {
    p = document.createElement("img");
    p.setAttribute("src", data);

    if (img === "img") p.setAttribute("style", "background-color:yellow");

    recieved
      ? p.setAttribute("class", `chat__message chat__reciever ${id}`)
      : p.setAttribute("class", "chat__message");
    /*  p = document.createElement("h1"), */
    p.appendChild(span);
    return p;
  } else if (data.endsWith("wav") || data.endsWith("mp3") || img === "voice") {
    p = document.createElement("audio");
    p.setAttribute("src", data);
    p.setAttribute("controls", "controls");
    p.setAttribute("id", "audio");

    if (img === "voice") p.setAttribute("style", "background-color:yellow");

    recieved
      ? p.setAttribute("class", `chat__message chat__reciever ${id}`)
      : p.setAttribute("class", "chat__message");
    /*  p = document.createElement("h1"), */
    p.appendChild(span);
    return p;
  } else {
    p = document.createElement("p");
    p.setAttribute("key", id);

    recieved
      ? p.setAttribute("class", "chat__message chat__reciever")
      : p.setAttribute("class", "chat__message");
    /*  p = document.createElement("h1"), */
    p.appendChild(span);
    p.textContent = data;
    return p;
  }
}

export const updatedObject = (oldObject, updatedPro) => {
  return {
    ...oldObject,
    ...updatedPro,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
