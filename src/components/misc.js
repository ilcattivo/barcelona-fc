const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

const validate = element => {
  let error = [true, ''];
  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = valid ? '' : 'Enter a valid email: example@mail.com';
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = valid ? '' : 'this field is required';
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export { firebaseLooper, validate };
