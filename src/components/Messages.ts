import { message } from 'antd';

const showSuccess = (text: string) => {
  message.success(text);
};

const showError = (text: string) => {
  message.error(text);
};

const messages = {
  showSuccess, showError
};

export default messages;
