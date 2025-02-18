import {uploadForm} from './img-upload-form';

const SCALE_STEP = 0.25;

const EFFECT = {
  none: { min: 0, max: 0, step: 0, unit: '', filter: 'none' },
  chrome: { min: 0, max: 1, step: 0.1, unit: '', filter: 'grayscale' },
  sepia: { min: 0, max: 1, step: 0.1, unit: '', filter: 'sepia' },
  marvin: { min: 0, max: 100, step: 1, unit: '%', filter: 'invert' },
  phobos: { min: 0, max: 3, step: 0.1, unit: 'px', filter: 'blur' },
  heat: { min: 1, max: 3, step: 0.1, unit: '', filter: 'brightness' },
};

let scale = 1;

const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const smallerScaleButton = uploadForm.querySelector('.scale__control--smaller');
const biggerScaleButton = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');

const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');
const effectInput = uploadForm.querySelector('.effect-level__value');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

const onSmallerScaleButtonClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
};

smallerScaleButton.addEventListener('click', onSmallerScaleButtonClick);

const onBiggerScaleButtonClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
};

biggerScaleButton.addEventListener('click', onBiggerScaleButtonClick);

const resetScale = function () {
  imgUploadPreview.style.transform = null;
};

let currentEffect = 'none';

noUiSlider.create(effectSlider, {
  start: EFFECT.none.min,
  step: EFFECT.none.step,
  range: {
    min: EFFECT.none.min,
    max: EFFECT.none.max,
  },
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderContainer.classList.add('hidden');

const toggleSliderVisibility = () => {
  if (currentEffect !== 'none') {
    sliderContainer.classList.remove('hidden');
  } else {
    sliderContainer.classList.add('hidden');
  }
};

const applyFilter = (value) => {
  const {filter, unit} = EFFECT[currentEffect];
  imgPreview.style.filter = filter === 'none' ? 'none' : `${filter}(${value}${unit})`;
};

const updateSliderOptions = () => {
  const { min, max, step } = EFFECT[currentEffect];
  effectSlider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

effectSlider.noUiSlider.on('update', () => {
  const value = effectSlider.noUiSlider.get();
  effectInput.value = value;
  applyFilter(value);
});

const onToggleEffect = (evt) => {
  const effectBtn = evt.target.closest('input');
  if (!effectBtn) {
    return;
  }

  currentEffect = effectBtn.value;
  toggleSliderVisibility();
  updateSliderOptions();
};

const resetSlider = () => {
  currentEffect = 'none';
  sliderContainer.classList.add('hidden');
  effectSlider.noUiSlider.reset();
  applyFilter(EFFECT.none.min);
};

effectsList.addEventListener('change', onToggleEffect);

export {resetSlider, resetScale};
