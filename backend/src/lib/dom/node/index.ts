import cheerio from 'cheerio';

interface ParseNodeParams {
  desktopSelector: string;
  mobileSelector: string;
  node: cheerio.Cheerio;
  isDesktop: boolean;
}

export const getSelectedSelector = ({
  desktopSelector,
  mobileSelector,
  isDesktop,
}: {
  desktopSelector: ParseNodeParams['desktopSelector'];
  mobileSelector: ParseNodeParams['mobileSelector'];
  isDesktop: ParseNodeParams['isDesktop'];
}) => (isDesktop ? desktopSelector : mobileSelector);

export const findNode = ({
  desktopSelector,
  mobileSelector,
  node,
  isDesktop,
}: ParseNodeParams) =>
  node.find(
    getSelectedSelector({ desktopSelector, mobileSelector, isDesktop }),
  );

export const getText = (params: ParseNodeParams) => findNode(params)?.text();
