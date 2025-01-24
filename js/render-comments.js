const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');

commentList.innerHTML = '';

const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const renderNextComments = () => {
  const commentFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentFragment.appendChild(commentElement);
  });

  commentList.appendChild(commentFragment);

  commentShownCount.textContent = renderedCommentsLength;
  commentTotalCount.textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const renderComments = (currentPictureComments) => {
  comments = currentPictureComments;
  renderNextComments();

  commentsLoader.addEventListener('click', renderNextComments);
};

const clearComments = () => {
  currentCount = 0;
  commentList.innerHTML = '';
  commentsLoader.classList.remove('hidden');

  commentsLoader.removeEventListener('click', renderNextComments);
};

export {renderComments, clearComments};
