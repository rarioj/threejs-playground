function getType(value) {
  if (typeof value === "undefined") {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  const type = Object.prototype.toString
    .call(value)
    .match(/^\[object\s(.*)\]$/)[1];
  if (type === "Object") {
    if (value.constructor && value.constructor.name) {
      return value.constructor.name;
    }
  }
  return type;
}

export default function validate(options, properties) {
  if (typeof options === "object" && options !== null) {
    for (const [key, type] of Object.entries(properties)) {
      if (getType(options[key]) !== type) {
        throw new TypeError("Property " + key + " must be " + type);
      }
    }
  }
  return true;
}
