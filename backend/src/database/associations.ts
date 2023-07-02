import { CardsModel } from "../models/cards.model";
import { UserModel } from "../models/user.models";
import { DecksModel } from "../models/decks.model";
import { SummariesModel } from "../models/summaries.model";
import { TagsModel } from "../models/tags.model";



//TODO The entity associations must be in the respective model file. (remove all of them from this file)

//User table associations

//Deck table associations
DecksModel.hasMany(CardsModel, {
    foreignKey: "deck_id",
    constraints: true,
});
DecksModel.belongsTo(UserModel);
DecksModel.belongsToMany(TagsModel, {
    through: "deckTags"
});

//Card table associations
CardsModel.hasOne(DecksModel);

//Metrics table associations


//Tags table associations
TagsModel.belongsToMany(DecksModel,{
    through: "deckTags"
});

TagsModel.belongsToMany(SummariesModel, {
    through: "summarieTags"
});

//Summaries table associations
SummariesModel.belongsTo(UserModel);

SummariesModel.belongsToMany(TagsModel, {
    through: "sumarrieTags"
});