import { ITrader } from "@spt/models/eft/common/tables/ITrader";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

export class DBTraders 
{
    private _tables: IDatabaseTables;

    private _prapor: ITrader;
    private _skier: ITrader;
    private _peacekeeper: ITrader;
    private _mechanic: ITrader;
    private _jaeger: ITrader;

    constructor(tables: IDatabaseTables) 
    {
        this._tables = tables;

    }

    public get prapor(): ITrader 
    {
        if (this._prapor)
            return this._prapor;

        this._prapor = this._tables.traders["54cb50c76803fa8b248b4571"];
        return this._prapor;
    }

    public get skier(): ITrader 
    {
        if (this._skier)
            return this._skier;

        this._skier = this._tables.traders["58330581ace78e27b8b10cee"];
        return this._skier;
    }

    public get peacekeeper(): ITrader 
    {
        if (this._peacekeeper)
            return this._peacekeeper;

        this._peacekeeper = this._tables.traders["5935c25fb3acc3127c3d8cd9"];
        return this._peacekeeper;
    }

    public get mechanic(): ITrader 
    {
        if (this._mechanic)
            return this._mechanic;

        this._mechanic = this._tables.traders["5a7c2eca46aef81a7ca2145d"];
        return this._mechanic;
    }

    public get jaeger(): ITrader 
    {
        if (this._jaeger)
            return this._jaeger;

        this._jaeger = this._tables.traders["5c0647fdd443bc2504c2d371"];
        return this._jaeger;
    }
}