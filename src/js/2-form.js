const formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');

form.addEventListener('input', event => {
  if (event.target.name === 'email' || event.target.name === 'message')
    formData[event.target.name] = event.target.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

const savedData = localStorage.getItem('feedback-form-state');
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    console.error('Error parsing saved data:', error);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const trimmedEmail = formData.email.trim();
  const trimmedMessage = formData.message.trim();

  if (!trimmedEmail || !trimmedMessage) {
    alert('Fill please all fields');
    return;
  }

  console.log({
    email: trimmedEmail,
    message: trimmedMessage,
  });

  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  form.reset();
});