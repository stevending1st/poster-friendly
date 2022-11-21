import { Buffer } from "buffer";

export enum ConfigFilePlatformEnum {
    GITHUB = "github",
    GITEE = "gitee"
}

export interface ConfigFileInfo {
    platform: string;
    owner: string;
    repo: string;
    type: string;
    ref: string;
    path: string;
}

export const reConfigFileURL = /http[s]?:\/\/(\w+)\.com\/([^\/\s]+)\/([^\/\s]+)\/([^\/\s]+)\/([^\/\s]+)\/([\S]+)/g;

export const execConfigFileURLRegexp = (url: string) => {
    reConfigFileURL.lastIndex = 0;
    const execResult = reConfigFileURL.exec(url);
    if (!execResult) throw new Error("execResult Error!")
    const [_, platform, owner, repo, type, ref, path] = execResult;
    return { platform, owner, repo, type, ref, path }
}

export const validateConfigFileURL = ({ platform, owner, repo, type, ref, path }: ConfigFileInfo) => {
    if (!platform || !owner || !repo || !type || !ref || !path)
        throw new Error("Error");

    if (ConfigFilePlatformEnum.GITEE !== platform && ConfigFilePlatformEnum.GITHUB !== platform)
        throw new Error("Error");

    if (type !== "blob")
        throw new Error("Error");
}

export const fetchConfigFileContent = async ({ platform, owner, repo, ref, path }: ConfigFileInfo): Promise<string> => {
    const URL = ConfigFilePlatformEnum.GITHUB === platform ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}` : `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}?ref=${ref}`;
    const re = await fetch(URL);
    const { content } = await re.json();
    return content;
}

export const decodeBase64 = (base64str: string) => {
    try {
        const regex = /\\\\n/ig;
        const str = base64str.replace(regex, '\n')
        return Buffer.from(str, 'base64').toString('utf-8');
    } catch (error: any) {
        console.error("error:", error)
    }
}

export const getConfigFileData = async (url: string) => {
    const configFileURLInfo = execConfigFileURLRegexp(url);
    try {
        validateConfigFileURL(configFileURLInfo)
    } catch (error: any) {
        console.error("getConfigFileData Err:", getConfigFileData);
    }
    const fileContentBase64 = await fetchConfigFileContent(configFileURLInfo);
    const fileContent = decodeBase64(fileContentBase64);
    return fileContent;
}
