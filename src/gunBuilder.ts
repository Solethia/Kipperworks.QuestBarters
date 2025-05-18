import { IItem } from "@spt/models/eft/common/tables/IItem";
import * as mp431C12gaDoubleBarrelShotgunJson from "../db/mp431C12gaDoubleBarrelShotgun.json";

export class GunBuilder
{
    public getMP431C12gaDoubleBarrelShotgun(): IItem[]
    {
        return mp431C12gaDoubleBarrelShotgunJson.items as IItem[];
    }
}
