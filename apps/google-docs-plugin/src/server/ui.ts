export const onOpen = () => {
  const menu = DocumentApp.getUi()
    .createMenu('My Sample React Project') // edit me!
    .addItem('Sheet Editor (Tailwind CSS)', 'openDialogTailwindCSS')
    .addItem('About me', 'openAboutSidebar');

  menu.addToUi();
};

export const openDialogTailwindCSS = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-tailwindcss')
    .setWidth(600)
    .setHeight(600);
  DocumentApp.getUi().showModalDialog(html, 'Sheet Editor (Tailwind CSS)');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page');
  DocumentApp.getUi().showSidebar(html);
};
