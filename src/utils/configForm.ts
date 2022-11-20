import { PostDestinationEnum } from "./platform";

export interface ConfigFormType {
    repoOwner: string;
    repoName: string;
    templateURL: string;
    postDestination: PostDestinationEnum[];
}