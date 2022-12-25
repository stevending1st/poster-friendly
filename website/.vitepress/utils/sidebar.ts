import fs from 'fs-extra';

export interface ItemType {
  text: string;
  items?: ItemType[];
  link?: string;
}

export const reTemplatesFileURL =
  /^\S+[\/\\]website[\/\\](template[\/\\](\S+)[\/\\]([^\/\\]+)[\/\\](v\d+))[\/\\](\S+).md$/;

export const getMDFiles = (dir: string) => {
  const FileArr: string[] = [];
  const recursionGetMDFiles = (dir: string) => {
    const filenames = fs.readdirSync(dir);
    if (filenames.length <= 0) return;
    filenames.forEach(filename => {
      const fileDir = `${dir}/${filename}`;
      const stat = fs.lstatSync(fileDir);
      if (stat.isDirectory()) {
        recursionGetMDFiles(fileDir);
      } else if (stat.isFile() && /\.md$/.test(fileDir)) {
        FileArr.push(fileDir);
      }
    });
  };

  recursionGetMDFiles(dir);
  return FileArr;
};

export const generateTypeNameText = (name: string) =>
  name
    .split('-')
    .map(item => {
      const wordArr = item.split('');
      wordArr[0] = wordArr[0].toUpperCase();
      return wordArr.join('');
    })
    .join(' ');

export const getTemplateSidebar = (arr: string[]) => {
  const items = arr.reduce<ItemType[]>((pre, cur) => {
    const [regexp, path, typeName, subTypeName, version, fileName] =
      reTemplatesFileURL.exec(cur) || [];

    if (!regexp) return pre;
    const dirArr = path.split(/[\/\\:]+/);
    const typeNameText = generateTypeNameText(typeName);
    const item = {
      text: generateTypeNameText(subTypeName) + '@' + version,
      link:
        '/' + dirArr.join('/') + (fileName === 'index' ? '/' : `/${fileName}`),
    };

    const preItem = pre.filter(({ text }) => typeNameText === text);
    if (preItem.length > 0) {
      if (preItem[0].items) {
        preItem[0].items.push(item);
      } else {
        preItem[0].items = [item];
      }
    } else {
      pre.push({ text: typeNameText, items: [item] });
    }
    return pre;
  }, []);

  return items.length > 0 ? [{ text: 'Templates', items }] : undefined;
};

export const getTemplate = () => {
  const fileArr = getMDFiles(process.cwd() + '/website/template');
  return getTemplateSidebar(fileArr);
};
