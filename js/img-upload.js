const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const imgUpload = document.querySelector('.img-upload');
const fileChooser = imgUpload.querySelector('.img-upload__input');
const preview = imgUpload.querySelector('.img-upload__preview img');
const effectsPreview = imgUpload.querySelectorAll('.effects__preview');


const upLoadFile = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const newUrl = URL.createObjectURL(file);
    preview.src = newUrl;
    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${newUrl})`;
    });
  }
};

export {upLoadFile};
