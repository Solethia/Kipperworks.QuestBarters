import { ItemHelper } from "@spt/helpers/ItemHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IQuest, IQuestReward } from "@spt/models/eft/common/tables/IQuest";
import { IBarterScheme, ITrader } from "@spt/models/eft/common/tables/ITrader";
import { Money } from "@spt/models/enums/Money";
import { QuestRewardType } from "@spt/models/enums/QuestRewardType";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { HashUtil } from "@spt/utils/HashUtil";

export class FluentAssortConstructor
{
    protected itemsToSell: IItem[] = [];
    protected barterScheme: Record<string, IBarterScheme[][]> = {};
    protected loyaltyLevel: Record<string, number> = {};
    protected questRestrictions: IQuest[] = [];
    protected questHelper: QuestHelper;
    protected itemHelper: ItemHelper;
    protected hashUtil: HashUtil;
    protected logger: ILogger;

    constructor(questHelper: QuestHelper, itemHelper: ItemHelper, hashutil: HashUtil, logger: ILogger)
    {
        this.questHelper = questHelper;
        this.itemHelper = itemHelper;
        this.hashUtil = hashutil;
        this.logger = logger;
    }

    /**
     * Start selling item with tpl
     * @param itemTpl Tpl id of the item you want trader to sell
     * @param itemId Optional - set your own Id, otherwise unique id will be generated
     */
    public createSingleAssortItem(itemTpl: string, itemId: string = undefined): FluentAssortConstructor
    {
        // Create item ready for insertion into assort table
        const newItemToAdd: IItem = {
            _id: itemId ?? this.hashUtil.generate(),
            _tpl: itemTpl,
            parentId: "hideout", // Should always be "hideout"
            slotId: "hideout", // Should always be "hideout"
            upd: {
                UnlimitedCount: false,
                StackObjectsCount: 100
            }
        };

        this.itemsToSell.push(newItemToAdd);

        return this;
    }

    public createComplexAssortItem(items: IItem[]): FluentAssortConstructor
    {
        items[0].parentId = "hideout";
        items[0].slotId = "hideout";

        items[0].upd ??= {};

        items[0].upd.UnlimitedCount = false;
        items[0].upd.StackObjectsCount = 100;

        this.itemsToSell.push(...items);

        return this;
    }

    public addStackCount(stackCount: number): FluentAssortConstructor
    {
        this.itemsToSell[0].upd.StackObjectsCount = stackCount;

        return this;
    }

    public addUnlimitedStackCount(): FluentAssortConstructor
    {
        this.itemsToSell[0].upd.StackObjectsCount = 999999;
        this.itemsToSell[0].upd.UnlimitedCount = true;

        return this;
    }

    public makeStackCountUnlimited(): FluentAssortConstructor
    {
        this.itemsToSell[0].upd.StackObjectsCount = 999999;

        return this;
    }

    public addBuyRestriction(maxBuyLimit: number): FluentAssortConstructor
    {
        this.itemsToSell[0].upd.BuyRestrictionMax = maxBuyLimit;
        this.itemsToSell[0].upd.BuyRestrictionCurrent = 0;

        return this;
    }

    public addQuestRestriction(quest: IQuest): FluentAssortConstructor
    {
        this.questRestrictions.push(quest);

        return this;
    }

    public addLoyaltyLevel(level: number): FluentAssortConstructor
    {
        this.loyaltyLevel[this.itemsToSell[0]._id] = level;
        return this;
    }

    public addMoneyCost(currencyType: Money, amount: number): FluentAssortConstructor
    {
        this.barterScheme[this.itemsToSell[0]._id] = [[
            {
                count: amount,
                _tpl: currencyType
            }
        ]];

        return this;
    }

    public addBarterCost(itemTpl: string, count: number): FluentAssortConstructor
    {
        const sellableItemId = this.itemsToSell[0]._id;

        // No data at all, create
        if (Object.keys(this.barterScheme).length === 0)
        {
            this.barterScheme[sellableItemId] = [[
                {
                    count: count,
                    _tpl: itemTpl
                }
            ]];
        }
        else
        {
            // Item already exists, add to
            const existingData = this.barterScheme[sellableItemId][0].find(x => x._tpl === itemTpl);
            if (existingData)
            {
                // itemtpl already a barter for item, add to count
                existingData.count += count;
            }
            else
            {
                // No barter for item, add it fresh
                this.barterScheme[sellableItemId][0].push({
                    count: count,
                    _tpl: itemTpl
                });
            }
        }

        return this;
    }

    /**
     * Reset objet ready for reuse
     * @returns
     */
    public export(data: ITrader): FluentAssortConstructor
    {
        const itemBeingSold = this.itemsToSell[0];
        const itemBeingSoldId = itemBeingSold._id;
        const loyaltyLevel = this.loyaltyLevel[itemBeingSoldId];
        const barterSchemes = this.barterScheme[itemBeingSoldId];

        if (data.assort.items.find(x => x._id === itemBeingSoldId))
        {
            this.logger.error(`Unable to add complex item with item key ${itemBeingSoldId}, key already used`);

            return;
        }
        
        data.assort.items.push(...this.itemsToSell);
        data.assort.barter_scheme[itemBeingSoldId] = barterSchemes;
        data.assort.loyal_level_items[itemBeingSoldId] = loyaltyLevel;


        if (this.questRestrictions.length > 0)
        {
            const onQuestSuccessAssort = data.questassort["success"];
            this.questRestrictions.forEach(questRestriction =>
            {
                onQuestSuccessAssort[itemBeingSoldId] = questRestriction._id;
                const index = questRestriction.rewards.Success.length;

                const questReward: IQuestReward = {
                    "id": this.hashUtil.generate(),
                    "index": index,
                    "items": [
                        {
                            "_id": itemBeingSold._id,
                            "_tpl": itemBeingSold._tpl
                        }
                    ],
                    "loyaltyLevel": loyaltyLevel,
                    "target": itemBeingSold._id,
                    "traderId": data.base._id,
                    "type": QuestRewardType.ASSORTMENT_UNLOCK,
                    "unknown": false
                };
                questRestriction.rewards.Success.push(questReward);
            });
        }

        this.itemsToSell = [];
        this.barterScheme = {};
        this.loyaltyLevel = {};
        this.questRestrictions = [];

        return this;
    }

    private logExport(trader: ITrader, itemBeingSold: IItem, loyaltyLevel: number,  barterSchemes: IBarterScheme[][])
    {
        const itemBeingSoldName = this.itemHelper.getItemName(itemBeingSold._tpl);
        const barterCostInfo = this.getBarterCostInfo(barterSchemes);
        const traderInfo = this.getTraderInfo(trader, loyaltyLevel);
        const questRestrictionInfo = this.getQuestRestrictionInfo();
        const logExport = "| " + itemBeingSoldName + " | " + barterCostInfo + " | " + traderInfo + " | " + questRestrictionInfo + " |";
        this.logger.info(logExport)
    }

    private getBarterCostInfo(barterSchemes: IBarterScheme[][]): string
    {
        const source = barterSchemes[0];
        if (source.length === 0)
            return "";

        return source.map(barterScheme => barterScheme.count + "x" + this.itemHelper.getItemName(barterScheme._tpl)).join(", ")
    }

    private getTraderInfo(trader: ITrader, loyaltyLevel: number): string
    {
        return trader.base.nickname + " LVL" + loyaltyLevel;
    }

    private getQuestRestrictionInfo(): string
    {
        if (this.questRestrictions.length === 0)
            return "";

        return this.questRestrictions.map(quest => this.questHelper.getQuestNameFromLocale(quest._id)).join(", ");
    }
}
