import yaml from "yaml";

import { ymldata } from "../test/fromdata";


export const test = () => yaml.parse(ymldata)
