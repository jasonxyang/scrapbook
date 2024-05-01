export const onOpen = () => {
  const menu = DocumentApp.getUi().createMenu("Scrapbook");
  menu.addItem('Scrapbook', 'openSidebar');
  menu.addToUi();
};

export const openSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar');
  DocumentApp.getUi().showSidebar(html);
};

onOpen();
