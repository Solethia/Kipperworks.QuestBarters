import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { DBTraders } from "./DBTraders";
import { FluentAssortConstructor as FluentAssortCreator } from "./fluentTraderAssortCreator";
import { GunBuilder } from "./gunBuilder";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";

export class QuestBarterHelper
{
    private fluentAssortCreator: FluentAssortCreator;
    private gunBuilder: GunBuilder;
    private traders: DBTraders;
    private quests: Record<string, IQuest>;
    constructor(fluentAssortCreator: FluentAssortCreator, tables: IDatabaseTables)
    {
        this.fluentAssortCreator = fluentAssortCreator;
        this.gunBuilder = new GunBuilder();
        this.traders = new DBTraders(tables);
        this.quests = tables.templates.quests;
    }

    public addHellOnEarthPartOne(): void
    {
        const mp431C12gaDoubleBarrelShotgun = this.gunBuilder.getMP431C12gaDoubleBarrelShotgun();
        const shustriloSealingFoam = "590c35a486f774273531c822";
        this.fluentAssortCreator.createComplexAssortItem(mp431C12gaDoubleBarrelShotgun)
            .addUnlimitedStackCount()
            .addBarterCost(shustriloSealingFoam, 2)
            .addBuyRestriction(2)
            .addLoyaltyLevel(1)
            .export(this.traders.jaeger);

        const mp431C12ga510mmBarrel = "5580169d4bdc2d9d138b4585";
        const siliconeTube = "5d1b39a386f774252339976f";
        this.fluentAssortCreator
            .createSingleAssortItem(mp431C12ga510mmBarrel)
            .addUnlimitedStackCount()
            .addBuyRestriction(1)
            .addBarterCost(siliconeTube, 3)
            .addLoyaltyLevel(1)
            .export(this.traders.jaeger);
    }

    public addTestDrivePartFour(): void
    {
        const npz1P781DovetailMount = "618a75c9a3884f56c957ca1b";
        const rechargableBattery = "590a358486f77429692b2790";
        const ortodontoxToothpaste = "5d4041f086f7743cac3f22a7";

        this.fluentAssortCreator
            .createSingleAssortItem(npz1P781DovetailMount)
            .addUnlimitedStackCount()
            .addBuyRestriction(2)
            .addBarterCost(rechargableBattery, 1)
            .addBarterCost(ortodontoxToothpaste, 1)
            .addLoyaltyLevel(2)
            .export(this.traders.prapor);

        const npz1P78128xScope = "618a75f0bd321d49084cd399";
        const cyclonRechargableBattery = "5e2aee0a86f774755a234b62";
        this.fluentAssortCreator
            .createSingleAssortItem(npz1P78128xScope)
            .addUnlimitedStackCount()
            .addBuyRestriction(1)
            .addBarterCost(rechargableBattery, 1)
            .addBarterCost(cyclonRechargableBattery, 1)
            .addLoyaltyLevel(2)
            .export(this.traders.prapor);
    }

    public addQuestRestrictedItemExample(): void
    {
        const prapor = this.traders.prapor;
        const replaceMe = "618a75c9a3884f56c957ca1b";
        const bolts = "57347c5b245977448d35f6e1";
        const largeBeefStew = "57347da92459774491567cf5";
        const gunsmithPartTwo = this.quests["5ac2426c86f774138762edfe"];
        this.fluentAssortCreator
            .createSingleAssortItem(replaceMe)
            .addUnlimitedStackCount()
            .addBuyRestriction(2)
            .addQuestRestriction(gunsmithPartTwo)
            .addBarterCost(bolts, 1)
            .addBarterCost(largeBeefStew, 1)
            .addLoyaltyLevel(1)
            .export(prapor);
    }
}