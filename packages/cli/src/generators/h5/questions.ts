export default [
  {
    name: 'typescript',
    type: 'confirm',
    message: 'Do you want to use typescript?',
    default: true,
  },
  {
    name: 'features',
    message: 'What functionality do you want to enable?',
    type: 'checkbox',
    choices: [
      { name: 'antd', value: 'antd' },
      { name: 'code splitting', value: 'dynamicImport' },
      { name: 'dll', value: 'dll' },
    ],
  },
];
