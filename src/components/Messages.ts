import {  message } from 'antd';

const showSuccess = (text: string) => {
  message.success(text);
};

const showError = (text: string) => {
  message.error(text);
};

export default {
  showSuccess,
  showError
}